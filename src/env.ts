import { z } from "zod";

const envSchema = z.object({
    DATABASE_URL: z.string().url(),
    PASSWORD_HASH: z.string(),
    JWT_SECRET: z.string(),
    API_PORT: z.coerce.number().default(3333),
});

export const env = envSchema.parse(process.env);
