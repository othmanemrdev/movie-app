// ToggleSwitch.js
import React, { useState, useEffect } from 'react';
import { View, Text, Switch, StyleSheet } from 'react-native';
import { Audio } from 'expo-av';

const ToggleSwitch = () => {
  const [isMusicOn, setIsMusicOn] = useState(false);
  const [backgroundMusic, setBackgroundMusic] = useState(new Audio.Sound());

  const toggleMusic = async () => {
    setIsMusicOn(!isMusicOn);

    if (!isMusicOn) {
      await playBackgroundMusic();
    } else {
      await stopBackgroundMusic();
    }
  };

  const playBackgroundMusic = async () => {
    try {
      if (!backgroundMusic._loaded) {
        await backgroundMusic.loadAsync(require("../assets/music.mp3"));
        await backgroundMusic.setIsLoopingAsync(true);
      }
      await backgroundMusic.playAsync();
    } catch (error) {
      console.error('Erreur lors de la lecture de la musique : ', error);
    }
  };

  const stopBackgroundMusic = async () => {
    try {
      await backgroundMusic.stopAsync();
      await backgroundMusic.unloadAsync(); // Libérer les ressources audio
    } catch (error) {
      console.error('Erreur lors de larrêt de la musique : ', error);
    }
  };

  useEffect(() => {
    // Création initiale de la musique d'arrière-plan
    playBackgroundMusic();

    return () => {
      // Nettoyer les ressources audio lorsque le composant est démonté
      stopBackgroundMusic();
    };
  }, []); // Dépendance vide pour s'assurer que useEffect ne s'exécute qu'une fois

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Music</Text>
      <Switch
        value={isMusicOn}
        onValueChange={toggleMusic}
        thumbColor={isMusicOn ? '#4DFF00' : 'red'}
        trackColor={{ false: '#FF4D4D', true: '#4DFF00' }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  label: {
    marginRight: 10,
    fontSize: 16,
  },
});

export default ToggleSwitch;
