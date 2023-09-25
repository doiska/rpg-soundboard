import * as postgres from "postgres";
import {drizzle} from "drizzle-orm/postgres-js";

const sql = postgres({
    host: "localhost",
});

export const kil = drizzle(sql);
