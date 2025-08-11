# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## Expanding the ESLint configuration

If you are developing a production application, we recommend using TypeScript with type-aware lint rules enabled. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for information on how to integrate TypeScript and [`typescript-eslint`](https://typescript-eslint.io) in your project.


# Setting up the Development environment
Install [VS Code studio](https://code.visualstudio.com/).
Install the following extensions in the VS Code: ES7 + React/Redux/React-Native snippets, Auto Rename Tag, Prettier-Code Formatter and Live Server.

Use [Vite](https://vite.dev/) for React Tooling. 
Then:
Check version of npm and node, `npm --version` and `node --version` respectfully. 
Otherwise download [Node](https://nodejs.org/en/download)

cd the location you would like to put your project, either Desktop or Downloads or Documents,,, then run `npm create vite@latest eastfacilities -- --template react`

Open the project in the VS Code. On the terminal run `npm install` and run the code `npm run dev` this will give you the local host server where to see your project as you make changes.

## Global Styles
- Less lines of Code for Styling in CSS under index.css in both assets and public folders
- These styles speed up development, avoid repeating code
- [Normalize.css](https://necolas.github.io/normalize.css/)
- small CSS file that provides cross-browser consistency in the default styling of HTML elements
- 'npm install normalize.css'
- import "normaliza.css" in index.js
SET BEFORE "index.css"
- replace contents of index.css


## Title and Favicon
- Add [favicon.icon](https://favicon.io/favicon-converter/) in the public folder
- Change title and favicon in index.html

# Libraries and Packages
## setting up backend
1. `cd eastfacilities`
2. `echo "Setting up backend..."`
3. `mkdir backend`
4. `cd backend`
5. `npm init -y`

`npm install express@4.19.2 mongoose@8.3.4 cors@2.8.5 dotenv@16.4.5`
<ol>
<li>express@4.19.2</li>
<ul>
<li>The web framework for your backend</li>
<li>Handles **HTTP requests** (GET, POST, PUT, DELETE) and routes them to your logic</li>
<li>Examples: When a user checks room availability, Express listens at '/availability' and runs the correct handler.</li>
</ul>
<li>mongoose@8.3.4</li>
<ul>
<li>MongoDB object modeling tool</li>
<li>Lets you define **schemas** and interact with MongoDB in a clean, structured way.</li>
<li>Example: 'Booking.find({ date: "2025-08-11 }) to find all bookings for a date.</li>
</ul>
<li>cors@2.8.5</li>
<ul>
<li>Middleware to enable **Cross-Origin Resource Sharing.**</li>
<li>Lets your React/Next.js frontend (running on a different port) talk to your backend  without browser blocking it.</li>
</ul>
<li>dotenv@16.4.5</li>
<ul>
<li>Loads **environment variables** from a `.env` file into `process.env`</li>
<li>Example: Store API keys ( 'STRIPE_SECRET), database connection strings, etc., without hardcoding them.</li>
</ul>

`npm install --save-dev nodemon@3.1.0`
<li>nodemon@3.1.0</li>
<ul>
<li>Development tool that **automatically restarts** your server when you change backend code.</li>
<li>Saves time so you don't have to stop and restart 'node server.js' manually.</li>
</ul>
</ol>
In short:
<ul>
<li>express → Serves API endpoints.</li>
<li>mongoose → Connects to MongoDB with structure.</li>
<li>cors → Lets frontend & backend talk to each other.</li>
<li>dotenv → Keeps secrets/config safe.</li>
<li>nodemon → Auto-restarts backend on changes.</li>
</ul>

## Optional advanced features
`npm install mpesa-api stripe@14.21.0 jsonwebtoken@9.0.2 bcryptjs@2.4.3 express-validator@7.0.1`
<ol>
<li>mpesa-api</li>
<ul>
<li>Library for integrating Safaricom **M-PESA Daraja API**</li>
<li>You'll use it for mobile money payments in Kenya</li>
</ul>
<li>stripe@14.21.0</li>
<ul>
<li>Stripe's official Node.js SDK.</li>
<li>Handles **credit/debit card* and other online payments (Apple Pay, Google Pay, etc.)</li>
<li>You'll use it for international/online card payments.</li>
</ul>
<li>jsonwebtoken@9.0.2</li>
<ul>
<li>For creating and verifying **JWT tokens.**</li>
<li>Commonly used for **user aunthentication** — e.g., log in, generate a token, and protect routes.</li>
</ul>
<li>bcryptjs@2.4.3</li>
<ul>
<li>Library for **hashing passwords** before storing them in the database.</li>
<li>Also used to compare entered passwords with stored hashes securely</li>
</ul> 
<li>express-validator@7.0.1</li>
<ul>
<li>Middleware for **validating and sanitizing** incoming request data in Express.</li>
<li>Examples: Ensures email format is correct, passwords meet length rules, etc.</li>
</ul>
</ol>
In your app:
<ul>
<li>mpesa-api → Mobile money payments</li>
<li>stripe → Card payments</li>
<li>jsonwebtoken → Authentication security</li>
<li>bcryptjs → Password protection</li>
<li>express-validator → Input validation</li>
</ul>

`cd ..`

## Setting up Frontend
### Frontend setup
1. `echo "Setting up frontend..."`
2. `mkdir frontend`
3. `cd frontend`
4. `npm init -y`

`npm install next@14.1.4 react@18.3.1 react-dom@18.3.1`
<ol>
<li>next@14.1.4</li>
<ul>
<li>The **Next.js** framework (built on React) for your frontend</li>
<li>Adds *server-side rendering (SSR)*, API routes, routing system, and better SEO support compared to plain React.</li>
</ul>
<li>react@18.3.1</li>
<ul>
<li>The core React library</li>
<li>Provides the component based UI building blocks</li>
</ul>
<li>react-dom@18.3.1</li>
<ul>
<li>Bridges React with the browser's DOM</li>
<li>Handles rendering React components into actual HTML elements</li>
</ul>


# Optional advanced frontend utilities
`npm install axios@1.6.8 swr@2.2.4 react-hook-form@7.50.1`
<li>axios@1.6.8</li>
<ul>
<li>HTTP client for making requests to your backend API (e.g., check availability, create bookings).</li>
<li>More powerful than the built-in `fetch`</li>
</ul>
<li>swr@2.2.4</li>
<ul>
<li>Data fetching & caching libraru from Vercel (makers of Next.js).</li>
<li>Perfect for **real-time availability updates** without manual refresh</li>
</ul>
<li>react-hook-form@7.50.1</li>
<ul>
<li>Simplifies form handling in React</li>
<li>Manages form state, validation, and submission efficiently (e.g., booking forma, payment forms).</li>
</ul>
</ol>
 In your booking app:
 <ul>
 <li>next / react / react-dom → The actual frontend framework & rendering engine.</li>
 <li>axios → Calls backend APIs for booking and payment.</li>
 <li>swr → Keeps room availability up-to-date in real-time.</li>
 <li>react-hook-form → Handles complex forms like "Book an Event" smoothly.
</li>
 </ul>

`cd ..`















