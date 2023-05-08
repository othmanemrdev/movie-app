import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Text, ImageBackground, TouchableOpacity, FlatList, Image, StatusBar } from 'react-native';
import { SearchBar } from 'react-native-elements';

import axios from 'axios';
import { useNavigation } from '@react-navigation/native';

const image = require('../assets/image.jpg');

export default function HomeScreen() {
  const [movies, setMovies] = useState([]);
  const [search, setSearch] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const navigation = useNavigation();   
  const [isLoading, setIsLoading] = useState(false);
  

  useEffect(() => {
    const fetchData = async () => {
      const apiKey = '8d13dd9bdf3d2f1406950d178300ecbc';
      const language = 'us-US';
      const response = await axios.get(`https://api.themoviedb.org/3/movie/popular?page=${currentPage}&api_key=${apiKey}&language=${language}`);
      setTotalPages(response.data.total_pages);
      setMovies(movies => movies.concat(response.data.results));
    };
  
    fetchData();
  }, [currentPage]);
  
  const onSearch = (text) => {
    setSearch(text);
  };
  
  const filteredMovies = movies.filter(movie => movie.title.toLowerCase().includes(search.toLowerCase()));

  const renderItem = ({ item }) => (
    <TouchableOpacity onPress={() => navigation.navigate('MovieDetailsScreen', { film: item })}>  
      <View style={styles.movieContainer}>
        <Text style={styles.movieYear}>{new Date(item.release_date).getFullYear()}</Text>
        <Image
          source={{ uri: `https://image.tmdb.org/t/p/w500/${item.poster_path}` }}
          style={styles.movieImage}
        />
        <View style={styles.movieDetails}>
          <Text style={styles.movieTitle}>{item.title}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );

  const handleLoadMore = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  return (
    <View style={styles.container}>
      <StatusBar hidden />
      <ImageBackground source={image} style={styles.image}>
        <View style={styles.contentContainer}>
          <View style={styles.searchContainer}>
            <SearchBar
              placeholder="Rechercher"
              onChangeText={onSearch}
              value={search}
              inputStyle={{ backgroundColor: '#EDEDED' }}
              containerStyle={{ backgroundColor: 'transparent', borderTopWidth: 0, borderBottomWidth: 0 }}
            />
            <TouchableOpacity onPress={() => navigation.navigate('FavoritesScreen')}>
              <Text style={styles.favoritesButton}>Favoris</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.textContainer}>
            <Text style={styles.text}>Welcome to InfoFlix</Text>
            <FlatList
  data={filteredMovies}
  renderItem={renderItem}
  keyExtractor={item => item.id.toString()}
  onEndReached={handleLoadMore}
  onEndReachedThreshold={0.5}
  ListFooterComponent={isLoading ? <ActivityIndicator size="large" color="#0000ff" /> : null}
/>

          </View>
        </View>
      </ImageBackground>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  contentContainer: {
    flex: 1,
    justifyContent: 'flex-start',
  },
  searchContainer: {
    marginHorizontal: 10,
  },
  textContainer: {
    alignItems: 'center',
    marginTop: 5,
  },
  text: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'red',
    marginBottom: 50,
  },
  image: {
    flex: 1,
    resizeMode: "cover",
    justifyContent: "center"
  },
  movieContainer: {
    alignItems: 'center',
     },
  movieImage: {
    width: 200,
    height: 300,
    resizeMode: 'cover',
  },
  movieTitle: {
    fontSize: 18,
    marginVertical: 10,
    color: 'white',
  },
  movieDetails: {
    alignItems: 'center',
    marginVertical: 10,
  },
  movieYear: {
    fontSize: 16,
    color: '#666',
  },
  favoritesButton: {
    backgroundColor: 'red',
    padding: 10,
    borderRadius: 5,
    marginLeft: 10,
  },
  favoritesButtonText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 16,
  },
});
