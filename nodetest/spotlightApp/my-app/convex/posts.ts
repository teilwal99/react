import { mutation, query } from "./_generated/server";
import { v } from "convex/values";
import { getCurrentUser } from "./users"; // Import the helper function

export const generateUploadUrl = mutation( async (ctx) => {
    const identity = await getCurrentUser(ctx);
    if(!identity){
        throw new Error("Unauthorized")
    }
    return await ctx.storage.generateUploadUrl();
    
});

export const createPost = mutation({
    args: {
        //userId: v.id("users"),
        //imageUrl: v.string(),
        storageId: v.id("_storage"),
        caption: v.optional(v.string()),
        //likes: v.number(),
        //comments: v.number(),
    },
    handler: async (ctx, args) => {
        const currentUser = await getCurrentUser(ctx);
        
        const imageUrl = await ctx.storage.getUrl(args.storageId);
        if(!imageUrl){
            throw new Error("Image not found");
        }

        const postId = await ctx.db.insert("posts", {
            userId: currentUser._id,
            imageUrl,
            storageId: args.storageId,
            caption: args.caption,
            likes: 0,
            comments: 0,
        });
        // increase count posts by 1

        await ctx.db.patch(currentUser._id, {posts: currentUser.posts + 1});

        return postId;
    },
});

export const getFeedPost = query({
    handler: async (ctx) => {
        const currentUser = await getCurrentUser(ctx);

        if(!currentUser) throw new Error("User not login");

        const posts = await ctx.db.query("posts").order("desc").collect();

        if(posts.length === 0)return [];

        const postsWithInfo = await Promise.all(
            posts.map(async(post) => {
                const postsAuthor = await ctx.db.get(post.userId)

                const like = await ctx.db.query("likes")
                    .withIndex("by_user_and_post", 
                        (q) => q.eq("userId",currentUser._id)
                            .eq("postId",post._id)
                ).first();
                    
                const bookmark = await ctx.db.query("bookmarks")
                    .withIndex("by_both", 
                        (q) => q.eq("userId",currentUser._id)
                            .eq("postId",post._id)
                ).first();

                return {
                    ...posts,
                    author:{
                        _id:postsAuthor?.username,
                        image:postsAuthor?.image
                    },
                    isLiked: !!like,
                    isBookmark: !!bookmark
                }
            })
        )

        return posts;
    }
});