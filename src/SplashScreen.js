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
      <ProgressBar indeterminate width={200} color="#2f2f2f" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#f2f2f2',
  },
  logo: {
    width: 350,
    height: 350,
    marginBottom: 50,
  },
});
