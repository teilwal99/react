import { useAuth } from '@clerk/clerk-expo';
import { Link, Stack } from 'expo-router';
import { StyleSheet, Image, Pressable, TouchableOpacity, Text, View } from 'react-native';
import styles from "@/styles/feed.styles"; 
import { Ionicons } from '@expo/vector-icons';

export default function Index() {
  const {signOut} = useAuth();
  return (
    <View style={styles.container}>
      <View  style={styles.header}>
        <Text style={styles.text}> spotlight </Text>
        <TouchableOpacity onPress={() => signOut} >
          <Ionicons size={24} name="log-out-outline" color={"white"}> </Ionicons>
        </TouchableOpacity>
        
      </View>
      
    </View>
  );
}
