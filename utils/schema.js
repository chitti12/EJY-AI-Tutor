import { integer, pgTable, serial, text, varchar } from "drizzle-orm/pg-core";

export const EJYAITutor = pgTable('ejyaidb', {
    id:serial('id').primaryKey(),
    quesAsk:varchar('quesAsk').notNull(),
    createdBy:varchar('createdBy').notNull(),
    createdAt:varchar('createdAt').notNull(),
    quesId:varchar('quesId').notNull(),
    answer:text('answer').notNull()
});

export const Feedback = pgTable('feedback', {
    id:serial('id').primaryKey(),
    rating:integer('rating').notNull(),
    review:text('review').notNull(),
    createdBy:varchar('createdBy').notNull(),
    createdAt:varchar('createdAt').notNull(),
});