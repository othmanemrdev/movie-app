import React from 'react';
import { StyleSheet, View, Text, TextInput } from 'react-native';

export default function HomeScreen() {
  return (
    <View style={styles.container}>
      <TextInput
    placeholder="Rechercher..."
    style={styles.searchBar}
  />
      <Text style={styles.text}>page d'accueil</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  searchBar: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginTop: 10,
    marginBottom: 10,
    paddingLeft: 10,
    paddingRight: 10,
    width: '90%',
  },
});

