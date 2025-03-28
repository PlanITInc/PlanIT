# PlanIT
![planitinput](https://github.com/user-attachments/assets/80903a0f-866b-4cfc-ab28-f78397460b9a)
![planitdashboard2](https://github.com/user-attachments/assets/bd449226-4ed1-44c8-b793-90441884499e)
## Inspiration
Event planning can be incredibly stressful, with countless details to manage, from to-do lists and shopping items to venue logistics and schedules. Building PlanIT offers a chance to simplify this chaotic process by creating an intelligent app that automates planning tasks, reduces decision fatigue, and ensures nothing is overlooked. It’s an opportunity to solve a real-world problem and deliver peace of mind to users, making event planning enjoyable instead of overwhelming.


## What it does
The application is designed to make event planning stress-free. By taking inputs from event planners such as the date of the event, location, budget, description, inspiration images, and number of participants, PlanIT takes all of this information and creates an event plan filled with todos, items to purchase, event details, and progress meter all in a compact UI that simplifies the process of event planning.

## How we built it
We built PlanIT by using Next/React for the front end and Microsoft Azure cloud services for the back end. We used Microsoft Azure cloud services such as API Management, Function App, Cosmos DB, Blob Storage, Computer Vision and used these technologies to interact with an external LLM API such as GPT 3.5 Turbo (deployed to the Azure cloud) to help generate event plans for users. Additionally, for our front end we served this through Azure's Static Web Apps.

The workflow of our application was to take user inputs from the front end, passing them to the cloud back end through Azure's API Management and using Function App to execute function calls to Azure's built-in Computer Vision model and GPT 3.5 Turbo to create event plans that would then be stored into Azure's Cosmos DB.
![planit drawio(2)](https://github.com/user-attachments/assets/73f8073b-d4b0-4126-9f34-60053e134478)

## Challenges we ran into
One challenge in particular that we ran into was taking the inspiration images from the front end and passing them to Azure's built-in Computer Vision model to analyze the images and use them as part of the prompt when querying GPT 3.5 Turbo.

Another challenge was collaborating on azure functions in a group. Different group members were required to modify the same function and services, which made it difficult as conflicts arose. Our solution was to just work on our own parts locally then combine each feature at the end.

## Accomplishments that we're proud of
We are particularly proud of creating a fully functional web application utilizing a variety of Microsoft Azure cloud services to help create an event planner that provides useful event planning information.

## What we learned
We learned how to utilize Microsoft Azure cloud services in unison to create a decentralized back end to perform functionalities of a full stack application database.

## What's next for PlanIT
We plan to expand our application by making the UI more interactive and responsive. Additionally, we plan to increase security on the cloud and client. This includes adding a virtual network, firewall, and user authentication so that user's can manage and edit their events to their needs and go back to previous events they have created before.
