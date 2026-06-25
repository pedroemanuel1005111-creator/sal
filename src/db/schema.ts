import {
  pgTable,
  serial,
  text,
  varchar,
  timestamp,
  integer,
} from "drizzle-orm/pg-core";

// Portfólio / Cases de sucesso
export const projects = pgTable("projects", {
  id: serial("id").primaryKey(),
  title: varchar("title", { length: 200 }).notNull(),
  segment: varchar("segment", { length: 150 }).notNull().default(""),
  category: varchar("category", { length: 80 }).notNull().default("Sites"),
  description: text("description").notNull().default(""),
  imageUrl: text("image_url").notNull().default(""),
  url: text("url").notNull().default(""),
  tech: varchar("tech", { length: 250 }).notNull().default(""),
  results: text("results").notNull().default(""),
  testimonial: text("testimonial").notNull().default(""),
  sortOrder: integer("sort_order").notNull().default(0),
  createdAt: timestamp("created_at").notNull().defaultNow(),
});

// Galeria de mídia (fotos e vídeos)
export const media = pgTable("media", {
  id: serial("id").primaryKey(),
  type: varchar("type", { length: 20 }).notNull().default("image"), // image | video
  url: text("url").notNull(),
  title: varchar("title", { length: 200 }).notNull().default(""),
  category: varchar("category", { length: 80 }).notNull().default("Geral"),
  sortOrder: integer("sort_order").notNull().default(0),
  createdAt: timestamp("created_at").notNull().defaultNow(),
});

// Pedidos online feitos pelo site
export const orders = pgTable("orders", {
  id: serial("id").primaryKey(),
  name: varchar("name", { length: 200 }).notNull(),
  email: varchar("email", { length: 200 }).notNull().default(""),
  phone: varchar("phone", { length: 60 }).notNull().default(""),
  serviceType: varchar("service_type", { length: 120 }).notNull().default(""),
  budget: varchar("budget", { length: 80 }).notNull().default(""),
  deadline: varchar("deadline", { length: 80 }).notNull().default(""),
  message: text("message").notNull().default(""),
  status: varchar("status", { length: 40 }).notNull().default("Novo"),
  createdAt: timestamp("created_at").notNull().defaultNow(),
});

// Configurações editáveis do site (textos, contatos, etc.)
export const settings = pgTable("settings", {
  key: varchar("key", { length: 120 }).primaryKey(),
  value: text("value").notNull().default(""),
});

export type Project = typeof projects.$inferSelect;
export type Media = typeof media.$inferSelect;
export type Order = typeof orders.$inferSelect;
export type Setting = typeof settings.$inferSelect;
