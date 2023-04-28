import React from 'react';
import { StyleSheet, View, Text } from 'react-native';
import { SearchBar } from '@rneui/themed';

export default function HomeScreen() {
  return (
    <View style={styles.container}>
      <SearchBar
        placeholder="Rechercher"
        containerStyle={styles.searchBarContainer}
        inputContainerStyle={styles.searchBarInputContainer}
      />
      <View style={styles.contentContainer}>
        <Text style={styles.text}>Welcome to InfoFlix</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  searchBarContainer: {
    backgroundColor: 'transparent',
    borderTopWidth: 0,
    borderBottomWidth: 0,
    paddingHorizontal: 10,
    marginTop: 30,
  },
  searchBarInputContainer: {
    backgroundColor: '#EDEDED',
  },
  contentContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'red',
  },
});
