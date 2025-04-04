import { type FastifyPluginCallback, type FastifyReply } from "fastify";
import fp from "fastify-plugin";
import { readFileSync } from "fs";

const sendUnauthorised = (reply: FastifyReply) => {
    reply.code(401).send("Unauthorized");
};

const sendAuthorised = (reply: FastifyReply) => {
    //Need to set the `host` header as ollama requires it to be running in the same host
    return reply.headers({ "X-Proxy-Status": "OK", "host": "localhost:9000" }).send();
};

const loadApiKeys = (): string[] => {
    try {
        const data = readFileSync("/etc/api-keys", "utf-8");
        return data
            .split("\n")
            .filter((line) => line.trim() !== "" && !line.trim().startsWith("#"));
    } catch (err) {
        console.error("Error reading API keys file:", err);
        return [];
    }
};

const API_KEYS = loadApiKeys();

const isValidApiKey = (apiKey: string): boolean => {
    if (API_KEYS.length === 0) {
        console.warn("No API keys found. All requests will be denied.");
        return false;
    }
    return API_KEYS.includes(apiKey);
};

const route: FastifyPluginCallback = async (server) => {
    server.all("/validate", async (request, reply) => {
        try {
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
