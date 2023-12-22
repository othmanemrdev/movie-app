// SettingScreen.js
import React from 'react';
import { View, StyleSheet } from 'react-native';
import ToggleSwitch from './ToggleSwitch';

const SettingScreen = () => {
  return (
    <View style={styles.container}>
      <ToggleSwitch />
      {/* Ajoutez d'autres éléments de votre écran de paramètres ici */}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    padding: 20,
  },
});

export default SettingScreen;
