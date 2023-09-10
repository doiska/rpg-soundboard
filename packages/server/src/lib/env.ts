import "dotenv/config";

import { createEnv } from "@t3-oss/env-core";
import { z } from "zod";
import * as process from "process";

export const env = createEnv({
  server: {
    PORT: z.string().default("3001"),
  },
  shared: {
    NODE_ENV: z.enum(["development", "production"]).default("development"),
  },
  runtimeEnv: process.env,
});
