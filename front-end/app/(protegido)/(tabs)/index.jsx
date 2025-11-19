import { Image } from 'expo-image';
import React, { useContext,useState } from "react";
import { FlatList, ActivityIndicator, StyleSheet } from 'react-native';
import { HelloWave } from '@/components/hello-wave';
import ParallaxScrollView from '@/components/parallax-scroll-view';
import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { Link } from 'expo-router';
import ProductCard from '@/components/card-producto';
import ProductModal from '@/components/modal';
import { ProductContext } from '@/components/contexto/contex-listProducto';

export default function HomeScreen() {
  const { producto, loading } = useContext(ProductContext);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);

  const handleSelect = (producto) => {
    setSelectedProduct(producto);
    setModalVisible(true);
  };

  if (loading) {
    return (
      <ThemedView style={styles.loaderContainer}>
        <ActivityIndicator size="large" color="#007bff" />
        <ThemedText style={styles.loadingText}>Cargando productos...</ThemedText>
      </ThemedView>
    );
  }

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
      <ThemedView style={styles.container}>
      <ThemedText style={styles.header}>🛠 Herramientas disponibles</ThemedText>

      <FlatList
        data={producto}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => <ProductCard item={item} onPress={handleSelect} />}
        showsVerticalScrollIndicator={false}
        ListEmptyComponent={<ThemedText style={styles.empty}>No hay productos disponibles 😔</ThemedText>}
      />

      <ProductModal visible={modalVisible} product={selectedProduct} onClose={() => setModalVisible(false)} />
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
  },container: {
    flex: 1,
    backgroundColor: "#f8f9fa",
  },
  header: {
    fontSize: 22,
    fontWeight: "bold",
    textAlign: "center",
    marginVertical: 16,
    color: "#333",
  },
  loaderContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  loadingText: {
    marginTop: 10,
    color: "#555",
  },
  empty: {
    textAlign: "center",
    marginTop: 50,
    fontSize: 16,
    color: "#777",
  },
});
