# Personal AI Server

Personal AI Server is a project designed to serve an AI server under a proxy.

This project uses `ollama` as the AI model, accessible behind a proxy that requires an `Authorization` header to access.

## Features

- Ollama server accessible through a proxy
- Dockerised setup for simple deployment

## Prerequisites

Before setting up the project, ensure you have the following installed:

- [Docker](https://www.docker.com/)
- [Docker Compose](https://docs.docker.com/compose/)
- Host computer (A computer that can run Docker e.g. macOS, Linux, a public server, etc.)

## Running the server

1. Fork/Copy/Clone this repository
2. Update `/api-keys` and add the keys that you allow to access your endpoint

For example

```
12312-323214-432324-23432
aslkdnk-321kn-321nkasd-321
```

2.1 (Optional) Generate keys using `openssh`

```
echo "ak-auth-$(openssl rand -hex 16)"
```

3. Run the server by starting the docker containers (ollama, auth-server, caddy) using `docker-compose`

```
docker compose up -d
```

This will use `docker-compose.yml` and run your server behind port `9000` by default.

## Using the server

Since this server just hides the `ollama` server behind an authenticated proxy, the endpoints and requests will be the same as talking to an `ollama` server.

The difference is that now it requires a `Authorization` header to prevent others from using your AI server, especially if you are planning to host your server publicly.

An example cURL request for your server would look something like this:

```bash
curl -X POST http://localhost:9000/api/generate -H "Authorization: your-secret-api-key" -d '{"model":"llama3.2","prompt": "Why is the sky blue? Answer in 1 sentence","options": {"temperature": 0.7}}'
```

## Running on macOS with Apple Silicon GPU

If you're running this project on a Mac, the `ollama` server running inside the docker container [won't be able to utilise your Mac's GPU](https://ollama.com/blog/ollama-is-now-available-as-an-official-docker-image).

Whilst using the default setup works, `ollama` running inside the Docker container will only use the Mac's CPU instead of the GPU, making the performance slower.

In order to make the performance better, it is advised to run `ollama` on your Mac instead of being inside a docker container.

### Setup `ollama` on your Mac

1. Download `ollama` [here](https://ollama.com/download/mac) or install using `brew`

```
brew install ollama
```

2. Run ollama using the app shortcut or command-line

```
ollama serve
```

3. Pull a model

```
ollama run llama3.2
```

4. Run the `personal-ai-server` using `docker-compose-mac-native.yml`

```
docker compose -f docker-compose-mac-native.yml up -d
```

This will use a different configuration where the `caddy` proxy will redirect authenticated requests to your Mac's running `ollama` server and will not have `ollama` running inside a Docker container.

## Hosting on a computer exposing the server publicly

One of the aim of this project is to have your own AI server to be accessibly publicly.

### Using zrok

You can use `zrok` to host your server and expose it to the internet via a public URL.

1. Sign up for an account in [`zrok`](https://myzrok.io/)
2. Log in to [zrok api](https://api-v1.zrok.io/) and obtain the secret account token
3. Come up with a [unique address token](https://docs.zrok.io/docs/concepts/sharing-reserved/). This will be useful to have a consistent URL to access your server.
4. Run the script found in `scripts/setup_zrok.sh`

```bash
chmod +x scripts/setup_zrok.sh
scripts/setup_zrok.sh --token YOUR_SECRET_TOKEN uniqueaddress123
```

5. Once successful, you should be able to publlicly access to your AI server using `https://uniqueaddress123.share.zrok.io`

## Contributing

Contributions are welcome! Feel free to open issues or submit pull requests.

## TODO:

- Make the Ollama model a variable instead of defaulting to `llama3.2`

## Licence

This project is licensed under the [MIT Licence](LICENSE).
