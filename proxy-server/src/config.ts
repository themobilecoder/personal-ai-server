import "dotenv/config";

export const PROXY_HOST: string = process.env.PROXY_HOST ?? "0.0.0.0";
export const PROXY_PORT: number = parseInt(
  process.env.PROXY_PORT ?? "8080",
  10,
);
export const OLLAMA_HOST: string =
  process.env.OLLAMA_HOST ?? "http://ollama:11434";
