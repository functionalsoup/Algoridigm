import { pgTable, text, serial, integer, boolean, timestamp, varchar, jsonb, primaryKey, foreignKey } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";
import { relations } from "drizzle-orm";

// Users table
export const users = pgTable("users", {
  id: serial("id").primaryKey(),
  username: text("username").notNull().unique(),
  password: text("password").notNull(),
  displayName: text("display_name"),
  role: text("role").default("user"),
  createdAt: timestamp("created_at").defaultNow(),
});

// Presentations table
export const presentations = pgTable("presentations", {
  id: serial("id").primaryKey(),
  title: text("title").notNull(),
  description: text("description"),
  theme: text("theme").default("dark"),
  createdBy: integer("created_by").references(() => users.id),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
  isPublic: boolean("is_public").default(false),
});

// Slides table
export const slides = pgTable("slides", {
  id: serial("id").primaryKey(),
  presentationId: integer("presentation_id").references(() => presentations.id).notNull(),
  title: text("title"),
  type: text("type").notNull(), // 'opening', 'content', 'ceo', 'reveal', 'about', etc.
  content: jsonb("content"), // Store slide content as JSON
  orderIndex: integer("order_index").notNull(),
  transitionType: text("transition_type").default("fade"),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});

// Visual Elements table
export const visualElements = pgTable("visual_elements", {
  id: serial("id").primaryKey(),
  slideId: integer("slide_id").references(() => slides.id).notNull(),
  type: text("type").notNull(), // 'text', 'image', 'animation', 'bacteria', 'error', etc.
  content: jsonb("content"),
  positionX: integer("position_x").default(0),
  positionY: integer("position_y").default(0),
  width: integer("width"),
  height: integer("height"),
  style: jsonb("style"), // CSS or styling options as JSON
  animation: jsonb("animation"), // Animation parameters
  orderIndex: integer("order_index").default(0),
});

// Workshop registrations for the theater workshop
export const workshopRegistrations = pgTable("workshop_registrations", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  email: text("email").notNull(),
  phone: text("phone"),
  role: text("role").notNull(), // Primary role - 'actor', 'designer', 'tech', etc.
  secondaryRole: text("secondary_role"), // Secondary role (optional)
  experience: text("experience"),
  availability: text("availability"),
  message: text("message"),
  createdAt: timestamp("created_at").defaultNow(),
});

// Define relationships
export const usersRelations = relations(users, ({ many }) => ({
  presentations: many(presentations),
}));

export const presentationsRelations = relations(presentations, ({ one, many }) => ({
  creator: one(users, {
    fields: [presentations.createdBy],
    references: [users.id],
  }),
  slides: many(slides),
}));

export const slidesRelations = relations(slides, ({ one, many }) => ({
  presentation: one(presentations, {
    fields: [slides.presentationId],
    references: [presentations.id],
  }),
  elements: many(visualElements),
}));

export const visualElementsRelations = relations(visualElements, ({ one }) => ({
  slide: one(slides, {
    fields: [visualElements.slideId],
    references: [slides.id],
  }),
}));

// Schema for insertions
export const insertUserSchema = createInsertSchema(users).pick({
  username: true,
  password: true,
  displayName: true,
  role: true,
});

export const insertPresentationSchema = createInsertSchema(presentations).pick({
  title: true,
  description: true,
  theme: true,
  createdBy: true,
  isPublic: true,
});

export const insertSlideSchema = createInsertSchema(slides).pick({
  presentationId: true,
  title: true,
  type: true,
  content: true,
  orderIndex: true,
  transitionType: true,
});

export const insertVisualElementSchema = createInsertSchema(visualElements).pick({
  slideId: true,
  type: true,
  content: true,
  positionX: true,
  positionY: true,
  width: true,
  height: true,
  style: true,
  animation: true,
  orderIndex: true,
});

export const insertWorkshopRegistrationSchema = createInsertSchema(workshopRegistrations).pick({
  name: true,
  email: true,
  phone: true,
  role: true,
  secondaryRole: true,
  experience: true,
  availability: true,
  message: true,
});

// Types for TypeScript
export type InsertUser = z.infer<typeof insertUserSchema>;
export type User = typeof users.$inferSelect;

export type InsertPresentation = z.infer<typeof insertPresentationSchema>;
export type Presentation = typeof presentations.$inferSelect;

export type InsertSlide = z.infer<typeof insertSlideSchema>;
export type Slide = typeof slides.$inferSelect;

export type InsertVisualElement = z.infer<typeof insertVisualElementSchema>;
export type VisualElement = typeof visualElements.$inferSelect;

export type InsertWorkshopRegistration = z.infer<typeof insertWorkshopRegistrationSchema>;
export type WorkshopRegistration = typeof workshopRegistrations.$inferSelect;
