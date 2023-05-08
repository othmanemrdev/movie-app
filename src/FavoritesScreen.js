import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Ionicons } from '@expo/vector-icons';

const FavoritesScreen = ({ navigation }) => {
  const [favorites, setFavorites] = useState([]);

  useEffect(() => {
    const fetchFavorites = async () => {
      try {
        const storedFavorites = await AsyncStorage.getItem('favorites');
        if (storedFavorites !== null) {
          setFavorites(JSON.parse(storedFavorites));
        }
      } catch (error) {
        console.log(error);
      }
    };
    fetchFavorites();
  }, []);

  const removeFavorite = async (id) => {
    try {
      const storedFavorites = await AsyncStorage.getItem('favorites');
      if (storedFavorites !== null) {
        const favorites = JSON.parse(storedFavorites);
        const newFavorites = favorites.filter((f) => f.id !== id);
        await AsyncStorage.setItem('favorites', JSON.stringify(newFavorites));
        setFavorites(newFavorites);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const renderFavorite = ({ item }) => (
    <View style={styles.favoriteItem}>
      <TouchableOpacity style={styles.deleteButton} onPress={() => removeFavorite(item.id)}>
        <Ionicons name="trash" size={24} color="white" />
      </TouchableOpacity>
      <Text>{item.title}</Text>
    </View>
  );

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
        <Ionicons name="arrow-back" size={24} color="white" />
      </TouchableOpacity>
      <Text style={styles.title}>Favorites</Text>
      <FlatList
        data={favorites}
        keyExtractor={(item) => item.id.toString()}
        renderItem={renderFavorite}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginVertical: 10,
  },
  backButton: {
    position: 'absolute',
    left: 10,
    top: 10,
    zIndex: 1,
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 5,
    backgroundColor: '#555',
  },
  favoriteItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  deleteButton: {
    backgroundColor: 'red',
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 5,
    marginRight: 10,
  },
});

export default FavoritesScreen;
