import React, { useState } from 'react';
import { StyleSheet, TextInput, View, Text, Button } from 'react-native';

import ParallaxScrollView from '@/components/parallax-scroll-view';
import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { Image } from 'react-native';
import { Dimensions } from 'react-native';
import { useRouter } from 'expo-router';

const screenWidth = Dimensions.get('window').width;

export default function HomeScreen() {
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const router = useRouter();

  return (
    <ParallaxScrollView 
      headerBackgroundColor={{ light: '#8C5B3E', dark: '#8C5B3E' }}
      headerImage={
        <ThemedView style={styles.headerContainer}>
          <ThemedText type="title" style={styles.title}>
            Doce Alquimia
          </ThemedText>
          <ThemedText type="subtitle" style={styles.subtitle}>
            Onde ingredientes simples são transformados em algo valioso e especial
          </ThemedText>
        </ThemedView>
      }
    >
      <View style={{ alignItems: 'center' }}>
      <Image 
        source={require('../../assets/images/calda.png')} 
        style={styles.imagem}
        />
      </View>



      <View style={styles.content}>
        <Text style={styles.loginTitle}>USER LOGIN</Text>

        <TextInput
          style={styles.input1}
          keyboardType="email-address"
          placeholder="Use or email"
          value={email}
          onChangeText={setEmail}
        />
        <TextInput
          style={styles.input}
          secureTextEntry
          placeholder="Password"
          value={senha}
          onChangeText={setSenha}
        />
      </View>
      <View style={styles.loginButton}>
        <Button 
          title="Login in" 
          onPress={() => {
            console.log("Form enviado", { email, senha });
            router.push('/(tabs)/explore'); 
          }} 
          color="#8C5B3E"
        />
      </View>

     
    </ParallaxScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#D9B79B'
  },
  imagem: {
    width: screenWidth, 
    height: 120,     
    resizeMode: 'cover', 
    marginTop: -34,
  },  
  headerContainer: {
    position: 'absolute',
    top: 40,
    left: 0,
    right: 0,
    alignItems: 'center',
    paddingHorizontal: 16,
    backgroundColor: '#8C5B3E',
  },
  title: {
    color: '#fff',
    marginTop: 80,
    backgroundColor: '#8C5B3E',
  },
  subtitle: {
    color: '#fff',
    marginTop: 30,
    textAlign: 'center',
    backgroundColor: '#8C5B3E',
    fontSize: 15,
  },
  content: {
    marginTop: 100,
    paddingHorizontal: 16,
  },
  input1: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 8,
    backgroundColor: '#8C5B3E',
    color: '#fff',
    marginBottom: 25,
  },

  input: {
    color: '#fff',
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    borderRadius: 8,
    marginTop: 10,
    paddingHorizontal: 8,
    backgroundColor: '#8C5B3E',
  },

  loginButton: {
    marginTop: 20,
    width: '100%',    
    maxWidth: 200,      
    alignSelf: 'center', 
    
  },

  loginTitle:{
    fontSize: 30,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 40,
    color: '#fff'
  },
  
});
