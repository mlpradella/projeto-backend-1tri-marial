import { StyleSheet } from 'react-native';
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
      <ThemedView style={styles.content}>
        <ThemedText style={styles.tituloBolo}>
          BOLO DE CENOURA
        </ThemedText>
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
    backgroundColor: '#8C5B3E'
  },
  content: {
    marginTop: 16,
    paddingHorizontal: 16,
  },
  tituloBolo: {
    fontFamily: Fonts.serif,
    fontSize: 18,
  }
});
