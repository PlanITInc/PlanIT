const { connect, createDocument } = require('../cosmos-handler/index');
const { generateEventPlan } = require('../gpt-handler/index');
const { uploadImagesToBlob } = require('../blob-handler/index');
const { proccessImages } = require('../computer-vision-handler/index');

module.exports = async function (context, req) {
    const eventDetails = req.body;

    /**
     * Image processing for image to text.
     * eventDetails contains a key called inspirationImages an array of images that need to be added to the azure blob storage.
     * Upload images to blob storage using blob-handler
     * After images are uploaded, get photo descriptions using computer-vision-handler
     * Add photo descriptions to eventDetails
     */
    try {
        // Upload images to blob storage
        const uploadedImageUrls = await uploadImagesToBlob(eventDetails.inspirationImages);

        // Get photo descriptions
        const photoDescriptions = await proccessImages(uploadedImageUrls);

        // Add photo descriptions to eventDetails
        eventDetails.photoDescriptions = photoDescriptions;
    } catch (error) {
        console.error("Error using computer vision", error);
        context.res = {
            status: 500,
            body: { error: "Error using computer vision" }
        };
    }

    try {
        // Generate event plan using GPT-3.5
        const eventPlan = await generateEventPlan(eventDetails);

        // Save event in DB
        const database = 'PlanIT-TestDB';
        const collection = 'Test-Collection';
        await createDocument(database, collection, { ...eventDetails, eventPlan });

        // Return event plan to front end
        context.res = {
            status: 200,
            body: eventPlan
        };
    } catch (error) {
        console.error("Error creating event plan:", error);
        context.res = {
            status: 500,
            body: { error: "Failed to create event plan" }
        };
    }
};