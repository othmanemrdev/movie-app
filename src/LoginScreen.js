import React, { useState } from 'react';
import { StyleSheet, View, TextInput, Button, Text, TouchableOpacity } from 'react-native';

const LoginScreen = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = () => {
    // Ajoutez ici votre logique de connexion
    console.log('Email:', email);
    console.log('Password:', password);
  };

  const handleRegisterLink = () => {
    navigation.navigate('Register');
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
      />
      <TextInput
        style={styles.input}
        placeholder="Password"
        secureTextEntry={true}
        value={password}
        onChangeText={setPassword}
      />
      <Button title="Login" onPress={handleLogin}/>
      <View style={styles.registerLinkContainer}>
        <Text style={styles.registerLinkText}>You don't have an account?</Text>
        <TouchableOpacity onPress={handleRegisterLink}>
          <Text style={styles.registerLink}>Register</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  input: {
    width: '100%',
    height: 40,
    marginBottom: 20,
    borderColor: 'gray',
    borderWidth: 1,
    paddingHorizontal: 10,
    borderRadius: 20,
  },
  registerLinkContainer: {
    flexDirection: 'row',
    marginTop: 10,
  },
  registerLinkText: {
    marginRight: 5,
    marginTop: 20,
  },
  registerLink: {
    color: 'blue',
    marginTop: 20,
  },
});

export default LoginScreen;
