# Student Portal

## Introduction
This is a basic student portal where authorized users can view student data, update it, and add new students.

### Technologies Used
- Frontend: EJS
- Backend: Node.js, MySQL, Redis

## File Structure
- `app.js`: Specifies the port the app is using.
- `loader.js`: Loads necessary files and sets global restrictions on the app (e.g., URL encoding).
- `router.js`: Defines routes, middleware, and controllers.
- `services/`: Contains files for database and Redis services.
- `middleware/`: Houses functions for authentication and sending responses.
- `controllers/`: Contains logic for APIs using services.
- `config/`: Holds configuration files, such as database configuration.
- `models/`: Defines database models, like the student model.
- `test/`: Contains unit tests for APIs using Jest.
- `utilities/`: Includes files for database connection, response validation, and session handling.
- `views/`: Contains EJS templates for the frontend.

## Environment
- If `ENV` is set to `test`, the application will only send API responses without authentication.
- If `ENV` is set to `production`, the application will perform authentication and render the frontend using EJS with the help of API responses.

## How to Start
1. Ensure MySQL and Redis services are running.
2. Run `npm install`.
3. Change the environment to `production` in the `.env` file to render the frontend.
4. Run `npm start`.
5. The application will run on port 3000.

![MySQL](public/images/MySQL.png =50x50)
![Redis](public/images/Redis.png =50x50)

Feel free to contribute by submitting pull requests or reporting issues!
