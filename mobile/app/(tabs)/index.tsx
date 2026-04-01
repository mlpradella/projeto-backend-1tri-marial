import { Image } from 'expo-image';
import { Platform, StyleSheet, TextInput, View, Text, Button } from 'react-native';

import { HelloWave } from '@/components/hello-wave';
import ParallaxScrollView from '@/components/parallax-scroll-view';
import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { Link } from 'expo-router';

export default function HomeScreen() {
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
      <View style={styles.content}>
        <Text>Email address</Text>
        <TextInput
          style={styles.input}
          keyboardType="email-address"
          placeholder="Digite seu email"
        />

        <Text>Password</Text>
        <TextInput
          style={styles.input}
          secureTextEntry
          placeholder="Digite sua senha"
        />

        <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 40 }}>
          <Text>Check me out</Text>
        </View>

        <Button title="Submit" onPress={() => console.log("Form enviado")} />
      </View>
    </ParallaxScrollView>

  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#D9B79B'
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
    marginTop: 140,
    paddingHorizontal: 16,
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginTop: 10,
    paddingHorizontal: 8,
    backgroundColor: '#fff',
  },
});
