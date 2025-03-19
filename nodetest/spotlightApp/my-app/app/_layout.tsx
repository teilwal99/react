import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import InitialLayout from './components/initialLayout';
import ClerkAndConvexProvider from '@/providers/ClerkAndConvexProvider';
import {useFonts} from "expo-font";
import { SplashScreen } from 'expo-router';
import { useCallback } from 'react';

SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const [fontsLoaded] = useFonts({"JetBrainMono-Medium": require("../assets/fonts/JetBrainsMono-Medium.ttf")})
  
  const onRootLayoutView = useCallback(async() => {
    if(fontsLoaded) await SplashScreen.hideAsync();
  }, [fontsLoaded]);
  
  return (
    
      <ClerkAndConvexProvider>
      
        <SafeAreaProvider>
          <SafeAreaView style={{ flex: 1, backgroundColor: "black" }} onLayout={onRootLayoutView}>
            <InitialLayout  />
          </SafeAreaView>
        </SafeAreaProvider>
      </ClerkAndConvexProvider>
    
  );
}

