import { Config } from "drizzle-kit";

const config = {
  out: "./migrations",
  schema: "./src/lib/db",
  driver: "pg",
} satisfies Config;

export default config;
