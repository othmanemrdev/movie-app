import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Text, Image, ScrollView } from 'react-native';
import axios from 'axios';
import { Ionicons } from '@expo/vector-icons';

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


  function convertToHoursAndMinutes(minutes) {
    const hours = Math.floor(minutes / 60);
    const remainingMinutes = minutes % 60;
    return `${hours}h ${remainingMinutes}min`;
  }
  

  if (!movie) {
    return null;
  }

  return (
    <ScrollView style={styles.container}>
      <Image source={{ uri: `https://image.tmdb.org/t/p/w500/${movie.poster_path}` }} style={styles.movieImage} />
      <View style={styles.detailsContainer}>
        <Text style={styles.title}>{movie.title}</Text>
        <View style={styles.ratingContainer}>
          <Ionicons name='star' size={24} color='gold' style={styles.starIcon} /> 
          <Text style={styles.rating}>{movie.vote_average} / 10</Text>
        </View>
        <View style={styles.genreContainer}>
          {movie.genres.map((genre) => (
            <View key={genre.id} style={styles.genre}>
              <Text style={styles.genreText}>{genre.name}</Text>
            </View>
          ))}
        </View>
        <View style={styles.runtimeContainer}>
          <Text style={styles.mo}>Length : </Text>
          <Text style={styles.runtime}>{convertToHoursAndMinutes(movie.runtime)}</Text>
          <Text style={styles.mo2}>Language : </Text>
          <Text style={styles.originalLanguage}>{movie.original_language}</Text>
        </View>
        <Text style={styles.label}>Overview:</Text>
        <Text style={styles.overview}>{movie.overview}</Text>
        <Text style={styles.label}>Release date:</Text>
        <Text style={styles.a}>{movie.release_date}</Text>
        <View style={styles.tableContainer}>
          <View style={styles.row}>
            <Text style={styles.label}>Production Companies:</Text>
            <View style={styles.value}>
              {movie.production_companies.map((company) => (
                <Text key={company.id} style={styles.a}>{company.name}</Text>
              ))}
            </View>
          </View>
          <View style={styles.row}>
            <Text style={styles.label}>Production Country:</Text>
            <View style={styles.value}>
              <Text style={styles.a}>{movie.production_countries[0].name}</Text>
            </View>
          </View>
          <View style={styles.row}>
            <Text style={styles.label}>Revenue:</Text>
            <Text style={styles.a}>{new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(movie.revenue)}</Text>
          </View>
          <View style={styles.row}>
            <Text style={styles.label}>Languages:</Text>
            <View style={styles.value}>
              {movie.spoken_languages.map((lang) => (
                <Text key={lang.iso_639_1} style={styles.a}>{lang.english_name}</Text>
              ))}
            </View>
          </View>
          <View style={styles.row}>
            <Text style={styles.label}>Status:</Text>
            <Text style={styles.a}>{movie.status}</Text>
          </View>
        </View>
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
 ratingContainer: { 
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  starIcon: { 
    marginRight: 5,
  },
  rating: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#00ff1a',
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
    borderColor: 'red', 
    borderWidth: 2, 
    borderRadius: 10,
    paddingHorizontal: 10,
    paddingVertical: 10,
  },
  a: {
    fontSize: 16,
    color: '#31A561',
    marginBottom: 20,
  },
  genre: {
    backgroundColor: '#4EBEFF',
    borderRadius: 20,
    paddingHorizontal: 10,
    paddingVertical: 5,
    marginRight: 10,
  },
  genreContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 10,
  },runtimeContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 10,
  },
  runtime: {
    backgroundColor: '#58BEC9',
    color: '#FFFFFF',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 5,
    marginRight: 10,
  },
  originalLanguage: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    fontSize: 16,
    fontWeight: 'bold',
    color: '#FFFFFF', 
    backgroundColor: '#58BEC9',
    borderRadius: 5,
    marginRight: 10,
  },
  mo: {
    fontSize: 16,
    color: '#FFF',
    fontWeight: 'bold',
    marginLeft: 20,
  },
  mo2: {
    fontSize: 16,
    color: '#FFF',
    fontWeight: 'bold',
    marginLeft: 40,
  },
  studioTable: {
    marginTop: 20,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: '#ddd',
  },
  studioRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
  },
  studioName: {
    fontSize: 16,
  },
  productionCountryContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  countryFlag: {
    width: 30,
    height: 20,
    resizeMode: 'contain',
    marginRight: 10,
  },
  countryName: {
    fontSize: 16,
  },
  revenueContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  revenueLabel: {
    fontWeight: 'bold',
    marginRight: 10,
  },
  revenueValue: {
    fontSize: 16,
  },
  statusContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  statusLabel: {
    fontWeight: 'bold',
    marginRight: 10,
  },
  statusValue: {
    fontSize: 16,
  },
  languageContainer: {
    marginBottom: 10,
  },
  languageLabel: {
    fontWeight: 'bold',
    marginBottom: 5,
    fontSize: 18,
  },
  languageItem: {
    fontSize: 16,
    marginBottom: 5,
  },
    
});
