import { Image } from 'expo-image';
import { FlatList, Platform, StyleSheet } from 'react-native';

import { HelloWave } from '@/components/hello-wave';
import ParallaxScrollView from '@/components/parallax-scroll-view';
import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { Link } from 'expo-router';
import ProductCard from '@/components/card-producto';

const products = [
  {
    id: "1",
    toolName: "Taladro Bosch",
    description: "Taladro eléctrico de 500W ideal para construcción.",
    price: 15,
    imageUrl: "https://picsum.photos/400/200?random=1",
    user: { name: "Carlos Pérez", avatarUrl: "https://i.pravatar.cc/150?img=3" },
  },
  {
    id: "2",
    toolName: "Amoladora Makita",
    description: "Amoladora angular de 125mm para cortes precisos.",
    price: 12,
    imageUrl: "https://picsum.photos/400/200?random=2",
    user: { name: "Lucía Gómez" },
  },
];

export default function HomeScreen() {
  return (
    <ParallaxScrollView
      headerBackgroundColor={{ light: '#A1CEDC', dark: '#1D3D47' }}
      headerImage={<Image
          source={require('@/assets/images/partial-react-logo.png')}
          style={styles.reactLogo}/>
      
      }><Link href="/login" style={styles.button}>
          <Link.Trigger>
        
        <ThemedText type="subtitle">inicie su sesion aqui</ThemedText>
        </Link.Trigger>
        </Link>
      <ThemedView style={styles.titleContainer}>
        <ThemedText type="title">vecinos alquiladores</ThemedText>
        <HelloWave />
      </ThemedView>
      <ThemedView style={styles.stepContainer}>
        <ThemedText type="subtitle">herramientas ofrecidas</ThemedText>
        <FlatList
        data={products}
        keyExtractor={(item)=> item.id}
        renderItem={({item})=><ProductCard{...item}></ProductCard>}
      />
      </ThemedView>
      
      
    </ParallaxScrollView>
  );
}

const styles = StyleSheet.create({
  titleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  stepContainer: {
    gap: 8,
    marginBottom: 8,
  },
  reactLogo: {
    height: 178,
    width: 290,
    bottom: 0,
    left: 0,
    position: 'absolute',
  }, button: {
    backgroundColor: "#007AFF",
    padding: 15,
    borderRadius: 8,
    alignItems: "center",
    margin:"auto",
  },
});
