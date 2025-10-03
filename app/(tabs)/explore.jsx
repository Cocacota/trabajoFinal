import { Image } from 'expo-image';
import { Platform, StyleSheet ,FlatList} from 'react-native';


import ParallaxScrollView from '@/components/parallax-scroll-view';
import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { IconSymbol } from '@/components/ui/icon-symbol';
import { Fonts } from '@/constants/theme';
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

export default function TabTwoScreen() {
  return (
    <ParallaxScrollView
      headerBackgroundColor={{ light: '#D0D0D0', dark: '#353636' }}
      headerImage={
        <IconSymbol
          size={310}
          color="#808080"
          name="chevron.left.forwardslash.chevron.right"
          style={styles.headerImage}
        />
      }><Link href="/login" style={styles.button}>
                  <Link.Trigger>
                
                <ThemedText type="subtitle">inicie su sesion aqui</ThemedText>
                </Link.Trigger>
                </Link>
      <ThemedView style={styles.titleContainer}>
        
        <ThemedText
          type="title"
          style={{
            fontFamily: Fonts.rounded,
          }}>
          Explore
        </ThemedText>
        </ThemedView>
        <FlatList
        data={products}
        keyExtractor={(item)=> item.id}
        renderItem={({item})=><ProductCard{...item}></ProductCard>}
        /> 
      
      
    </ParallaxScrollView>
  );
}

const styles = StyleSheet.create({
  headerImage: {
    color: '#808080',
    bottom: -90,
    left: -35,
    position: 'absolute',
  },
  titleContainer: {
    flexDirection: 'row',
    gap: 8,
    flex: 1,
  }, button: {
    backgroundColor: "#007AFF",
    padding: 15,
    borderRadius: 8,
    alignItems: "center",
    margin:"auto"
  },
});
