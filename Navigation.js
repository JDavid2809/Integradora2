import React from "react";
import { DarkTheme, DefaultTheme, NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createDrawerNavigator } from '@react-navigation/drawer';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { Ionicons } from "@expo/vector-icons";
import { Image, Pressable, useColorScheme } from "react-native";
import RecipeListaScreen from "./screens/product/RecipeListaScreen";
import ObjetoDetallesScreen from "./screens/product/ObjetoDetallesScreen";
import Perfil from "./screens/profile/Perfil";
import ProductRegistration from "./screens/login/ProductRegistration";
import Payments from "./screens/drawerScreens/Payments";
import Notifications from "./screens/tabScreens/Notifications";
import Settings from "./screens/tabScreens/Settings";

const TopTab = createMaterialTopTabNavigator();

function TopTabGroup() {
  return (
    <TopTab.Navigator
      screenOptions={{
        tabBarLabelStyle: { textTransform: "capitalize", fontWeight: "bold" },
        tabBarIndicatorStyle: { height: 5, borderRadius: 20, backgroundColor: "#8EF3B6" }
      }}>
      <TopTab.Screen name="Producto" component={RecipeListaScreen} />
      {/* <TopTab.Screen name="Nuevo" component={Inicio} /> */}
      <TopTab.Screen name="Cambios" component={Payments} />
      <TopTab.Screen name="Subir Producto" component={ProductRegistration} />
      <TopTab.Screen name="Carrito" component={Payments} />
    </TopTab.Navigator>
  );
}

const Drawer = createDrawerNavigator();

// Define StackGroup antes de DrawerGroup
const Stack = createNativeStackNavigator();

function StackGroup() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="TabGroup" component={TabGroup} options={{ headerShown: false }} />
      <Stack.Screen name="RecipeList" component={RecipeListaScreen} />
      <Stack.Screen name="ObjetoDetalles" component={ObjetoDetallesScreen} />
    </Stack.Navigator>
  );
}

function DrawerGroup() {
  return (
    <Drawer.Navigator>
      <Drawer.Screen 
        name="Principal" 
        component={StackGroup} 
        options={{ 
          headerShown: false,
          drawerIcon: ({ focused, color, size }) => (
            <Ionicons 
              name={focused ? "home" : "home-outline"} 
              size={size} 
              color={color} 
            />
          ),
        }} 
      />
      <Drawer.Screen 
        name="Perfil" 
        component={Perfil} 
        options={{ 
          drawerIcon: ({ focused, color, size }) => (
            <Ionicons 
              name={focused ? "person-circle" : "person-circle-outline"} 
              size={size} 
              color={color} 
            />
          ),
        }} 
      />
      <Drawer.Screen 
        name="Subir Producto" 
        component={ProductRegistration} 
        options={{ 
          drawerIcon: ({ focused, color, size }) => (
            <Ionicons 
              name={focused ? "cloud-upload" : "cloud-upload-outline"} 
              size={size} 
              color={color} 
            />
          ),
        }} 
      />
      <Drawer.Screen 
        name="Payments" 
        component={Payments} 
        options={{ 
          drawerIcon: ({ focused, color, size }) => (
            <Ionicons 
              name={focused ? "wallet" : "wallet-outline"} 
              size={size} 
              color={color} 
            />
          ),
        }} 
      />
    </Drawer.Navigator>
  );
}

const Tab = createBottomTabNavigator();

function TabGroup({ navigation }) {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ color, focused, size }) => {
          let iconName;
          if (route.name === "Inicio") {
            iconName = focused ? "home" : "home-outline";
          } else if (route.name === "Notificación") {
            iconName = focused ? "notifications" : "notifications-outline";
          } else if (route.name === "Configuración") {
            iconName = focused ? "settings" : "settings-sharp";
          }
          return <Ionicons name={iconName} color={color} size={size} />;
        },
        tabBarActiveTintColor: "#91f2b3",
        tabBarInactiveTintColor: "gray",
      })}>
      <Tab.Screen
        name="Inicio"
        component={TopTabGroup}
        options={{
          headerLeft: () => (
            <Pressable onPress={() => navigation.openDrawer()}>
              <Image source={require("./assets/BrayanRe.png")} style={{ width: 40, height: 40, borderRadius: 100, marginLeft: 15 }} />
            </Pressable>
          ),
        }}
      />
      <Tab.Screen name="Notificación" component={Notifications} />
      <Tab.Screen name="Configuración" component={Settings} />
    </Tab.Navigator>
  );
}

export default function Navigation() {
  const currentTheme = useColorScheme();
  return (
    <NavigationContainer theme={currentTheme === "dark" ? DarkTheme : DefaultTheme}>
      <DrawerGroup />
    </NavigationContainer>
  );
}
