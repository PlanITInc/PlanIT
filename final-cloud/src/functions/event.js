const { app } = require('@azure/functions');
const cosmosHandler = require('../helpers/cosmos-handler');
const gptHandler = require('../helpers/gpt-handler');
const blobHandler = require('../helpers/blob-handler');
const crypto = require('crypto');
const { parse } = require('parse-multipart-data');

app.http('event', {
    methods: ['GET', 'POST'],
    authLevel: 'anonymous',
    rawBody: true,
    handler: async (request, context) => {
        context.log(`Http function processed request for url "${request.url}"`);

        if (request.method === 'GET') {
            await blobHandler.checkContainerExists();
            const queryParams = new URLSearchParams(request.url.split('?')[1]);
            console.log("GET request received with query params:", queryParams);
            const eventId = queryParams.get('eventId');
            console.log("Event ID:", eventId);
            if (eventId) {
                console.log("Fetching event details for event ID:", eventId);
                await cosmosHandler.connect();
                const database = 'planit-db';
                const collection = 'event-collection';
                const eventDetails = await cosmosHandler.readDocument(database, collection, { eventId });
                return { status: 200, body: JSON.stringify(eventDetails) };
            }
            return { status: 400, body: 'Missing required query parameter: eventId' };
        } else if (request.method === 'POST') {
            console.log("POST request received");

            try {
                const formData = await request.formData();

                const fields = {};
                const inspirationImages = [];
                for (const [key, value] of formData.entries()) {
                    if (value instanceof Blob) {
                        const validImageTypes = ['image/jpeg', 'image/png', 'image/gif'];
                        if (!validImageTypes.includes(value.type)) {
                            continue;
                        }
                        // This is a valid image file
                        console.log("Image file detected:", key, value.type);
                        const buffer = Buffer.from(await value.arrayBuffer());
                        inspirationImages.push({name: key, buffer, type: value.type});
                    } else {
                        // This is a field
                        fields[key] = value;
                    }
                }

                // Extract eventDetails from fields
                const eventDetails = JSON.parse(fields.eventDetails); // Formidable returns fields as plain objects
                console.log("Event details:", eventDetails);

                // Generate a unique eventId
                eventDetails.eventId = crypto.randomBytes(32).toString('hex');

                let uploadedImageUrls = [];
                if (inspirationImages.length > 0) {
                    uploadedImageUrls = await blobHandler.uploadImagesToBlob(inspirationImages);
                }
                eventDetails.inspirationImages = uploadedImageUrls;

                // Generate event plan using GPT handler
                const eventPlan = await gptHandler.generateEventPlan(eventDetails);

                // Save event details and image URLs to Cosmos DB
                await cosmosHandler.connect();
                const database = 'planit-db';
                const collection = 'event-collection';
                console.log("Creating document in Cosmos DB");
                await cosmosHandler.createDocument(database, collection, {
                    ...eventDetails,
                    eventPlan,
                    inspirationImages: uploadedImageUrls,
                });

                return { status: 200, body: eventDetails.eventId };
            } catch (err) {
                console.error("Error handling POST request:", err);
                return { status: 500, body: "Internal Server Error" };
            }
        }
    }
});
