const { connect, createDocument } = require('../cosmos-handler/index');
const { generateEventPlan } = require('../gpt-handler/index');

module.exports = async function (context, req) {
    const eventDetails = req.body;

    /**
     * TODO: image processing for image to text. 
     */

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