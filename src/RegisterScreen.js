import React, { useState, useEffect, useRef } from 'react';
import { StyleSheet, View, TextInput, Button, Text, TouchableOpacity, Image } from 'react-native';
import { createUserWithEmailAndPassword, getAuth } from 'firebase/auth';
import firebaseConfig from '../firebaseConfig.js';
import { getFirestore, doc, setDoc } from 'firebase/firestore';
import { useNavigation } from '@react-navigation/native';
import * as ImagePicker from 'expo-image-picker';
import { getStorage, ref, uploadBytes, getDownloadURL } from 'firebase/storage';

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
  const [profileImage, setProfileImage] = useState(null);
  const storage = getStorage();

  const handleRegister = async () => {
    if (!username || !email || !phoneNumber || !password || !confirmPassword) {
      setError('Please fill in all fields');
      return;
    }

    if (password !== confirmPassword) {
      setError('Password does not match');
      return;
    }
    if (profileImage) {
      const response = await fetch(profileImage);
      const blob = await response.blob();

      const storageRef = ref(storage, `profileImages/${username}`);

      await uploadBytes(storageRef, blob);
      const downloadURL = await getDownloadURL(storageRef);

      const userData = {
        username: username,
        email: email,
        phoneNumber: phoneNumber,
        profileImageURL: downloadURL
      };

      createUserWithEmailAndPassword(auth, email, password)
        .then(() => {
          const firestore = getFirestore();
          const userRef = doc(firestore, 'users', auth.currentUser.uid);

          setDoc(userRef, userData)
            .then(() => {
              console.log('User registered successfully:', username);
              navigation.navigate('Login');
            })
            .catch((error) => {
              setError(error.message);
            });
        })
        .catch((error) => {
          setError(error.message);
        });

      navigation.navigate('Login');
    }
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

  const handleChooseImage = async () => {
    const permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();

    if (permissionResult.granted === false) {
      return;
    }

    const imagePickerResult = await ImagePicker.launchImageLibraryAsync();

    if (!imagePickerResult.cancelled) {
      setProfileImage(imagePickerResult.uri);
    }
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
      <View style={{ marginTop: 20, marginBottom: 20 }}>
        <Button
          title="Choose Profile Image"
          onPress={handleChooseImage}
        />
      </View>
      {error ? <Text style={styles.errorText}>{error}</Text> : null}
      <Button title="Register" onPress={handleRegister} style={{ marginTop: 20, marginBottom: 20 }} />
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
