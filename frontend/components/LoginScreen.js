import React, { useState } from 'react';
import { StyleSheet, Text, View, Button, TextInput, TouchableOpacity, Image } from 'react-native';
import { auth } from '../firebase/config';
import { signInWithEmailAndPassword } from 'firebase/auth';

const LoginScreen = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const login = async () => {
    try {
      await signInWithEmailAndPassword(auth, email, password);
      // Navigate to the LoginScreen
      navigation.navigate("Main");
    } catch (err) {
      alert('Login failed: ' + err.message);
    }
  };

  return (
    <View style={styles.container}>
      <Image source={require('../assets/logo.png')} style={styles.logo} />
      <Text style={styles.title}>
        {capitalizeFirstLetter('Welcome back') + ' to'} <Text style={styles.pouch}>Pouch</Text>
      </Text>
      <Text style={styles.subtitle}>{capitalizeFirstLetter('Enter') + ' your' +  capitalizeFirstLetter(' email') + ' and' + capitalizeFirstLetter(' password')}</Text>
      <TextInput
        style={styles.input}
        placeholder="email@domain.com"
        placeholderTextColor="#828282"
        value={email}
        onChangeText={setEmail}
      />
      <TextInput
        style={styles.input}
        placeholder="password"
        placeholderTextColor="#828282"
        value={password}
        onChangeText={setPassword}
        secureTextEntry={true}
      />
      <TouchableOpacity style={styles.button} onPress={login}>
        <Text style={styles.buttonText}>{capitalizeFirstLetter('Login')} </Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.label}>
        <Text style={styles.label}>{capitalizeFirstLetter('Forgot') + ' password?'}</Text>
      </TouchableOpacity>
    </View>
  );
}

const capitalizeFirstLetter = (text) => {
  return text
    .toLowerCase()
    .split(' ')
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 27,
    fontWeight: 'bold',
    color: '#000',
    marginBottom: 30,
  },
  pouch: {
    color: '#88C34A',
  },
  subtitle: {
    fontSize: 17,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  input: {
    width: '80%',
    height: 35,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 10,
    marginBottom: 20,
    color: '#000'
  },
  button: {
    width: '80%',
    height: 40,
    backgroundColor: '#88C34A',
    borderRadius: 5,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 20,
  },
  buttonText: {
    color: '#fff',
    fontSize: 14,
  },
  logo: {
    width: 90, // Adjust the width as needed
    height: 90, // Adjust the height as needed
    marginBottom: 20,
  },
  label: {
    fontSize: 14,
    marginBottom: 30,
    color: '#000',
  },
});

export default LoginScreen;