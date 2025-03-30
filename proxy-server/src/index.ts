import fastify, {
  FastifyInstance,
  FastifyReply,
  FastifyRequest,
} from "fastify";
import { PROXY_HOST, PROXY_PORT, OLLAMA_HOST } from "./config";
import rawbody from "fastify-raw-body";
import formbody from "@fastify/formbody";
import multipart from "@fastify/multipart";

const server: FastifyInstance = fastify();
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
server
  .register(rawbody, {
    field: "rawBody",
    global: false,
    encoding: "utf8",
    runFirst: true,
    routes: [],
    jsonContentTypes: [],
  })
  .then(() => {
    server.post("/api/generate", {
      config: {
        rawBody: true,
      },
      handler: async (
        request: FastifyRequest,
        reply: FastifyReply,
      ): Promise<string> => {
        try {
          console.log("Request received");
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

    const startServer = async (): Promise<void> => {
      try {
        console.log(`Starting server..`);
        const address = await server.listen({
          host: PROXY_HOST,
          port: PROXY_PORT,
        });
        console.log(`AI API is now running at ${address}`);
      } catch (err) {
        console.error(err);
        process.exit(1);
      }
    };

    startServer();
  });
