import React, { useState } from 'react';
import { StyleSheet, View, TextInput, Button, Text, TouchableOpacity } from 'react-native';
import { initializeApp } from 'firebase/app';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import firebaseConfig from '../firebaseConfig.js';
import { getAuth} from 'firebase/auth';
import { getFirestore, doc, setDoc } from 'firebase/firestore';
import { useNavigation } from '@react-navigation/native';




const RegisterScreen = ({ navigation }) => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [password, setPassword] = useState(''); 
  const [confirmPassword, setConfirmPassword] = useState('');
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [confirmPasswordVisible, setConfirmPasswordVisible] = useState(false);
  const [error, setError] = useState('');
  const auth = getAuth();

  const handleRegister = () => {
    if (!username || !email || !phoneNumber || !password || !confirmPassword) {
      setError('Please fill in all fields');
      return;
    }

    if (password !== confirmPassword) {
      setError('Password does not match');
      return;
    }
    createUserWithEmailAndPassword(auth, email, password)
    .then(() => {
      const firestore = getFirestore();
      const userRef = doc(firestore, 'users', auth.currentUser.uid);

      const userData = {
        username: username,
        email: email,
        phoneNumber: phoneNumber
      };
      setDoc(userRef, userData)
        .then(() => {
          console.log('User registered successfully:', username);
        })
        .catch((error) => {
          setError(error.message);
        });
    })
    .catch((error) => {
      setError(error.message);
    });
    navigation.navigate('Login');

};
  const handleLoginLink = () => {
    navigation.navigate('Login');
  };

  const togglePasswordVisibility = () => {
    setPasswordVisible(!passwordVisible);
  };

  const toggleConfirmPasswordVisibility = () => {
    setConfirmPasswordVisible(!confirmPasswordVisible);
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Username"
        value={username}
        onChangeText={setUsername}
      />
      <TextInput
        style={styles.input}
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
      />
      <TextInput
        style={styles.input}
        placeholder="Phone Number"
        value={phoneNumber}
        onChangeText={setPhoneNumber}
      />
      <View style={styles.passwordContainer}>
        <TextInput
          style={styles.passwordInput}
          placeholder="Password"
          secureTextEntry={!passwordVisible}
          value={password}
          onChangeText={setPassword}
        />
        <TouchableOpacity
          style={styles.eyeIconContainer}
          onPress={togglePasswordVisibility}
        >
          <Text style={styles.eyeIcon}>{passwordVisible ? '👁️' : '👁️‍🗨️'}</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.passwordContainer}>
        <TextInput
          style={styles.passwordInput}
          placeholder="Confirm Password"
          secureTextEntry={!confirmPasswordVisible}
          value={confirmPassword}
          onChangeText={setConfirmPassword}
        />
        <TouchableOpacity
          style={styles.eyeIconContainer}
          onPress={toggleConfirmPasswordVisibility}
        >
          <Text style={styles.eyeIcon}>
            {confirmPasswordVisible ? '👁️' : '👁️‍🗨️'}
          </Text>
        </TouchableOpacity>
      </View>
      {error ? <Text style={styles.errorText}>{error}</Text> : null}
      <Button title="Register" onPress={handleRegister} />
      <View style={styles.loginLinkContainer}>
        <Text style={styles.loginLinkText}>You already have an account?</Text>
        <TouchableOpacity onPress={handleLoginLink}>
          <Text style={styles.loginLink}>Login</Text>
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
  eyeIcon: {
    fontSize: 20,
  },
  loginLinkContainer: {
    flexDirection: 'row',
    marginTop: 10,
  },
  loginLinkText: {
    marginRight: 5,
    marginTop: 20,
  },
  loginLink: {
    color: 'blue',
    marginTop: 20,
  },
  errorText: {
    color: 'red',
    marginBottom: 10,
  },
});

export default RegisterScreen;
