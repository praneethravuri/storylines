## Installation

### Using Docker

For a containerized setup of StoryLines, please refer to our [Docker Setup Guide](docker-setup.md).

### Manual Installation

If you prefer a manual installation, follow these steps:

1. Clone the repository:

    ```bash
    git clone https://github.com/praneethravuri/storylines.git
    cd storylines
    ```

2. Install dependencies for both client and server:

    ```bash
    cd client && npm install
    cd ../server && npm install
    cd ..
    ```

3. Set up the server environment:
   Create a `.env.local` file in the server directory with the following content:

    ```
    MONGODB_URI=your_mongodb_uri_here
    PORT=5000
    NODE_ENV=development
    ```

    Replace `your_mongodb_uri_here` with your actual MongoDB connection string.

4. Starting the application:

    From the root directory of the project, you can use the following npm scripts:

    - To start the client:

        ```bash
        npm run client
        ```

    - To start the server:

        ```bash
        npm run server
        ```

    - To start both the client and server concurrently:
        ```bash
        npm run dev
        ```

### Accessing the Application

-   The client application will be accessible at `http://localhost:3000` (or the port specified in your client configuration)
-   The server API will be accessible at `http://localhost:5000` (or the port specified in your `.env.local` file)

For more detailed instructions on development and deployment, please refer to our [Development Guide](development.md).
