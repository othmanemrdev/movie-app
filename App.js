import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Text } from 'react-native';
import SplashScreen from './src/SplashScreen';
import HomeScreen from './src/HomeScreen';
import MovieDetailsScreen from './src/MovieDetailsScreen';
import FavoritesScreen from './src/FavoritesScreen';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

function HomeStack() {
  return (
    <Stack.Navigator
    options={{ headerShown: false }}
    >
      <Stack.Screen name="Home1" component={HomeScreen} options={{ headerShown: false }}/>
      <Stack.Screen name="MovieDetailsScreen" component={MovieDetailsScreen} options={{
            headerTransparent: true,
            headerTitle: '',
            headerTintColor: '#fff'
          }}/>
    </Stack.Navigator>
  );
}

export default function App() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 5000);
  }, []);

  if (loading) {
    return <SplashScreen />;
  }

  return (
    <NavigationContainer>
      <Tab.Navigator
        screenOptions={({ route }) => ({
          tabBarIcon: ({ focused, color, size }) => {
            let iconName;

            if (route.name === 'Home') {
              iconName = focused ? 'home' : 'home-outline';
            } else if (route.name === 'Favorites') {
              iconName = focused ? 'heart' : 'heart-outline';
            }

            return <Ionicons name={iconName} size={size} color={color} />;
          },
          tabBarActiveTintColor: '#309975',
          tabBarInactiveTintColor: '#454d66',
          tabBarStyle: [{ display: 'flex' }, null],
        })}
      >
        <Tab.Screen name="Home" component={HomeStack} options={{ headerShown: false }}/>
        <Tab.Screen name="Favorites" component={FavoritesScreen}  options={{ headerShown: false }}/>
      </Tab.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
