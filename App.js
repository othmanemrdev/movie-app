import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Text } from 'react-native';
import SplashScreen from './src/SplashScreen';
import HomeScreen from './src/HomeScreen';

export default function App() {
  const [loading, setLoading] = useState(true);

  
  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 2000);
  }, []);

  return (
    <View style={styles.container}>
      {loading ? <SplashScreen /> : <HomeScreen />}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
