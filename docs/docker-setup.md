# Docker Setup Guide for StoryLines

This guide provides instructions for setting up and running the StoryLines application using Docker. It covers building your own images, creating containers, and running the application both for development and production environments.

## Prerequisites

- [Docker](https://docs.docker.com/get-docker/)
- [Docker Compose](https://docs.docker.com/compose/install/)
- Git

## Cloning the Repository

1. Clone the StoryLines repository:
   ```
   git clone https://github.com/praneethravuri/storylines-v2.git
   cd storylines-v2
   ```

## Building Docker Images

### Development Images

1. Build the development images:
   ```
   docker-compose -f docker-compose.dev.yml build
   ```

### Production Images

1. Build the production images:
   ```
   docker-compose build
   ```

## Running the Application

### Development Environment

1. Start the application in development mode:
   ```
   docker-compose -f docker-compose.dev.yml up
   ```

2. Access the application:
   - Client: http://localhost:3000
   - Server: http://localhost:5000

3. Stop the application:
   ```
   docker-compose -f docker-compose.dev.yml down
   ```

### Production Environment

1. Start the application in production mode:
   ```
   docker-compose up
   ```

2. Access the application:
   - Client: http://localhost:3000
   - Server: http://localhost:5000

3. Stop the application:
   ```
   docker-compose down
   ```

## Building and Pushing Your Own Images

If you've made changes and want to build and push your own images:

1. Build the images:
   ```
   docker-compose build
   ```

2. Tag the images (replace `yourusername` with your Docker Hub username):
   ```
   docker tag storylines-v2-client yourusername/storylines-client:latest
   docker tag storylines-v2-server yourusername/storylines-server:latest
   ```

3. Push the images to Docker Hub:
   ```
   docker push yourusername/storylines-client:latest
   docker push yourusername/storylines-server:latest
   ```

4. Update the `docker-compose.yml` file to use your new image names.

## Troubleshooting

- If you encounter permission issues, you may need to run Docker commands with `sudo`.
- Ensure all required environment variables are set in the `.env.local` file in the server directory.
- If changes aren't reflected, try rebuilding the images with `docker-compose build --no-cache`.

## Additional Docker Commands

- View running containers:
  ```
  docker ps
  ```

- View all containers (including stopped ones):
  ```
  docker ps -a
  ```

- View Docker images:
  ```
  docker images
  ```

- Remove a container:
  ```
  docker rm container_name
  ```

- Remove an image:
  ```
  docker rmi image_name
  ```

- View container logs:
  ```
  docker logs container_name
  ```

## Best Practices

- Keep your Docker images updated with the latest security patches.
- Use specific tag versions for base images instead of `latest` to ensure consistency.
- Regularly prune unused Docker objects to free up space:
  ```
  docker system prune
  ```

For more detailed information about Docker, refer to the [official Docker documentation](https://docs.docker.com/).