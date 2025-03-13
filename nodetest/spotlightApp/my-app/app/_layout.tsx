import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import InitialLayout from './components/initialLayout';
import ClerkAndConvexProvider from '@/providers/ClerkAndConvexProvider';

export default function RootLayout() {
  console.log("Clerk Provider is rendering...");

  return (
    
      <ClerkAndConvexProvider>
      
        <SafeAreaProvider>
          <SafeAreaView style={{ flex: 1, backgroundColor: "black" }}>
            <InitialLayout  />
          </SafeAreaView>
        </SafeAreaProvider>
      </ClerkAndConvexProvider>
    
  );
}

