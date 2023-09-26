import {pgSchema, timestamp, varchar} from "drizzle-orm/pg-core";
import {users} from "./user.schema";
import {createInsertSchema} from "drizzle-zod";

export const connections = pgSchema("app").table("connections", {
    userId: varchar("user_id"),
    //.references(() => users.id),
    socketId: varchar("socket_id").notNull(),
    createdAt: timestamp("created_at").notNull().defaultNow(),
    updatedAt: timestamp("updated_at").notNull().defaultNow(),
})

export type ConnectionInsert = typeof connections.$inferInsert;
export type Connection = typeof connections.$inferSelect;

export const connectionsInsertSchema = createInsertSchema(connections);
export const connectionsSelectSchema = createInsertSchema(connections);
