import { StyleSheet, TextInput } from 'react-native';
import ParallaxScrollView from '@/components/parallax-scroll-view';
import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { Fonts } from '@/constants/theme';
import { useState } from 'react';

export default function TabTwoScreen() {
  const [texto, setTexto] = useState('');

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
      }>
      <ThemedView style={styles.content}>
        <TextInput
          style={styles.input}
          placeholder="Nome da Receita"
          value={texto}
          onChangeText={setTexto}
        />
        <ThemedText>Você digitou: {texto}</ThemedText>
      </ThemedView>
    </ParallaxScrollView>
  );
}

const styles = StyleSheet.create({
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
    fontFamily: Fonts.serif,
    color: '#fff',
    marginTop: 80,
    backgroundColor: '#8C5B3E',
  },
  subtitle: {
    fontFamily: Fonts.mono,
    color: '#fff',
    marginTop: 30,
    textAlign: 'center',
    backgroundColor: '#8C5B3E',
    fontSize: 15,
  },
  content: {
    marginTop: -20,
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
