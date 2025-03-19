import { useAuth } from '@clerk/clerk-expo';
import { Link, Stack } from 'expo-router';
import { StyleSheet, Image, Pressable, TouchableOpacity, Text, View } from 'react-native';
import styles from "@/styles/feed.styles"; 
import { Ionicons } from '@expo/vector-icons';
import { ScrollView } from "react-native";
import { STORIES } from '@/constraints/mock-data';
import Story, { StoryType } from '../components/story';
import { useQuery } from 'convex/react';
import { api } from '@/convex/_generated/api';
import Loader from '../components/loader';
import Post from '../components/post';
import { Id } from '@/convex/_generated/dataModel';

export default function Index() {
  const { signOut } = useAuth();

  const posts = useQuery(api.posts.getFeedPost);
  
  if (posts === undefined)  return <Loader />;
  if (posts.length === 0) return <NoPostsFound />;

  return (
    <View style={styles.container}>
      <View  style={styles.header}>
        <Text style={styles.text}> spotlight </Text>
        <TouchableOpacity onPress={() => signOut()}>  
          <Ionicons size={24} name="log-out-outline" color={"green"} />  
        </TouchableOpacity>

      </View>
      <ScrollView showsVerticalScrollIndicator={false} style={{ flexGrow: 1 ,flexDirection: "column"}}>
        <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.storiesContainer}>
          {STORIES.map((story : StoryType) => ( 
            <Story key={story.id} story={story} />
          ))}

        </ScrollView>
        {/*POST*/}
        {posts.map((post) => (
          <Post key={post._id} post={post} />
        ))}

      </ScrollView>
    </View>
  );
}


const NoPostsFound = () => {
  return <View style={{
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor:"black"
  }}>
    <Text style={{color:"white"}}>No posts found</Text>
  </View>
};

