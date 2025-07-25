import { useFonts } from 'expo-font';
import { Stack } from 'expo-router';
import 'react-native-reanimated';

import { useColorScheme } from '@/hooks/useColorScheme';

export default function RootLayout() {
    const colorScheme = useColorScheme();
    const [loaded] = useFonts({
        // SpaceMono: require('../assets/fonts/SpaceMono-Regular.ttf'),
        PoppinsLight: require('../assets/fonts/Poppins-Light.ttf'),
        PoppinsRegular: require('../assets/fonts/Poppins-Regular.ttf'),
        PoppinsMedium: require('../assets/fonts/Poppins-Medium.ttf'),
        PoppinsBold: require('../assets/fonts/Poppins-Bold.ttf'),
    });

    if (!loaded) {
        // Async font loading only occurs in development.
        return null;
    }

    // return (
    //     <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
    //         <Stack>
    //             <Stack.Screen name="(tabs)" 
    //                 options={{ headerShown: false }} />
    //             <Stack.Screen name="+not-found" />
    //         </Stack>
    //         <StatusBar style="dark" />
    //     </ThemeProvider>
    // );
    return(
      <Stack >
          <Stack.Screen name="(tabs)"
            options={{ headerShown: false }} />
          <Stack.Screen name="+not-found" />
      </Stack>

    )
}
