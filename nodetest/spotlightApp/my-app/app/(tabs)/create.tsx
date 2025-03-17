import { ActivityIndicator, Dimensions, KeyboardAvoidingView, Platform, Pressable, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";
import { Link, useRouter } from "expo-router";
import { useUser } from "@clerk/clerk-expo";
import { useState } from "react";
import * as ImagePicker from "expo-image-picker";
import { Ionicons } from "@expo/vector-icons";
import { Colors } from "@/constants/Colors";
import { Image } from "expo-image";
import { useMutation } from "convex/react";
import { api } from "@/convex/_generated/api";
import * as FileSystem from "expo-file-system";
import { createPost } from "@/convex/posts";
import styles from "@/styles/auth.styles"; 

export default function Create(){
  const router = useRouter();
  const { user } = useUser();
  const [caption, setCaption] = useState("");
  const [ selectedImage, setSelectedImage ] = useState<  string | null >(null);
  const [isSharing, setIsSharing] = useState(false);
  const createPost = useMutation(api.posts.createPost);

  const pickImage = async () => {
    const {granted} = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if(granted){
      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes:"images",
        allowsEditing:true,
        aspect:[1,1],
        quality:0.8,
      });
      if(!result.canceled) {
        setSelectedImage(result.assets[0].uri);
      }
    }
  }

  const generateUploadUrl = useMutation(api.posts.generateUploadUrl);
  const createUrl = useMutation(api.posts.createPost);

  const handleShare = async () => {
    if (!selectedImage) return;
  
    try {
      setIsSharing(true);
  
      // Request an upload URL from Convex
      const uploadUrl = await generateUploadUrl();
  
      // Convert image to blob
      let blob;
      if (selectedImage.startsWith("data:image")) {
        // Handle Base64-encoded images
        const base64Data = selectedImage.split(",")[1]; // Remove metadata
        const byteCharacters = atob(base64Data);
        const byteNumbers = new Array(byteCharacters.length);
        for (let i = 0; i < byteCharacters.length; i++) {
          byteNumbers[i] = byteCharacters.charCodeAt(i);
        }
        const byteArray = new Uint8Array(byteNumbers);
        blob = new Blob([byteArray], { type: "image/jpeg" });
      } else {
        // Fetch the image and convert to Blob (for non-Base64)
        const response = await fetch(selectedImage);
        blob = await response.blob();
      }
  
      // Upload using Fetch API
      const formData = new FormData();
      formData.append("file", blob);
  
      const uploadResponse = await fetch(uploadUrl, {
        method: "POST",
        body: formData,
      });
  
      if (!uploadResponse.ok) {
        throw new Error("Image upload failed");
      }
  
      const { storageId } = await uploadResponse.json();
  
      // Store image reference in database
      
      try {
        const postId = await createPost({ storageId, caption });
        console.log("Post created with ID:", postId);
      } catch (error) {
          console.error("Error creating post:", error);
      }
      // Reset state
      setTimeout(() => {
        setIsSharing(false);
        setSelectedImage(null);
        setCaption("");
        router.replace("/");

      }, 2000);
    } catch (error) {
      console.log("Error sharing post:", error);
    }
  };
  
  console.log(selectedImage);
  console.log(Platform.OS);
  if(!selectedImage){
    return (
      <View style={styles.container}>
        <View  style={styles.header}>
          <TouchableOpacity onPress={() => {setIsSharing(false);router.back(); }} >
            <Ionicons size={28} name="arrow-back" color={Colors.light.tint}> </Ionicons>
          </TouchableOpacity>
          <Text style={styles.text}> New Post </Text>
          <View style={{width:28}}></View>
        </View>
        <TouchableOpacity onPress={pickImage} style={styles.imageContainer}>
            <Ionicons size={width} name="image-outline" color={Colors.dark.tint} > </Ionicons>
            <Text> Tap to select an image </Text>
        </TouchableOpacity>
      </View>);
  }
  return (
    <KeyboardAvoidingView 
      behavior={Platform.OS === "android" ? "padding":"height" }
      keyboardVerticalOffset={Platform.OS === "android" ?20:0}
    >
      <View style={styles.header}>
        <TouchableOpacity onPress={() => {
            setSelectedImage(null);
            setCaption("");
          }
         
        }>
          <Ionicons size={32} name="close-outline" color={isSharing?Colors.dark.tint:Colors.light.tint} > </Ionicons>
        </TouchableOpacity>
        <Text style={styles.header}> New Post </Text>
        <TouchableOpacity onPress={handleShare} disabled={isSharing || !selectedImage}>
          {isSharing ? (<ActivityIndicator size="small" color={Colors.light.tint}/>):
          (<Text style={{color:"green", fontSize:20}}> share </Text>)}
        </TouchableOpacity>
        
      </View>
      
      <ScrollView bounces={false} keyboardShouldPersistTaps="handled">
        <View style={styles.container}>
          <View style={styles.imageContainer}>
            <Image source={selectedImage} contentFit="cover" transition={200} style={styles.imageWrapper}>
              <Ionicons size={28} name="arrow-back" color={Colors.light.tint} > </Ionicons>
            </Image>
            <TouchableOpacity onPress={pickImage} disabled={isSharing} style={styles.changeImageButt}>
              <Ionicons size={28} name="image-outline" color={Colors.dark.tint} > </Ionicons>
              <Text style={{color:"white"}}> Change </Text>
          </TouchableOpacity>
          </View>
          
        </View>

        <TextInput placeholder="Write a caption..."
          value={caption} 
          onChangeText={setCaption}
          style={styles.textArea} multiline
          
        >
            
        </TextInput>
      </ScrollView>
    </KeyboardAvoidingView>);
}

const {width, height} = Dimensions.get("window")
