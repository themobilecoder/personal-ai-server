# Personal AI Server

Personal AI API is a project designed to serve an AI server under a proxy. It leverages Docker to expose the endpoint, making it easy to deploy and manage.

## Features

- Ollama server accessible through a proxy.
- Dockerised setup for streamlined deployment.

## Prerequisites

Before setting up the project, ensure you have the following installed:

- [Docker](https://www.docker.com/)
- [Docker Compose](https://docs.docker.com/compose/)

## Setup Instructions

### Configuration

- Update the `docker-compose.yml` file to configure the proxy and AI server settings as needed.
- Environment variables can be added to a `.env` file for within `proxy-server`.

### Run the docker containers

Build and start the Docker containers:

```bash
   docker-compose up
```

## Usage

To generate a response, send a POST request to the `/api/generate` endpoint with a request body similar to the one used for the Ollama endpoint. For example:

```json
{
  "model": "llama3.2",
  "prompt": "Your input prompt here",
  "options": {
    "temperature": 0.7
  }
}
```

Replace `"Your input prompt here"` with your desired prompt and adjust the options as needed.

Example using `curl`:

```bash
curl -X POST http://localhost:8080/api/generate -H "Content-Type: application/json" -d '{"model":"llama3.2","prompt": "Why is the sky blue? Answer in 1 sentence","options": {"temperature": 0.7}}'
```

## Contributing

Contributions are welcome! Feel free to open issues or submit pull requests.

## TODO:

- Refactor fastify to use `plugins`
- Separate files in `proxy-server` project
- Make the Ollama model a variable instead of defaulting to `llama3.2`
- Allow to create API keys to secure your own server for being accessed by anyone

## Licence

This project is licensed under the [MIT Licence](LICENSE).
