import { config } from "./deps.ts";

// This will throw on missing env variables
config({ safe: true, export: true });

export const port = parseInt(Deno.env.get("PORT") || "8080");
export const googleApiKey = Deno.env.get("GOOGLE_API_KEY") || "";
