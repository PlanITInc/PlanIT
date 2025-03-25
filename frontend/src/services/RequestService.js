export class RequestService {
    async getEvent() {
        return new Promise((resolve, reject) => {
            try {
                // TODO: Replace with actual GET request using fetch or axios to cloud backend
                
                setTimeout(() => {
                    resolve({
                        venue: "The Beach",
                        todos: ["Get food", "Get drinks", "Get decorations"],
                        purchasables: [
                            {item: "Coke", price: 10.0}, 
                            {item: "Pizza", price: 20.0},
                            {item: "Balloons", price: 30.0}
                        ],
                        budget: 1000.0
                    });
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
                    resolve("Successfully posted event data");
                }, 2000);
            } catch (error) {
                reject(new Error(error));
            }
        });
    }
}