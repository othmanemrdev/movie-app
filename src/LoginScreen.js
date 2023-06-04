import React, { useState, useEffect } from 'react';
import { StyleSheet, View, TextInput, Button, Text, TouchableOpacity } from 'react-native';
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';


const EyeIcon = ({ onPress, showPassword }) => {
  return (
    <TouchableOpacity onPress={onPress} style={styles.eyeIconContainer}>
      <Text>{showPassword ? '👁️' : '👁️‍🗨️'}</Text>
    </TouchableOpacity>
  );
};
 

const LoginScreen = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    setErrorMessage('');
  }, []);

  const handleLogin = () => {
    if (email === '' || password === '') {
      setErrorMessage('Please fill in all fields.');
    } else {
      const auth = getAuth();
      signInWithEmailAndPassword(auth, email, password)
        .then(() => {
          console.log('Login successful');
          setErrorMessage('');
          navigation.navigate('Profile');
        })
        .catch((error) => {
          setErrorMessage(error.message);
        });
    }
  };
  
  const handleRegisterLink = () => {
    setErrorMessage('');
    navigation.navigate('Register');
  };
  

  const toggleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
      />
      <View style={styles.passwordContainer}>
        <TextInput
          style={styles.passwordInput}
          placeholder="Password"
          secureTextEntry={!showPassword}
          value={password}
          onChangeText={setPassword}
        />
        <EyeIcon onPress={toggleShowPassword} showPassword={showPassword} />
      </View>
      {errorMessage !== '' && <Text style={styles.error}>{errorMessage}</Text>}
      <Button title="Login" onPress={handleLogin} />
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
  passwordContainer: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  passwordInput: {
    width: '100%',
    flex: 1,
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    paddingHorizontal: 10,
    borderTopLeftRadius: 20,
    borderBottomLeftRadius: 20,
  },
  eyeIconContainer: {
    backgroundColor: '#eaeaea',
    height: 40,
    justifyContent: 'center',
    paddingHorizontal: 10,
    borderTopRightRadius: 20,
    borderBottomRightRadius: 20,
  },
  error: {
    color: 'red',
    marginBottom: 10,
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
