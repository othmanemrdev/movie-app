import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Text } from 'react-native';
import SplashScreen from './src/SplashScreen';
import HomeScreen from './src/HomeScreen';
import MovieDetailsScreen from './src/MovieDetailsScreen';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

const Stack = createStackNavigator();

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
      <Stack.Navigator>
        <Stack.Screen name="Home">
          {(props) => <HomeScreen {...props} />}
        </Stack.Screen>
        <Stack.Screen name="MovieDetailsScreen" component={MovieDetailsScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
