import {  Pressable, Text, TouchableOpacity, View } from "react-native";
import { Image, } from "expo-image";
import styles  from "@/styles/feed.styles";
import { Link } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import FastImage from "react-native-fast-image";
import React, { useState, useEffect } from "react";
import * as FileSystem from "expo-file-system";
import { Id } from "@/convex/_generated/dataModel";
import { api } from "@/convex/_generated/api";
import { useMutation } from "convex/react";

type ProsPosts = {
  post: {
    _id: Id<"posts">;
    imageUrl: string;
    caption?: string;
    likes: number;
    comments: number;
    _creationTime: number; // ✅ Matches actual data
    isLiked: boolean;
    isBookmark: boolean; // ✅ Matches actual data
    author: {
      _id: string; // ✅ Matches actual data
      image: string;
      username?: string; // ✅ Optional if missing
    };
  };
};


export default function Post ({post}: ProsPosts) {
  console.log("Post Image URL:", post.imageUrl, typeof post.imageUrl);
  const [isLike,setIsLiked] = useState(post.isLiked);
  const [likesCount,setLikesCount] = useState(post.likes);
  const likePost = useMutation(api.posts.likePost);
  
  const handleLike = async () => {
    try {
      const newLike = await likePost({postId:post._id});
      setIsLiked(newLike);
      setLikesCount(newLike?likesCount+1:likesCount-1);
    } catch (error) {
      console.log("Error in liking post", error);
    }
  };
  return (
  <View style={styles.post}> 
    <View style={styles.postHeader}>
      <Link href={"/(tabs)/notifications"}>
      <TouchableOpacity style={styles.postHeaderLeft}>
        <Image 
          source={{ uri: post.author?.image }} 
          style={styles.postAvatar} 
          contentFit="cover" 
          transition={200} 
          cachePolicy="memory-disk"
        />
        <Text style={styles.postUsername}>{post.author?._id}</Text>
      </TouchableOpacity>
      </Link>

      {/*
      <TouchableOpacity>
        <Ionicons name="ellipsis-horizontal" size={20} color="white" />
      </TouchableOpacity>
      */}
      <TouchableOpacity >
        <Ionicons name="trash-outline" size={20} color="white"  />
      </TouchableOpacity>
    </View>
    
    <Image 
      source={{ uri: post.imageUrl }} 
      style={styles.postImage} 
      contentFit="cover"
      transition={200}
      cachePolicy="memory-disk"
    />

    {/*Posts action*/}
    <View style={styles.postActions}> 
      <View style={styles.postActionsLeft}>
        <TouchableOpacity onPress={handleLike}>
          <Ionicons name={isLike?"heart":"heart-outline"} size={24} color={isLike?"green":"white"}  />
        </TouchableOpacity> 
        <TouchableOpacity >
          <Ionicons name="chatbubble-outline" size={22} color="white"  />
        </TouchableOpacity> 
        <TouchableOpacity >
          <Ionicons name="bookmark-outline" size={22} color="white"  />
        </TouchableOpacity> 
      </View>
      
    </View>   

    {/*Posts info*/}
    <View style={styles.postInfo}> 
      <Text style={styles.likesText}>
        {likesCount>0?`${likesCount.toLocaleString()} likes`:`Be the first to like`}
      </Text>
      {post.caption && (
        <View style={styles.captionContainer}>
          <Text style={styles.captionUsername}>{post.author.username}</Text>
          <Text style={styles.captionText}>{post.caption}</Text>
        </View>
      )}

        <TouchableOpacity >
          <Text style={styles.commentText}>View {post.comments?post.comments:0} comments</Text>
        </TouchableOpacity> 
        <Text style={styles.timeAgo}> 2 hours ago </Text>
    </View>   
  </View>);
}
