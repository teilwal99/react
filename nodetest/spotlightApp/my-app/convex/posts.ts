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
                const postsAuthor =  (await ctx.db.get(post.userId))!;

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
                    ...post,
                    author:{
                        _id:postsAuthor?.username,
                        image:postsAuthor?.image
                    },
                    isLiked: !!like,
                    isBookmark: !!bookmark
                }
            })
        )

        return postsWithInfo;
    }
});

export const likePost = mutation({
    args: {
        postId: v.id("posts"),
    },
    handler: async (ctx, args) => {
        const currentUser = await getCurrentUser(ctx);

        const like = await ctx.db.query("likes")
            .withIndex("by_user_and_post", 
                (q) => q.eq("userId",currentUser._id)
                    .eq("postId",args.postId)
        ).first();

        const post = await ctx.db.get(args.postId);
        if(!post){
            throw new Error("Post not found");  
        }

        if(like){
            await ctx.db.delete(like._id);
            await ctx.db.patch(args.postId, {likes: post.likes - 1});
            return false;
        }else{
            await ctx.db.insert("likes",{
                userId: currentUser._id,
                postId: args.postId
            });
            await ctx.db.patch(args.postId, {likes: post.likes + 1});
            
            if(currentUser._id !== post.userId){
                // send notification
                await ctx.db.insert("notifications",{
                    receiverId: post.userId,
                    type: "like",
                    senderId: currentUser._id,
                    postId: args.postId
                });
            }
            return true;
        }
    }
});