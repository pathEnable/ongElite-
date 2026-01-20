import { pgTable, serial, text, integer, timestamp, boolean, decimal, jsonb } from 'drizzle-orm/pg-core';

export const projects = pgTable('projects', {
    id: serial('id').primaryKey(),
    title: text('title').notNull(),
    slug: text('slug').notNull().unique(),
    description: text('description').notNull(),
    imageUrl: text('image_url'),
    images: jsonb('images').default([]), // For the gallery
    category: text('category', { enum: ['education', 'sante', 'environnement', 'social', 'urgence'] }).notNull().default('social'),
    goalAmount: decimal('goal_amount', { precision: 10, scale: 2 }).notNull(),
    currentAmount: decimal('current_amount', { precision: 10, scale: 2 }).default('0'),
    status: text('status', { enum: ['active', 'completed'] }).default('active'),
    createdAt: timestamp('created_at').defaultNow(),
});

export const donations = pgTable('donations', {
    id: serial('id').primaryKey(),
    amount: decimal('amount', { precision: 10, scale: 2 }).notNull(),
    donorName: text('donor_name').notNull(),
    donorEmail: text('donor_email').notNull(),
    projectId: integer('project_id').references(() => projects.id),
    status: text('status', { enum: ['pending', 'paid'] }).default('pending'),
    createdAt: timestamp('created_at').defaultNow(),
});

export const volunteers = pgTable('volunteers', {
    id: serial('id').primaryKey(),
    name: text('name').notNull(),
    email: text('email').notNull(),
    phone: text('phone'),
    skills: text('skills'),
    message: text('message'),
    createdAt: timestamp('created_at').defaultNow(),
});

export const contactMessages = pgTable('contact_messages', {
    id: serial('id').primaryKey(),
    name: text('name').notNull(),
    email: text('email').notNull(),
    subject: text('subject'),
    message: text('message').notNull(),
    createdAt: timestamp('created_at').defaultNow(),
});

export const newsletterSubscriptions = pgTable('newsletter_subscriptions', {
    id: serial('id').primaryKey(),
    email: text('email').notNull().unique(),
    createdAt: timestamp('created_at').defaultNow(),
});
