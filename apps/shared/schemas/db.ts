import { default as postgres } from "postgres";
import {drizzle} from "drizzle-orm/postgres-js";

const sql = postgres({
    host: "localhost",
    username: "postgres",
    password: "doiska",
    database: "postgres",
    port: 5432,
});

export const kil = drizzle(sql);
