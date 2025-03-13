import { useAuth } from '@clerk/clerk-expo';
import { Redirect } from 'expo-router';
import { TouchableOpacity ,Text, View} from 'react-native';


export default function Index() {
    const {signOut} = useAuth()
    return (
      <View >
        <TouchableOpacity onPress={() => signOut()}>
          <Text> Sign Out</Text>
        </TouchableOpacity>
      </View>
    );
}

