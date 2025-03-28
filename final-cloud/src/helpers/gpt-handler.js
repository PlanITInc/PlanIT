const OpenAI = require("openai");
// import OpenAI from 'openai';

const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
});

async function generateEventPlan(eventDetails) {
    const prompt = `
    You are an event planner. Based on the following event details, generate an event plan:
    
    Date: ${eventDetails.date}
    Budget: ${eventDetails.budget}
    Location: ${eventDetails.location}
    Description: ${eventDetails.description}
    Estimated number of participants: ${eventDetails.participants}
    
    The event plan should include:
    - Ideal venue (with price if applicable)
    - Purchasables (each item/thing with a price, e.g., drinks, food, clown, photographer, etc.)
    - TODO List (ordered by priority, e.g., setting up balloons, table setup, chairs, etc.)
    - Email to send to participants
    - Budget total
    
    use the following example layout for the event plan. Make it into a JSON object so it can be easily parsed in javascript. Ensure there is no unexpected token in json at position 0 error:
    {
        venue: "Grand Ballroom",
        purchasables: [{ item: "Drinks", price: 500 }, { item: "Food", price: 1500 }],
        todos: ["Set up balloons", "Arrange tables", "Prepare sound system"],
        email: "Dear participants, we are excited to invite you to our event...",
        budget: 7000
    }
    `;

    try {
        console.log("Generating event plan");
        const response = await openai.chat.completions.create({
            model: "gpt-3.5-turbo",
            messages: [
                { role: "system", content: "You are an event planner." },
                { role: "user", content: prompt },
            ],
            max_tokens: 1000,
            temperature: 0.7,
        });
        const eventPlanText = response.choices[0].message.content.trim();
        
        // Parse the response text into an object
        console.log("Generated event plan:", eventPlanText);
        const eventPlan = JSON.parse(eventPlanText);
        console.log("Parsed event plan:", eventPlan);
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
        Budget: 0,
        Email: '' // Initialize Email as a string
    };

    let currentSection = '';

    lines.forEach(line => {
        if (line.startsWith('Venue:')) {
            currentSection = 'Venue';
            eventPlan.Venue = line.replace('Venue:', '').trim();
        } else if (line.startsWith('Purchasables:')) {
            currentSection = 'Purchasables';
        } else if (line.startsWith('TODO List:')) {
            currentSection = 'Todos';
        } else if (line.startsWith('Budget Total: ')) {
            currentSection = 'Budget';
            eventPlan.Budget = parseFloat(line.replace('Budget Total:', '').trim().replace('$', ''));
        } else if (line.startsWith('Budget:')) {  
            currentSection = 'Budget';
            eventPlan.Budget = parseFloat(line.replace('Budget:', '').trim().replace('$', '')); 
        } else if (line.startsWith('Email to Participants:')) {
            currentSection = 'Email';
        } else {
            if (currentSection === 'Purchasables') {
                const [item, price] = line.split(':').map(part => part.trim());
                eventPlan.Purchasables.push({ item, price: parseFloat(price.replace('$', '')) });
            } else if (currentSection === 'Todos') {
                eventPlan.Todos.push(line);
            } else if (currentSection === 'Email') {
                // Append lines to the Email string, preserving formatting
                eventPlan.Email += (eventPlan.Email ? '\n' : '') + line;
            }
        }
    });

    return eventPlan;
}

module.exports = {
    generateEventPlan,
};