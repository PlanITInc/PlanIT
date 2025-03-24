const { Configuration, OpenAIApi } = require("openai");

const configuration = new Configuration({
    apiKey: "",
});
const openai = new OpenAIApi(configuration);

async function generateEventPlan(eventDetails) {
    const prompt = `
    You are an event planner. Based on the following event details, generate an event plan:
    
    Date: ${eventDetails.date}
    Budget: ${eventDetails.budget}
    Location: ${eventDetails.location}
    Description: ${eventDetails.description}
    Inspiration images: ${eventDetails.inspirationImages}
    Estimated number of participants: ${eventDetails.participants}
    
    The event plan should include:
    - Ideal venue (with price if applicable)
    - Purchasables (each item/thing with a price, e.g., drinks, food, clown, photographer, etc.)
    - TODO List (ordered by priority, e.g., setting up balloons, table setup, chairs, etc.)
    - Email to send to participants (optional)
    - Budget total
    
    use the following example layout for the event plan:
    Venue: "Grand Ballroom",
    Purchasables: [{ item: "Drinks", price: 500 }, { item: "Food", price: 1500 }],
    Todos: ["Set up balloons", "Arrange tables", "Prepare sound system"],
    Budget: 7000
    `;

    try {
        const response = await openai.createCompletion({
            model: "gpt-3.5-turbo",
            prompt: prompt,
            max_tokens: 1500,
            temperature: 0.7,
        });

        const eventPlanText = response.data.choices[0].text.trim();
        
        // Parse the response text into an object
        const eventPlan = parseEventPlan(eventPlanText);
        return eventPlan;
    } catch (error) {
        console.error("Failed to generate event plan", error);
        throw error;
    }
}

function parseEventPlan(eventPlanText) {
    const lines = eventPlanText.split('\n').map(line => line.trim()).filter(line => line);
    const eventPlan = {
        Venue: '',
        Todos: [],
        Purchasables: [],
        Budget: 0
    };

    let currentSection = '';

    lines.forEach(line => {
        if (line.startsWith('- Ideal venue')) {
            currentSection = 'Venue';
            eventPlan.Venue = line.replace('- Ideal venue:', '').trim();
        } else if (line.startsWith('- Purchasables')) {
            currentSection = 'Purchasables';
        } else if (line.startsWith('- TODO List')) {
            currentSection = 'Todos';
        } else if (line.startsWith('- Budget total')) {
            currentSection = 'Budget';
            eventPlan.Budget = parseFloat(line.replace('- Budget total:', '').trim().replace('$', ''));
        } else {
            if (currentSection === 'Purchasables') {
                const [item, price] = line.split(':').map(part => part.trim());
                eventPlan.Purchasables.push({ item, price: parseFloat(price.replace('$', '')) });
            } else if (currentSection === 'Todos') {
                eventPlan.Todos.push(line);
            }
        }
    });

    return eventPlan;
}

module.exports = {
    generateEventPlan,
};