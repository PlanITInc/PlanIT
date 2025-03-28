export class RequestService {
    async getEvent(eventId) {
        try {
            const response = await fetch(`https://planit-api-management-service.azure-api.net/planit-function-app/event?eventId=${eventId}`, {
                method: "GET"
            });

            if (!response.ok) {
                throw new Error(`HTTP Error, status: ${response.status}`);
            }

            const result = await response.json();
            return result;
        } catch (error) {
            throw new Error(error);
        }
    }

    async postEvent(formDataObj) {
        try {
            console.log(formDataObj.get("eventDetails"));
            console.log(formDataObj.get("inspirationImages"));

            const response = await fetch("https://planit-api-management-service.azure-api.net/planit-function-app/event", {
                method: "POST",
                body: formDataObj
            });

            console.log(response);

            if (!response.ok) {
                throw `HTTP Error, status: ${response.status}`;
            }

            const result = await response.text();
            return result;
        } catch (error) {
            throw new Error(error);
        }
    }
}