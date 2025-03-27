const { app } = require('@azure/functions');
const cosmosHandler = require('../helpers/cosmos-handler');
const gptHandler = require('../helpers/gpt-handler');
const crypto = require('crypto');
// import app from '@azure/functions';
// import cosmosHandler from '../helpers/cosmos-handler';
// import gptHandler from '../helpers/gpt-handler';
// import crypto from 'crypto';

app.http('event', {
    methods: ['GET', 'POST'],
    authLevel: 'anonymous',
    handler: async (request, context) => {
        context.log(`Http function processed request for url "${request.url}"`);

        if (request.method === 'GET') {
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
            let eventDetails = await request.json();
            console.log("Event details:", eventDetails);
            eventDetails.eventId = crypto.randomBytes(32).toString('hex');
            const eventPlan = await gptHandler.generateEventPlan(eventDetails);
            await cosmosHandler.connect();
            const database = 'planit-db';
            const collection = 'event-collection';
            console.log("Creating document");
            await cosmosHandler.createDocument(database, collection, { ...eventDetails, eventPlan });
            return { status: 200, body: eventDetails.eventId };
        }
    }
});
