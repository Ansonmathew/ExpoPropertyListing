import { Tabs } from 'expo-router';
import React from 'react';
import { Platform, TouchableOpacity } from 'react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';

import { IconSymbol } from '@/components/ui/IconSymbol';
import TabBarBackground from '@/components/ui/TabBarBackground';
import { Colors } from '@/constants/Colors';
import { useColorScheme } from '@/hooks/useColorScheme';

// Custom tab button component without ripple effect
const TabButton = (props) => {
    return (
        <TouchableOpacity activeOpacity={0.7}
            style={[props.style, { flex: 1 }]}
            {...props} />
    );
};

export default function TabLayout() {
    const colorScheme = useColorScheme();
    return (
        <GestureHandlerRootView style={{ flex: 1 }}>
            <Tabs
                screenOptions={{
                    tabBarActiveTintColor: Colors[colorScheme ?? 'light'].tint,
                    headerShown: false,
                    tabBarButton: TabButton, // This removes the ripple effect
                    tabBarBackground: TabBarBackground,
                    tabBarLabelStyle: {
                        fontSize: 12, // Adjust font size
                        fontFamily: 'PoppinsMedium', // Change font family
                    },
                    tabBarStyle: Platform.select({
                    ios: {
                        // Use a transparent background on iOS to show the blur effect
                        position: 'absolute',
                    },
                    
                    default: {
                        
                    },
                    }),
                }}>
                <Tabs.Screen name="home"
                    options={{
                        title: 'Home',
                        tabBarIcon: ({ color }) => <IconSymbol size={28} name="house.fill" color={color} />,
                    }}/>
                <Tabs.Screen name="booking"
                    options={{
                        title: 'My Booking',
                        tabBarIcon: ({ color }) => <IconSymbol size={28} name="bookmark.fill" color={color} />,
                    }}/>
                <Tabs.Screen name="profile"
                    options={{
                        title: 'Profile',
                        tabBarIcon: ({ color }) => <IconSymbol size={28} name="person.fill" color={color} />,
                    }}/>
            </Tabs>
        </GestureHandlerRootView>
    );
}