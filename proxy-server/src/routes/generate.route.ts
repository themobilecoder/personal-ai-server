import type {
  FastifyPluginCallback,
  FastifyReply,
  FastifyRequest,
} from "fastify";
import { OLLAMA_HOST } from "../config";
import fp from "fastify-plugin";

const route: FastifyPluginCallback = async (server) => {
  server.post("/api/generate", {
    config: {
      rawBody: true,
    },
    handler: async (
      request: FastifyRequest,
      reply: FastifyReply,
    ): Promise<string> => {
      try {
        console.log(request.headers);
        const url = OLLAMA_HOST + "/api/generate";
        const response = await fetch(url, {
          method: request.method,
          body: request.rawBody,
        });
        return reply.send(response);
      } catch (err) {
        console.log(err);
        return reply.code(500).send("Error generating response");
      }
    },
  });
};

export default fp(route);
