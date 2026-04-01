import React, { useState } from 'react';
import { StyleSheet, TextInput, View, Image, TouchableOpacity, Text, Alert } from 'react-native';
import ParallaxScrollView from '@/components/parallax-scroll-view';
import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { Fonts } from '@/constants/theme';
import { launchImageLibrary } from 'react-native-image-picker';

export default function TabTwoScreen() {
  const [nomeReceita, setNomeReceita] = useState('');
  const [ingredientes, setIngredientes] = useState('');
  const [modoPreparo, setModoPreparo] = useState('');
  const [imagem1, setImagem1] = useState<string | null>(null);
  const [imagem2, setImagem2] = useState<string | null>(null);

  const escolherImagem1 = async () => {
    try {
      const result = await launchImageLibrary({ mediaType: 'photo', quality: 1 });
      if (result.assets && result.assets.length > 0) {
        const asset = result.assets[0];
        if (asset.uri) setImagem1(asset.uri);
      }
    } catch (error) {
      console.log('Erro ao escolher imagem1:', error);
    }
  };

  const escolherImagem2 = async () => {
    try {
      const result = await launchImageLibrary({ mediaType: 'photo', quality: 1 });
      if (result.assets && result.assets.length > 0) {
        const asset = result.assets[0];
        if (asset.uri) setImagem2(asset.uri);
      }
    } catch (error) {
      console.log('Erro ao escolher imagem2:', error);
    }
  };

  const enviarReceita = () => {
    // Backend/Serviço de gerenciamento
    Alert.alert("Sucesso", "Sua receita foi enviada para a revisão!");
  };

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
          style={[styles.input, styles.nomeReceitaInput]}
          placeholder="Nome da Receita"
          value={nomeReceita}
          onChangeText={setNomeReceita}
          textAlign="center"
          textAlignVertical="center"
        />
      </ThemedView>

      <View style={styles.imagesRow}>
        <TouchableOpacity style={styles.imageBox} onPress={escolherImagem1}>
          {imagem1 ? (
            <Image source={{ uri: imagem1 }} style={styles.image} />
          ) : (
            <Text style={styles.placeholder}>Imagem 1</Text>
          )}
        </TouchableOpacity>

        <TouchableOpacity style={styles.imageBox} onPress={escolherImagem2}>
          {imagem2 ? (
            <Image source={{ uri: imagem2 }} style={styles.image} />
          ) : (
            <Text style={styles.placeholder}>Imagem 2</Text>
          )}
        </TouchableOpacity>
      </View>

      <ThemedView style={styles.content}>
        <TextInput
          style={[styles.input, styles.multilineInput]}
          placeholder="Ingredientes necessários"
          value={ingredientes}
          onChangeText={setIngredientes}
          multiline={true}
        />
      </ThemedView>

      <ThemedView style={styles.content}>
        <TextInput
          style={[styles.input, styles.multilineInput]}
          placeholder="Modo de preparo"
          value={modoPreparo}
          onChangeText={setModoPreparo}
          multiline={true}
        />
      </ThemedView>

      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.button} onPress={enviarReceita}>
          <Text style={styles.buttonText}>Enviar</Text>
        </TouchableOpacity>
      </View>
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
    fontFamily: Fonts.serif,
    color: '#fff',
    marginTop: 30,
    textAlign: 'center',
    backgroundColor: '#8C5B3E',
    fontSize: 15,
  },
  content: {
    marginTop: 20,
    paddingHorizontal: 16,
  },
  input: {
    borderWidth: 1,
    marginTop: 10,
    paddingHorizontal: 8,
    backgroundColor: '#E1C4AC',
  },
  nomeReceitaInput: {
    height: 60,
    fontFamily: Fonts.serif,
    fontSize: 16,
    backgroundColor: '#E1C4AC',
    color: '#fff',
    borderRadius: 10,
    borderWidth: 1.8,
    borderColor: '#fff',
  },
  imagesRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: 20,
    paddingHorizontal: 16,
  },
  imageBox: {
    width: 150,
    height: 150,
    borderWidth: 1.8,
    borderColor: '#fff',
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    overflow: 'hidden',
    backgroundColor: '#E1C4AC',
  },
  image: {
    width: '100%',
    height: '100%',
  },
  multilineInput: {
    minHeight: 80,
    fontFamily: Fonts.serif,
    fontSize: 16,
    color: '#fff',
    borderRadius: 10,
    borderWidth: 1.8,
    borderColor: '#fff',
  },
  placeholder: {
    textAlign: 'center',
    fontFamily: Fonts.serif,
    fontSize: 16,
    color: '#fff'
  },
  buttonContainer: {
    marginTop: 30,
    alignItems: 'center',
  },
  button: {
    backgroundColor: '#8C5B3E',
    paddingVertical: 12,
    paddingHorizontal: 40,
    borderRadius: 8,
  },
  buttonText: {
    color: '#fff',
    fontFamily: Fonts.serif,
    fontSize: 16,
  },
});
