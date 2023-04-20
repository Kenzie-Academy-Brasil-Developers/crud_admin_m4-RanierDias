import { z } from "zod";

export const userReqCreateSchema = z.object({
  name: z.string().max(20),
  password: z.string().max(120),
  email: z.string().email(),
  admin: z.boolean().optional(),
});

export const userReqLoginSchema = z.object({
  email: z.string().email(),
  password: z.string().max(120),
});

export const userReqUpdateSchema = userReqCreateSchema
  .omit({ admin: true })
  .partial();

export const userDataPublicSchema = z.object({
  id: z.number(),
  name: z.string().max(20),
  email: z.string().email(),
  admin: z.boolean(),
  active: z.boolean(),
});
