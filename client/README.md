# React Time Tracker

React based time tracker for keeping track of the time duration spend on tasks.

### Frontend

The client app is based on React.

### Backend

The backend service is based on Node.js powered by express.js.
The data is being persisted in MongoDB database.

## Setup (local environment)

You can also setup the project to run on a local environment.

### Requirements

This project requires the following modules/libraries:

- Nodejs 8.9.x or higher version
- npm 5.8.x or higher version
- mongo 3.4 or higher version

### Environment variables

First setup your environment variables.

windows:

```
set MONGO_URI=YOUR_MONGO_DATABASE_CONNECTION_STRING
```

Linux/MacOS:

```
export MONGO_URI=YOUR_MONGO_DATABASE_CONNECTION_STRING
```

### dependencies

To setup the project we need to install the dependencies for each project.
Run the following commands from the command prompt in the root directory:

      npm install
      cd client
      npm install
      cd ..

### Fill the database

To fill the database with mock data you can run the following script.

      npm setup

## Usage

To start the project run the following commands:

    npm run dev

this will start the project in development mode.
After the project started you can use the following endpoints:

| Method | Endpoint              | Description             |
| ------ | --------------------- | ----------------------- |
| GET    | http://localhost:4200 | Open the client web app |

## Author

Max Medina - https://github.com/maxmedina05

## License

This project is licensed under the terms of the **MIT** license.
