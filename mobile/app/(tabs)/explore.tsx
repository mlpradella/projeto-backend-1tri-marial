import { View, Text, Image, StyleSheet, Button, FlatList} from 'react-native';
import ParallaxScrollView from '@/components/parallax-scroll-view';
import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { Fonts } from '@/constants/theme';
import * as ImagePicker from 'expo-image-picker';
import { useState } from 'react';

export default function TabTwoScreen() {
  const [imageUri, setImageUri] = useState<string | null>(null);

  const pickImage = async () => {
    // pede permissão
    const permission = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (!permission.granted) {
      alert('Permissão para acessar a galeria é necessária!');
      return;
    }

    // abre a galeria
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      quality: 1,
    });

    if (!result.canceled) {
      setImageUri(result.assets[0].uri);
    }
  };

  type Bolo = {
    id: string;
    titulo: string;
    descricao: string;
    imagem?: any;
  };
  
  
  const bolos = [
    {
      id: '1',
      titulo: 'BOLO DE CENOURA',
      descricao:
        'Fofinho e doce, com um toque de leveza. Com a cobertura de chocolate, cria uma combinação irresistível.',
      imagem: imageUri || require('../../assets/images/image.png'),
    },
    {
      id: '2',
      titulo: 'BOLO DE PRESTÍGIO',
      descricao:
        'Uma mistura de chocolate com coco. Criando uma combinação cremosa e macia.',
      imagem: require('../../assets/images/image-2.png'),
    },
    {
      id: '3',
      titulo: 'BOLO DE CÔCO',
      descricao:
         'Úmido e suave, com o sabor do coco presente na cobertura e na massa. Uma opção leve, com sabor delicado e com textura macia.',
      imagem: imageUri || require('../../assets/images/image-3.png'),
    },
  ];

  const renderItem = ({ item } : { item: Bolo }) => (
    <ThemedView style={styles.row}>
      <Image source={item.imagem} style={styles.imagem} />
      <View style={styles.textContainer}>
        <ThemedText style={styles.text}>{item.titulo}</ThemedText>
        <ThemedText style={styles.descricao}>{item.descricao}</ThemedText>
      </View>
    </ThemedView>
  );

  return (
    <ParallaxScrollView
      headerBackgroundColor={{ light: '#8C5B3E', dark: '#8C5B3E' }}
      headerImage={
        <ThemedView style={styles.headerContainer}>
          <ThemedText
            type="title"
            style={{
              fontFamily: Fonts.serif,
              color: '#fff',
              marginTop: 80,
              backgroundColor: '#8C5B3E',
            }}>
            Doce Alquimia
          </ThemedText>
          <ThemedText
            type="subtitle"
            style={{
              fontFamily: Fonts.mono,
              color: '#fff',
              marginTop: 30,
              textAlign: 'center',
              backgroundColor: '#8C5B3E',
              fontSize: 15,
            }}>
            Onde ingredientes simples são transformados em algo valioso e especial
          </ThemedText>
        </ThemedView>
      }>

        <FlatList<Bolo>
          data={bolos}
          renderItem={renderItem}
          keyExtractor={(item) => item.id}
          />
      


    </ParallaxScrollView>
  );
}

const styles = StyleSheet.create({
  headerContainer: {
    position: 'absolute',
    top: 40,
    left: 0,
    right: 0,
    alignItems: 'flex-start',
    paddingHorizontal: 16,
    backgroundColor: '#8C5B3E',
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    margin: 16,
  },
  imagem: {
    width: 110,
    height: 100,
    marginRight: 12,
    alignSelf: 'flex-start',
    marginBottom: 8,
  },
  text: {
    color: '#fff',
    fontFamily: Fonts.serif,
    fontSize: 18,
    marginBottom: 4,
  },
  descricao: {
    color: '#fff',
    fontFamily: Fonts.serif,
    fontSize: 18,
  },
  textContainer: {
    flex: 1,
    justifyContent: 'flex-start',
  },
  
});
