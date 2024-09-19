# Adversarial Machine Learning challenge for the 5th Data Science and AI Symposium

## Before Contributing to This Project:

### Branching Strategy:

- Always create a separate branch for your changes.
- Never push your changes directly to the main branch.- Pull Requests:
- All changes must go through a pull request.
- Pull requests must be reviewed and approved before merging.
- Feel free to ask questions or seek clarification if needed.


### Prerequisites:

- Python: Version 3.10 or higher.
- Node.js / npm: You can install this via nvm (Node Version Manager) for better version control. You will need Node.js version 20 or higher
- nvm: Highly recommend you install nvm to manage your Node.js versions efficiently.


#### Create a Virtual Environment

**Python Virtual Environment**

- `python -m venv .venv`
- Activate it:
  - Windows: `source .venv\Scripts\activate`
  - Linux: `source .venv/bin/activate`

Alternatively, if you use Conda to manage your environments:

**Conda**

- Run: `conda create -n venv python=3.10`
- Activate it: `conda activate venv`

#### Install Python Dependencies:

- `pip install -r requirements.txt`

#### Install Node.js / npm Dependencies:

Install Node.js [Install npm](https://nodejs.org/en/download/package-manager)
Install nvm [Install nvm](https://github.com/nvm-sh/nvm)

- Run `nvm use node`
  - To get the latest version of node

### Front End

1. Navigate to the Project Directory:

   - `cd front-end`

2. Install Depencies:

   - `npm install`

3. Start the development server:

   - `npm run dev`

4. Front-End Structure: The front-end code primarily resides in the src/ folder, which contains the following key files:

- `src/App.jsx`: The main entry point for the React application. This is what you see when you go to `localhost:5173`
- `src/config.js` : Serves a global variable to indicate which route to to use for the API 
- `src/componets`: Independent site components. These componenets are used thoughrout the app to 
- `vite.config.js`: Configuration for the api routes

5. Why We Use Vite:

- Fast Development Server: Quick startup times and hot module replacement.
- Minimal Configuration: Works with simple defaults and doesn't require extensive setup.
- Modern Features: Supports ES6 modules and modern JavaScript features.

6. Creating a New React Project with Vite:

To create your own React project with Vite, you can run:

- `npm create vite@latest front-end-temp -- --template react`

This command uses Vite's project creation tool to set up a new React app in a directory called front-end-temp. Try it, create a separate react app with a different name.

### Back End

Back-End Setup

The back-end is built using Flask. The API serves the front-end and is set to run on port 5000 by default.

1. Navigate to the Back-End Directory:

- `cd back-end`

2. Run the Flask Application:

- `flask run`

This will start the Flask server on `http://localhost:5000/`.

3. API Endpoints:

   - `/api/users`: Returns a list of users in JSON format.
   - `/api/items`: Allows creation of new items through a POST request.

You can access the API at `http://localhost:5000/api/<endpoint>`.

### Running the Full App

To run the full stack:

1. Start the Flask Back-End: Make sure the Flask back-end is running on port 5000:

- `python app.py`

2. Start the React Front-End: In another terminal, navigate to the front-end directory and run the Vite development server on port 5173:

- `npm run dev`
- Flask API: Available at `http://localhost:5000/`.
- React Front-End: Available at `http://localhost:5173/`.

The Flask API will be available at `http://<localhost>:5000/`
The React front end will be available at `http://<localhost>:5173/`
These are just the default ports, feel free to change them

### Key Files

The following are the main files you need to focus on:

#### Front-End (React)

- `src/App.jsx`: The main React component.
- `src/CreateItem.jsx`: Handles creation of new items via the front-end.
- `src/UsersList.jsx`: Displays a list of users from the back-end API.

#### Back-End (Flask)

- `app.py`: The main Flask application file that defines the API routes.
- `config.py`: Contains environment-specific configuration (development/production) for CORS and other settings.

#### Customizing for Your Network

To run the app on your local network (accessible from other devices):

1. Flask Backend:

- In `app.py`, modify the host from `localhost` to `0.0.0.0` to bind to all network interfaces:
- `app.run(host='0.0.0.0', port=5000)`

2. Vite Front-End:

- In `vite.config.js`, you can modify the `server.host` to `0.0.0.0` so it can be accessed via your local network IP:

```
{
    server: {
      host: '0.0.0.0',
      port: 5173,
      proxy: {
        "/api": {
          target: "http://<your-ip>:5000",
          changeOrigin: true,
          secure: false,
        },
      },
    },
}
```

Replace `<your-ip>` with your machine's local IP address (ex: `192.168.0.1`) to access the app from other devices on the same network.
