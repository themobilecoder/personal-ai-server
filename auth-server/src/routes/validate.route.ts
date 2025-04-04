import { type FastifyPluginCallback, type FastifyReply } from "fastify";
import fp from "fastify-plugin";

const sendUnauthorised = (reply: FastifyReply) => {
    reply.code(401).send("Unauthorized");
};

const sendAuthorised = (reply: FastifyReply) => {
    //Need to set the `host` header as ollama requires it to be running in the same host
    return reply.headers({ "X-Proxy-Status": "OK", "host": "localhost:9000" }).send();
};

//TODO: Implement API key validation logic
const isValidApiKey = (apiKey: string): boolean => {
    return '123456' === apiKey;
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
