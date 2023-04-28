import React from 'react';
import { StyleSheet, View, Image } from 'react-native';
import ProgressBar from 'react-native-progress/Bar';

export default function SplashScreen() {
  return (
    <View style={styles.container}>
      <Image
        source={require('../assets/logo.png')}
        style={styles.logo}
      />
      <ProgressBar indeterminate width={200} color="#fff" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#2d3436',
  },
  logo: {
    width: 150,
    height: 150,
    marginBottom: 50,
  },
});
