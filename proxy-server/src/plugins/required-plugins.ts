import { type FastifyInstance, type FastifyPluginCallback } from "fastify";
import formbody from "@fastify/formbody";
import multipart from "@fastify/multipart";
import rawbody from "fastify-raw-body";
import fp from "fastify-plugin";

const requiredPlugins: FastifyPluginCallback = async (
  server: FastifyInstance,
) => {
  server.register(formbody);
  server.register(multipart);
  server.addContentTypeParser("*", (_request, payload, done) => {
    let data = "";
    payload.on("data", (chunk) => {
      data += chunk;
    });
    payload.on("end", () => {
      done(null, data);
    });
  });
  server.register(rawbody, {
    field: "rawBody",
    global: false,
    encoding: "utf8",
    runFirst: true,
    routes: [],
    jsonContentTypes: [],
  });
};

export default fp(requiredPlugins);
