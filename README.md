# Mapstack Project by Lily Henderson and Aaron Hopkins

Mapstack is a simple, responsive, map creating and viewing application.

This project demonstrates HTML, CSS, SASS, JS, EJS, jQuery and AJAX front-end skills, as well as Node, Express, and postgreSQL back-end skills.  Additional skills acquired during the completion of this project are the use of LeafletJS for the maps and Bootstrap for the styling.

Please see a deployed version of the app at https://mapstack-backend.onrender.com/

## Getting Started

1. Clone this repository onto your local device.
2. Install dependencies using the `npm install` command.
3. Start the web server using the `npm run start` command. The app will be served at <http://localhost:8080/>.
4. Go to <http://localhost:8080/> in your browser.

## Dependencies

- "bcrypt": "^5.1.1",
- "chalk": "^2.4.2",
- "cookie-session": "^2.1.0",
- "dotenv": "^2.0.0",
- "ejs": "^2.6.2",
- "express": "^4.17.1",
- "leaflet": "^1.9.4",
- "morgan": "^1.9.1",
- "pg": "^8.5.0",
- "sass": "^1.35.1"

## Final Product

![profile view](/screenshots/profile.png)
![map view](/screenshots/mapview.png)
![point view](/screenshots/pointview.png)

## Stack Requirements
A web app that allows users to collaboratively create maps which list multiple "points". For example: "Best Places to Eat Around Town" or "Locations of Movie Scenes".

- ES6 for server-side (NodeJS) code
- NodeJS
- Express
- RESTful routes
- One or more CSS or UI "framework"s:
- jQuery
- A CSS preprocessor such as SASS, Stylus, or PostCSS for styling -- or CSS Custom properties and no CSS preprocessor
- PostgreSQL and pg (with promises) for DBMS
- git for version control
### Optional Functionality
- SPA (Single-Page Application) Behaviour
- Hosting, such as Railway.app, netlify, github pages, AWS, or Azure

## Functional Requirements
- users can see a list of the available maps
- users can view a map
- a map can contain many points
- each point can have: a title, description, and image
- authenticated users can create maps
- authenticated users can modify maps (add, edit, remove points)
- authenticated users can favourite a map
- authenticated users have profiles, indicating their favourite maps and maps they've contributed to
- use http://leafletjs.com/ or https://developers.google.com/maps/
