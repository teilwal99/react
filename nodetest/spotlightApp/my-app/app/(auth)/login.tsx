import { useSSO } from "@clerk/clerk-expo";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { Image, Pressable, Text, TouchableOpacity, View } from "react-native";
import { StyleSheet , Dimensions} from "react-native";
import { useAuth } from "@clerk/clerk-expo";

export default function Login(){
    const {startSSOFlow} = useSSO();
    const router = useRouter();
    const { isSignedIn } = useAuth();

    const handleGoogleSignIn = async () => {
        
        try {
          const { createdSessionId, setActive } = await startSSOFlow({
            strategy: "oauth_google",
          });
      
          console.log("Login Response:", { createdSessionId, setActive });
      
          if (setActive && createdSessionId) {
            await setActive({ session: createdSessionId });
      
            console.log("Session activated!");
            console.log("Current auth state:", { isSignedIn });
      
            // Add a slight delay to allow Clerk to update state
            setTimeout(() => {
              console.log("Redirecting to (tabs)...");
              router.replace("/(tabs)");
            }, 1000);
          } else {
            console.log("Session was not created.");
          }
        } catch (error) {
          console.error("OAuth error:", error);
        }
    };

  return (
  <View style={styles.container}>
    <View style={styles.brandSection}>
        <View style={styles.logoContainer}>
            <Ionicons name='leaf' size={32} color={"green"}></Ionicons>
        </View>    
        <Text style={styles.appName} > spotlight </Text>
        <Text style={styles.tagLine} > something </Text>
    </View>

    {/*illustration*/}
    <View style={styles.container}>
        <Image
            source={require("../../assets/images/Social interaction-bro.svg")}
            resizeMode="cover"
        >

        </Image>
    </View>

    {/*login*/}
    <View >
        <TouchableOpacity onPress={handleGoogleSignIn} activeOpacity={0.9} style={styles.loginGoogle}>
            <View style={styles.loginLogo}>
                <Ionicons name='logo-google' size={20} color={"green"}></Ionicons>
            </View>
            <Text style={styles.loginText} > Continue with google </Text>
        </TouchableOpacity>
        
        <Text style={styles.tagLine} > Agee with term & condition </Text>
    </View>

  </View>);
}
const {width, height} = Dimensions.get("window")
const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20
  },
  brandSection: {
    alignItems: "center",
    margin: height * 0.12,
  },
  logoContainer: {
    width:60,height:60,borderRadius:18,backgroundColor:"rgba(74,222,128,0.15)",justifyContent:"center",alignItems:"center",marginBottom:20
  },
  appName: {
    fontSize:42,
    textTransform:"uppercase",
  },
  tagLine: {
    fontSize:22,
    textAlign:"center",
    marginTop:10
  },
  loginGoogle: {
    display:"flex",
    alignItems:"center",
    justifyContent: "center",
    flexDirection: "row",
    flexWrap: "nowrap", 
    textTransform: "none",
    width: width * 0.4
  },
  loginText: {
    fontSize:22,
  },
  loginLogo: {
    width:22,
  },
});