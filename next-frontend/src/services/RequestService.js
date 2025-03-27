export class RequestService {
    async getEvent() {
        return new Promise((resolve, reject) => {
            try {
                // TODO: Replace with actual GET request using fetch or axios to cloud backend
    
                setTimeout(() => {
                    resolve({
                        eventId: 1,
                        eventName: "Beach Party",
                        venue: "Sunset Beach",
                        todos: ["Get food", "Get drinks", "Get decorations"],
                        purchasables: [
                            { item: "Coke", price: 10.0 },
                            { item: "Pepsi", price: 8.0 },
                            { item: "Sprite", price: 9.0 },
                            { item: "Water", price: 5.0 },
                            { item: "Pizza", price: 20.0 },
                            { item: "Balloons", price: 30.0 }                    
                        ],
                        budget: 10000.0
                    })
                }, 2000);
            } catch (error) {
                reject(new Error(error));
            }
        });
    }

    async postEvent() {
        return new Promise((resolve, reject) => {
            try {
                // TODO: Replace with actual POST request using fetch or axios to cloud backend

                setTimeout(() => {
                    resolve({
                        eventId: 1,
                        message: "Successfully posted event data"
                    });
                }, 2000);
            } catch (error) {
                reject(new Error(error));
            }
        });
    }
}