import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Text, Image, ScrollView } from 'react-native';
import axios from 'axios';

export default function MovieDetailsScreen({ route, navigation }) {
  const [movie, setMovie] = useState(null);

  useEffect(() => {
    axios.get(`https://api.themoviedb.org/3/movie/${route.params.film.id}`, {
      params: {
        api_key: '8d13dd9bdf3d2f1406950d178300ecbc',
        language: 'us-US',
      },
    })
      .then(response => setMovie(response.data))
      .catch(error => console.error(error));
  }, []);

  if (!movie) {
    return null;
  }

  return (
    <ScrollView style={styles.container}>
      <Image source={{ uri: `https://image.tmdb.org/t/p/w500/${movie.poster_path}` }} style={styles.movieImage} />
      <View style={styles.detailsContainer}>
        <Text style={styles.title}>{movie.title}</Text>
        <Text style={styles.rating}>{movie.vote_average} / 10</Text>
        <Text style={styles.label}>Overview:</Text>
        <Text style={styles.overview}>{movie.overview}</Text>
        <Text style={styles.label}>Release date:</Text>
        <Text style={styles.releaseDate}>{movie.release_date}</Text>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#141414',
  },
  movieImage: {
    width: '100%',
    height: 300,
    resizeMode: 'cover',
  },
  detailsContainer: {
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#FFF',
  },
  rating: {
    fontSize: 18,
    color: '#0ED912',
    marginBottom: 20,
  },
  label: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#FFF',
    marginTop: 10,
    marginBottom: 5,
  },
  overview: {
    fontSize: 16,
    color: '#FFF',
    marginBottom: 10,
  },
  releaseDate: {
    fontSize: 16,
    color: '#FFF',
    marginBottom: 20,
  },
});
