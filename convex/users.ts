import { v } from "convex/values";
import { mutation } from "./_generated/server";

export const createUser = mutation({
  args: {
    name: v.string(),
    email: v.string(),
    img: v.string(),
    uid: v.string(),
    createdAt: v.optional(v.number()),
  },
  handler: async (ctx, args) => {
    const user = await ctx.db
      .query("users")
      .filter((q) => q.eq(q.field("email"), args.email))
      .collect();
    console.log(user);

    if (user?.length === 0) {
      const result = await ctx.db.insert("users", {
        name: args.name,
        img: args.img,
        email: args.email,
        isGuest: false,
        createdAt: args.createdAt,
        uid: args.uid,
      });
      console.log(result);
      return result;
    }
    else{
      const resId = user[0]._id
      return resId;
    }
    
  },
});

export const createGuest = mutation({
  args: {
    name: v.string(),
    img: v.string(),
    uid: v.string(),
    createdAt: v.optional(v.number()),
  },
  handler: async (ctx, args) => {
    const user = await ctx.db
      .query("users")
      .filter((q) => q.eq(q.field("uid"), args.uid))
      .collect();
    console.log(user);

    if (user?.length === 0) {
      const result = await ctx.db.insert("users", {
        name: args.name,
        img: args.img,
        isGuest: true,
        createdAt: args.createdAt,
        uid: args.uid,
      });
      console.log(result);
      return result;
    }
  },
});

export const getGuest = mutation({
  args: {
    uid: v.string(),
  },
  handler: async (ctx, args) => {
    try {
      const user = await ctx.db
        .query("users")
        .filter((q) => q.eq(q.field("uid"), args.uid))
        .take(1);
      console.log(user);

      return user?.length > 0 ? user[0] : null
    } catch (err) {
      console.log(err);
      return "Database Error";
    }
  },
});

export const getUser = mutation({
  args: {
    email: v.string(),
  },
  handler: async (ctx, args) => {
    try {
      const user = await ctx.db
        .query("users")
        .filter((q) => q.eq(q.field("email"), args.email))
        .take(1);
      console.log(user);

      return user?.length > 0 ? user[0] : null
    } catch (err) {
      console.log(err);
      return "Database Error";
    }
  },
});
