import fastify, { FastifyInstance } from "fastify";
import { PROXY_HOST, PROXY_PORT } from "./config";
import autoload from "@fastify/autoload";
import path from "path";

const server: FastifyInstance = fastify();
server.register(autoload, {
  dir: path.join(__dirname, "plugins"),
});
server.register(autoload, {
  dir: path.join(__dirname, "routes"),
});

const startServer = async (): Promise<void> => {
  try {
    console.log(`Starting server..`);
    const address = await server.listen({
      host: PROXY_HOST,
      port: PROXY_PORT,
    });
    console.log(`auth-server is now running at ${address}`);
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
};

startServer();
