import { Link, Stack } from 'expo-router';
import { StyleSheet, Image, Pressable, TouchableOpacity, Text, View } from 'react-native';


export default function Index() {
  return (
    <View style={styles.container} >
      <Link href={"/notifications"}> Tabs </Link>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  link: {
    marginTop: 15,
    paddingVertical: 15,
  },
});
