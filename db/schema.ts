import { pgTable, text, integer, timestamp, jsonb } from "drizzle-orm/pg-core";
import { createInsertSchema, createSelectSchema } from "drizzle-zod";
import { z } from "zod";

export const analyses = pgTable("analyses", {
  id: integer("id").primaryKey().generatedAlwaysAsIdentity(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  scores: jsonb("scores").notNull(),
  imageUrls: text("image_urls").array().notNull(),
});

export const insertAnalysisSchema = createInsertSchema(analyses);
export const selectAnalysisSchema = createSelectSchema(analyses);
export type InsertAnalysis = z.infer<typeof insertAnalysisSchema>;
export type Analysis = z.infer<typeof selectAnalysisSchema>;
