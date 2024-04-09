import React, { useState, useEffect } from 'react';
import { View, Text, Image, StyleSheet, Button, ScrollView, TouchableOpacity, Animated } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Input from '../../components/Input';
import { Colors } from 'react-native/Libraries/NewAppScreen';
import { AntDesign, FontAwesome } from '@expo/vector-icons'; // Importa FontAwesome
import { LinearGradient } from 'expo-linear-gradient'; // Importa LinearGradient

const FONTS = {
  h2: {
    fontSize: 36,
    fontWeight: 'bold',
    color: 'white', // Color más vibrante
    marginVertical: 15,
    textAlign: 'center', // Alineación centrada
    textShadowColor: 'rgba(0, 0, 0, 0.2)', // Color de la sombra
    textShadowOffset: { width: 2, height: 2 }, // Offset de la sombra
    textShadowRadius: 5, // Radio de la sombra
  },
  
  body: {
    fontSize: 18,
    color: Colors.gray,
    marginBottom: 20,
    textAlign: 'center', // Alineación centrada
    paddingHorizontal: 20, // Espaciado horizontal
    
  },
  button: {
    backgroundColor: '#007bff',
    paddingVertical: 14, // Ajustado el espaciado vertical
    paddingHorizontal: 28, // Ajustado el espaciado horizontal
    borderRadius: 30, // Bordes redondeados
    elevation: 3, // Sombra
    flexDirection: 'row', // Alinear elementos horizontalmente
    justifyContent: 'center', // Alinear elementos horizontalmente
    alignItems: 'center', // Alinear elementos verticalmente
  },
  buttonText: {

    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
    marginLeft: 10, // Espaciado entre el icono y el texto
  
  },
};

const ProductRegistration = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [imageUploaded, setImageUploaded] = useState(false); // Estado para controlar si se ha subido una imagen
  const animatedValue = new Animated.Value(0);

  useEffect(() => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(animatedValue, {
          toValue: 1,
          duration: 1500,
          useNativeDriver: false,
        }),
        Animated.timing(animatedValue, {
          toValue: 0,
          duration: 1500,
          useNativeDriver: false,
        }),
      ])
    ).start();
  }, []);

  const translateText = animatedValue.interpolate({
    inputRange: [0, 1],
    outputRange: [0, 10],
  });

  const authHandler = () => {
    console.log('authHandle');
  };

  const handleAddPhoto = () => {
    console.log('Add photo');
    setImageUploaded(true); // Cambia el estado a true cuando se sube una imagen
  };

  return (
    <LinearGradient // Aplica el gradiente lineal como fondo
      colors={['#caf0f8', '#ffffff']} // Colores del gradiente
      style={styles.container}>
      <SafeAreaView>
        <ScrollView>
          <View>
            <Animated.Text style={[FONTS.h2, { transform: [{ translateY: translateText }] }]}>PUBLIQUE SU ARTÍCULO</Animated.Text>
            <View style={styles.imageContainer}>
              <Animated.View style={[styles.circle, { transform: [{ translateY: translateText }] }]} />
              <Animated.Image
                source={require("../../assets/images/BOXS.png")}
                resizeMode='contain'
                style={[styles.image, { transform: [{ translateY: translateText }] }]}
              />
            </View>
            <Animated.Text style={[FONTS.body, { transform: [{ translateY: translateText }] }]}>
              Conéctate y cambia lo que ya no necesitas por lo que realmente quieres. ¡Intercambio fácil, rápido y sin dinero!
            </Animated.Text>
          </View>

          <View style={{ marginVertical: 20 }}>
            <Input
              id='nombre'
              placeholder="Nombre del objeto:"
              placeholderTextColor={Colors.gray}
            />
            <Input
              id='categoria'
              placeholder="Categoría:"
              placeholderTextColor={Colors.gray}
            />
            <Input
              id='caracteristicas'
              placeholder="Características del objeto:"
              placeholderTextColor={Colors.gray}
            />
            <Input
              id='trueque'
              placeholder="Qué espera a cambio?"
              placeholderTextColor={Colors.gray}
            />
            <TouchableOpacity onPress={handleAddPhoto} style={styles.addPhotoButton}>
              <AntDesign name="pluscircleo" size={24} color="black"/>
              <Text style={styles.addPhotoText}>Agregar Foto</Text>
              {imageUploaded && ( // Renderiza el ícono de font awesome si se ha subido una imagen
                <FontAwesome name="check-circle" size={24} color="#007bff" style={styles.checkIcon} />
              )}
            </TouchableOpacity>
          </View>
        </ScrollView>

        <TouchableOpacity onPress={authHandler} style={styles.button}>
          <AntDesign name="checkcircleo" size={24} color="white"/>
          <Text style={styles.buttonText}>Publicar</Text>
        </TouchableOpacity>
      </SafeAreaView>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    alignItems: 'center',
    justifyContent: 'center',
  },
  imageContainer: {
    alignItems: 'center',
    position: 'relative',
  },
  image: {
    width: 150,
    height: 150,
    marginBottom: 20,
    alignSelf: 'center',
  },
  circle: {
    width: 160,
    height: 160,
    borderRadius: 80,
    borderColor: '#fff',
    borderWidth: 2,
    position: 'absolute',
    zIndex: -1,
  },
  checkIcon: {
    marginLeft: 10,
  },
  button: {
    borderRadius: 30,
    elevation: 3,
    marginVertical: 20,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#007bff',
    paddingVertical: 14,
    paddingHorizontal: 28,
  },
  bottomContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 10,
  },
  addPhotoButton: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
    justifyContent: 'center',
    backgroundColor: '#affc41',
    padding: 10,
    borderRadius: 8,
    marginTop: 20,
  },
  addPhotoText: {
    marginLeft: 10,
    color: 'black',
    fontSize: 16,
    fontWeight: 'bold',
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
    marginLeft: 10,
    
  },
});

export default ProductRegistration;
