import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

export default defineSchema({
    users: defineTable({
        username: v.string(),
        fullname: v.string(),
        email: v.string(),
        bio: v.optional(v.string()),
        image: v.string(),
        followers: v.string(),
        following: v.string(),
        posts: v.string(),
        clerkId: v.string(),

    }).index("by_clerk_id",["clerkId"]), 

    posts: defineTable({
        userId: v.id("users"),
        imageUrl: v.string(),
        storageId: v.id("_storage"),
        caption: v.optional(v.string()),
        likes: v.number(),
        comments: v.number(),

    }).index("by_user",["userId"]), 

    comments: defineTable({
        userId: v.id("users"),
        postId: v.id("posts"),
        content: v.string(),

    }).index("by_post",["postId"]), 

    likes: defineTable({
        userId: v.id("users"),
        postId: v.id("posts"),

    }).index("by_post",["postId"]).index("by_user_and_post",["userId","postId"]),

    follows: defineTable({
        flowerId: v.id("users"),
        flowingId: v.id("users"),

    })
    .index("by_follower",["flowerId"])
    .index("by_following",["flowingId"])
    .index("by_both",["flowerId","flowingId"]),

    notifications: defineTable({
        receiverId: v.id("users"),
        senderId: v.id("users"),
        type: v.union(v.literal("like"),v.literal("comment"),v.literal("follow")),
        postId: v.optional(v.id("posts")),
        commentId: v.optional(v.id("comments")),

    }).index("by_receiver",["receiverId"]),
    
    bookmarks: defineTable({
        userId: v.id("users"),
        postId: v.id("posts"),

    })
    .index("by_user",["userId"])
    .index("by_post",["postId"])
    .index("by_both",["userId","postId"]),
})