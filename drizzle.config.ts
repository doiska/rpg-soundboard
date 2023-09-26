import { Config } from "drizzle-kit";

const config = {
  out: "./migrations",
  schema: "./apps/shared/schemas",
  driver: "pg",
} satisfies Config;

export default config;
