import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Text, Image, TouchableOpacity, useWindowDimensions, FlatList, Appearance } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';
import { MaterialIcons } from '@expo/vector-icons';
import { TabView, SceneMap, TabBar } from 'react-native-tab-view';

const lightTheme = {
    background: '#FFFFFF',
    text: '#000000',
    primary: '#FFFFFF', // Color de texto blanco
    secondary: '#6C757D', // Color secundario para texto o iconos
    buttonBackground: '#000000', // Color negro para el fondo del botón en modo claro
    buttonText: '#FFFFFF', // Color blanco para el texto del botón en modo claro
    numberText: '#000000', // Color negro para los números en modo claro
    statLabel: '#000000' // Color negro para los textos de estadísticas en modo claro
};

const darkTheme = {
    background: '#000000',
    text: '#FFFFFF',
    primary: '#000000', // Color de texto negro
    secondary: '#6C757D',
    buttonBackground: '#FFFFFF', // Color blanco para el fondo del botón en modo oscuro
    buttonText: '#000000', // Color negro para el texto del botón en modo oscuro
    numberText: '#FFFFFF', // Color blanco para los números en modo oscuro
    statLabel: '#FFFFFF' // Color blanco para los textos de estadísticas en modo oscuro
};  

const Perfil = () => {
    const layout = useWindowDimensions();
    const [index, setIndex] = useState(0);
    const [theme, setTheme] = useState(Appearance.getColorScheme() === 'dark' ? darkTheme : lightTheme);

    useEffect(() => {
        const subscription = Appearance.addChangeListener(({ colorScheme }) => {
            setTheme(colorScheme === 'dark' ? darkTheme : lightTheme);
        });
        return () => subscription.remove();
    }, []);

    const images = [
        { id: 1, source: require("../../assets/imagenes/Xiaomi.png") },
        { id: 2, source: require("../../assets/imagenes/Xiaomi.png") },
        { id: 3, source: require("../../assets/imagenes/Xiaomi.png") },
        { id: 4, source: require("../../assets/imagenes/Xiaomi.png") },
        { id: 5, source: require("../../assets/imagenes/Xiaomi.png") },
    ];

    const PhotosRoutes = () => (
        <View style={{ flex: 1, backgroundColor: theme.background, padding: 10 }}>
          <FlatList
            data={images}
            numColumns={3}
            renderItem={({ item, index }) => (
              <View style={{ flex: 1, aspectRatio: 1, margin: 3 }}>
                <Image
                  source={item.source}
                  style={{ width: "100%", height: "100%", borderRadius: 12 }}
                />
              </View>
            )}
            keyExtractor={(item, index) => item.id.toString()}
          />
        </View>
      );
      

    const LikesRoutes = () => (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: theme.background }}>
            <Text style={{ color: theme.text }}>Likes</Text>
        </View>
    );

    const renderScene = SceneMap({
        first: PhotosRoutes,
        second: LikesRoutes
    });

    const toggleTheme = () => {
        const newTheme = theme === lightTheme ? darkTheme : lightTheme;
        setTheme(newTheme);
    };

    const renderTabBar = (props) => (
        <TabBar
            {...props}
            indicatorStyle={{
                backgroundColor: theme.primary
            }}
            style={{
                backgroundColor: theme.background,
                height: 44
            }}
            renderLabel={({ focused, route }) => (
                <Text style={{ color: focused ? theme.primary : theme.secondary }}>
                    {route.title}
                </Text>
            )}
        />
    );

    return (
        <SafeAreaView style={[styles.container, { backgroundColor: theme.background }]}>
            <StatusBar backgroundColor={theme.background} barStyle={theme === lightTheme ? 'dark-content' : 'light-content'} />
            <View style={styles.content}>
                <View style={[styles.profileContainer, { borderColor: theme.primary }]}>
                    <Image source={require("../../assets/BrayanRe.png")} resizeMode='contain' style={styles.profileImage} />
                    <TouchableOpacity style={[styles.cameraButton, { backgroundColor: theme.buttonBackground }]}>
                        <MaterialIcons name='photo-camera' size={24} color={theme.buttonText} />
                    </TouchableOpacity>
                </View>
                <Text style={{ ...styles.text, color: theme.text }}>Pablo Sanchez</Text>
                <Text style={{ ...styles.text, color: theme.text }}>Interir</Text>
                <View style={styles.locationContainer}>
                    <MaterialIcons name='location-on' size={24} color={theme.text} />
                    <Text style={[styles.text, { marginLeft: 4, color: theme.text }]}>Municipio, San Mateo</Text>
                </View>
                <View style={styles.statsContainer}>
                    <View style={styles.statItem}>
                        <Text style={[styles.statNumber, { color: theme.numberText }]}>122</Text>
                        <Text style={[styles.statLabel, { color: theme.statLabel }]}>Followers</Text>
                    </View>
                    <View style={styles.statItem}>
                        <Text style={[styles.statNumber, { color: theme.numberText }]}>67</Text>
                        <Text style={[styles.statLabel, { color: theme.statLabel }]}>Followings</Text>
                    </View>
                    <View style={styles.statItem}>
                        <Text style={[styles.statNumber, { color: theme.numberText }]}>777</Text>
                        <Text style={[styles.statLabel, { color: theme.statLabel }]}>Likes</Text>
                    </View>
                </View>
                <View style={styles.buttonContainer}>
                    <TouchableOpacity style={[styles.button, { backgroundColor: theme.buttonBackground }]}>
                        <Text style={[styles.buttonText, { color: theme.buttonText }]}>Edita Perfil</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={[styles.button, { backgroundColor: theme.buttonBackground }]}>
                        <Text style={[styles.buttonText, { color: theme.buttonText }]}>Agrega Amigos</Text>
                    </TouchableOpacity>
                </View>
                <View style={styles.tabContainer}>
                    <TabView
                        navigationState={{ index, routes: [
                            { key: "first", title: "Fotos" },
                            { key: "second", title: "Likes" }
                        ] }}
                        renderScene={renderScene}
                        onIndexChange={setIndex}
                        initialLayout={{ width: layout.width }}
                        renderTabBar={renderTabBar}
                    />
                </View>
            </View>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    content: {
        alignItems: 'center',
        padding: 20,
    },
    profileContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 20,
    },
    profileImage: {
        height: 155,
        width: 155,
        borderRadius: 999,
    },
    cameraButton: {
        position: 'absolute',
        bottom: 0,
        right: 0,
        backgroundColor: 'black',
        borderRadius: 20,
        padding: 8,
    },
    locationContainer: {
        flexDirection: "row",
        marginVertical: 6,
        alignItems: "center",
    },
    text: {
        fontSize: 16,
        fontWeight: 'bold',
    },
    statsContainer: {
        flexDirection: "row",
        marginTop: 20,
    },
    statItem: {
        flex: 1,
        alignItems: "center",
    },
    statNumber: {
        fontSize: 18,
        fontWeight: 'bold',
        color: lightTheme.primary,
    },
    statLabel: {
        fontSize: 14,
        color: lightTheme.secondary,
    },
    buttonContainer: {
        flexDirection: "row",
        marginTop: 20,
    },
    button: {
        width: 150,
        height: 40,
        alignItems: "center",
        justifyContent: "center",
        borderRadius: 10,
        marginHorizontal: 10,
    },
    buttonText: {
        fontSize: 16,
        fontWeight: 'bold',
    },
    tabContainer: {
        marginTop: 20,
        width: '100%',
        flex: 1,
    },
});

export default Perfil;
