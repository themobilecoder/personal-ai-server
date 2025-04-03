import type { FastifyPluginCallback, FastifyReply } from "fastify";
import fp from "fastify-plugin";

const sendUnauthorised = (reply: FastifyReply) => {
  reply.code(401).send("Unauthorized");
};

const sendAuthorised = (reply: FastifyReply) => {
  return reply.header("X-Proxy-Status", "OK").send();
};

//TODO: Implement API key validation logic
const isValidApiKey = (_apiKey: string): boolean => {
  return true;
};

const route: FastifyPluginCallback = async (server) => {
  server.all("/validate", async (request, reply) => {
    try {
      console.log(request.headers);
      const apiKey = request.headers["authorization"];
      if (!apiKey) {
        return sendUnauthorised(reply);
      }
      return isValidApiKey(apiKey)
        ? sendAuthorised(reply)
        : sendUnauthorised(reply);
    } catch (err) {
      return sendUnauthorised(reply);
    }
  });
};

export default fp(route);
