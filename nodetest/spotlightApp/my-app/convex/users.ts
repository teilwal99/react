import { mutation, query, QueryCtx, MutationCtx } from "./_generated/server";
import { v } from "convex/values";

export const createUser = mutation({
    args: {
        username: v.string(),
        fullname: v.string(),
        email: v.string(),
        bio: v.optional(v.string()),
        image: v.string(),
        clerkId: v.string(),
    },
    handler: async (ctx, args) => {
        console.log("Searching for user with email:", args.email);

        const existingUser = await ctx.db
            .query("users")
            .withIndex("by_email", (q) => q.eq("email", args.email))
            .first();

        
        if (existingUser) return;

        await ctx.db.insert("users", {
            username: args.username,
            fullname: args.fullname,
            email: args.email,
            bio: args.bio,
            image: args.image,
            clerkId: args.clerkId,
            followers: 0, 
            following: 0, 
            posts: 0, 
        });
    },
});

export async function getCurrentUser(ctx: QueryCtx) {
    const userIdentity = await ctx.auth.getUserIdentity();
    if (!userIdentity) {
        throw new Error("Unauthorized");
    }
    
    const user = await ctx.db
        .query("users")
        .withIndex("by_clerk_id", (q) => q.eq("clerkId", userIdentity.subject)) // ✅ Use Clerk ID
        .first();

    if (!user) {
        throw new Error("User not found in database.");
    }

    return user;
};

export const getUserByClerkId= query({
    args:{clerkId:v.string()},
    handler: async (ctx,args) => {
        const user = await ctx.db.query("users").withIndex("by_clerk_id",(q) => q.eq("clerkId", args.clerkId)).unique();

        return user;
    }
});
