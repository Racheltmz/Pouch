import React, { useState } from 'react';
import { StyleSheet, Text, View, Button, TextInput, TouchableOpacity, Image } from 'react-native';

const RegisterScreen = ({ navigation }) => {
    const [email, setEmail] = useState('');

    const handleGoogleLogin = () => {
        // Navigate to the LoginScreen
        navigation.navigate("Login");
    };

    const handleLoginLink = () => {
        // Navigate to the LoginScreen
        navigation.navigate("Login");
    };

    return (
        <View style={styles.container}>
            <Image source={require('../assets/logo.jpeg')} style={styles.logo} />
            <Text style={styles.title}>
                {capitalizeFirstLetter('Welcome to')} <Text style={styles.pouch}>Pouch</Text>
            </Text>
            <Text style={styles.subtitle}>{capitalizeFirstLetter('Create') + ' an account'}</Text>
            <Text style={styles.label}>{capitalizeFirstLetter('Enter') + ' your email to sign up'}</Text>
            <TextInput
                style={styles.input}
                placeholder="email@domain.com"
                value={email}
                onChangeText={setEmail}
            />
            <TouchableOpacity style={styles.button}>
                <Text style={styles.buttonText}>{capitalizeFirstLetter('Sign') + ' up with email'}</Text>
            </TouchableOpacity>
            <Text style={styles.or}>{capitalizeFirstLetter('or') + ' continue with'}</Text>
            <TouchableOpacity style={styles.googleButton}>
                <Text style={styles.googleButtonText} onPress={handleGoogleLogin}> {capitalizeFirstLetter('Sign') + ' in with Google'}</Text>
            </TouchableOpacity>
            <Text style={styles.footer}>
                {capitalizeFirstLetter('By') + ' clicking continue, you agree to our '}
                <Text style={styles.link}>{capitalizeFirstLetter('Terms') + '\n' + ' of Service '}</Text>
                and
                <Text style={styles.link}>{capitalizeFirstLetter(' Privacy Policy')}</Text>
            </Text>
            <TouchableOpacity onPress={handleLoginLink}>
                <Text style={styles.accountCheck}>
                    <Text style={styles.label}>{capitalizeFirstLetter('Already') + ' have an account? '}
                        <Text style={styles.loginLink}>{capitalizeFirstLetter('Login')}</Text>
                    </Text>
                </Text>
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
        marginBottom: 20,
    },
    pouch: {
        color: '#88C34A',
    },
    subtitle: {
        fontSize: 17,
        fontWeight: 'bold',
        marginBottom: 7,
    },
    label: {
        fontSize: 14,
        marginBottom: 30,
    },
    input: {
        width: '80%',
        height: 35,
        borderColor: '#ccc',
        borderWidth: 1,
        borderRadius: 5,
        paddingHorizontal: 10,
        marginBottom: 20,
        fontStyle: 'italic',
        color: '#828282'
    },
    button: {
        width: '80%',
        height: 40,
        backgroundColor: '#000',
        borderRadius: 5,
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: 20,
    },
    buttonText: {
        color: '#fff',
        fontSize: 14,
    },
    or: {
        marginVertical: 10,
        fontSize: 16,
    },
    googleButton: {
        width: '80%',
        height: 40,
        backgroundColor: '#88C34A',
        borderRadius: 5,
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: 20,
    },
    googleButtonText: {
        color: '#fff',
        fontSize: 14,
    },
    footer: {
        fontSize: 12,
        textAlign: 'center',
        color: '#aaa',
        marginBottom: 20,
    },
    link: {
        color: '#88C34A',
    },
    logo: {
        width: 90, // Adjust the width as needed
        height: 90, // Adjust the height as needed
        marginBottom: 20,
    },
    accountCheck: {
        fontSize: 16,
        color: '#000',
    },
    loginLink: {
        fontWeight: 'bold',
        color: '#88C34A',
    },
});

export default RegisterScreen;