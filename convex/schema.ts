import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

export default defineSchema({
    users:defineTable({
        name:v.string(),
        email:v.optional(v.string()),
        img:v.string(),
        uid:v.string(),
        isGuest:v.boolean(),
        createdAt: v.optional(v.number())
    }).index('email', ['email']),
    workBench:defineTable({
        message:v.any(),
        fileData:v.optional(v.any()),
        user:v.id('users')
    })
})