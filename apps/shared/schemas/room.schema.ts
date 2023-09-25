import {pgSchema, serial, timestamp, varchar} from "drizzle-orm/pg-core";
import {createInsertSchema, createSelectSchema} from "drizzle-zod";
import {z} from "zod";
import {users} from "./user.schema";

export const rooms = pgSchema("app").table("rooms", {
    id: serial("id").primaryKey().notNull(),
    name: varchar("name").notNull(),
    createdAt: timestamp("created_at").defaultNow(),
    updatedAt: timestamp("updated_at").defaultNow(),
});

export type Room = typeof rooms.$inferInsert
export const roomsInsertSchema = createInsertSchema(rooms);
export const roomsSelectSchema = createSelectSchema(rooms);

export const roomMembers = pgSchema("app").table("room_members", {
    userId: varchar("user_id").notNull().references(() => users.id),
    roomId: varchar("room_id").notNull().references(() => rooms.id),
    createdAt: timestamp("created_at").defaultNow(),
    updatedAt: timestamp("updated_at").defaultNow(),
});

export const roomMembersInsertSchema = createInsertSchema(roomMembers);
