import type { FastifyPluginCallback } from "fastify";
import fp from "fastify-plugin";

const route: FastifyPluginCallback = async (server) => {
  server.get("/health", async (_req, res) => {
    res.send({ status: "OK" });
  });
};

export default fp(route);
