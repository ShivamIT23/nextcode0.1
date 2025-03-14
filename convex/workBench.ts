import { v } from "convex/values";
import { mutation, query } from "./_generated/server";

export const createWorkBench = mutation({
    args:{
        message: v.any(),
        user:v.id('users')
    },
    handler: async(ctx, args) => {
        const result = await ctx.db.insert('workBench',{
            message:args.message,
            user:args.user
        })
        return result.length? result: null;
    },
})


export const getWorkBench = query({
    args:{
        workBenchId: v.id('workBench')
    },
    handler: async(ctx, args) => {
        const result = await ctx.db.get(args.workBenchId)
        return result || null;
    },
})

export const updateWorkBench = mutation({
    args:{
        workBenchId:v.id('workBench'),
        message:v.any()
    },
    async handler(ctx, args) {
        const res = await ctx.db.patch(args.workBenchId,{
            message:args.message
        });
        return res;
    },
})

export const updateCodeWorkBench = mutation({
    args:{
        workBenchId:v.id('workBench'),
        files:v.optional(v.any())
    },
    async handler(ctx, args) {
        const res = await ctx.db.patch(args.workBenchId,{
            fileData:args.files
        });
        return res;
    },
})


export const getHistory = query({
    args:{
        userId:v.id('users')
    },
    handler: async(ctx,args) => {
        const result = await ctx.db.query('workBench').filter(q=>q.eq(q.field('user'),args.userId)).collect();
        return result || null;
    }
})