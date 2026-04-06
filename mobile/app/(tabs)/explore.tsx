import { View, Text, Image, StyleSheet } from 'react-native';
import ParallaxScrollView from '@/components/parallax-scroll-view';
import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { Fonts } from '@/constants/theme';


export default function TabTwoScreen() {
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
              backgroundColor: '#8C5B3E'
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
     <ThemedView style={styles.row}>
      <Image
      source={require('../../assets/images/image.png')}
      style={styles.imagem}
      />
      <ThemedText style={styles.text}>BOLO DE CENOURA</ThemedText>
     </ThemedView>
     <ThemedText style={styles.descricao}>Fofinho e doce, com um toque de leveza. Com a cobertura de chocolate, cria uma combinação irresistível.</ThemedText>
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
    backgroundColor: '#8C5B3E'
  },
  content: {
    marginTop: 16,
    paddingHorizontal: 16,
    padding: 1,
    marginRight: 16,
    alignSelf: 'flex-start',
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
    alignItems: 'flex-start',
  },
  text: {
    color: '#fff',
    fontFamily: Fonts.serif,
    fontSize: 18,
    top: 1,
  },
  descricao: {
    color: '#fff',
    fontFamily: Fonts.serif,
    fontSize: 18,
    top: 1,
  }
});
