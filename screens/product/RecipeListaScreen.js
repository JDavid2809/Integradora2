import { SafeAreaView, StyleSheet, Text, View, Platform, FlatList } from 'react-native';
import React from 'react';
import Carousel from '../../components/Carousel';
import SearchFilter from '../../components/SearchFilter';
import CategoriesFilter from '../../components/CategoriesFilter';
import ObjetoCard from '../../components/ObjetoCard';
import FloatingActionButton from '../../components/FloatingActionButton'; // Importa el nuevo componente de botón flotante

const RecipeListaScreen = () => {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.contentContainer}>
        <FlatList
          style={{ flex: 1 }}
          data={['search', 'carousel', 'categories', 'objects']}
          renderItem={({ item }) => {
            switch (item) {
              case 'search':
                return (
                  <View style={[styles.section, styles.searchContainer]}>
                    <SearchFilter icon="search" placeholder={"Buscar..."} />
                  </View>
                );
              case 'carousel':
                return (
                  <View style={[styles.section, styles.carouselContainer]}>
                    <Carousel/>
                  </View>
                );
              case 'categories':
                return (
                  <View style={[styles.section, styles.categoryContainer]}>
                    <Text style={styles.categoryTitle}>Categorias</Text>
                    <CategoriesFilter />
                  </View>
                );
              case 'objects':
                return (
                  <View style={[styles.section, styles.listContainer]}>
                    <Text style={styles.listTitle}>Lista</Text>
                    <ObjetoCard />
                  </View>
                );
              default:
                return null;
            }
          }}
          keyExtractor={(item) => item}
          ListFooterComponent={<View style={{ height: 100 }} />} // Espacio adicional al final para evitar que el contenido se superponga con el pie de página
        />
      </View>
      {/* Botón flotante */}
      <FloatingActionButton onPress={() => console.log("Botón flotante presionado")} />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginHorizontal: 16,
    marginTop: 80,
    justifyContent: 'flex-start', // Alinear los elementos al principio
  },
  contentContainer: {
    flex: 1,
    marginTop: -50, // Ajusta este valor según sea necesario
  },
  section: {
    marginTop: 20,
  },
  // Otros estilos...
});

export default RecipeListaScreen;
