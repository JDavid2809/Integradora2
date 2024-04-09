import React, { useRef, useEffect } from "react";
import { TouchableOpacity, StyleSheet, Animated } from "react-native";
import { Ionicons } from "@expo/vector-icons";


const FloatingActionButton = ({ onPress, iconColor = "black", buttonColor = "#91f2b3" }) => {
  const scaleAnim = useRef(new Animated.Value(1)).current;

  useEffect(() => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(scaleAnim, {
          toValue: 0.95,
          duration: 300,
          useNativeDriver: true,
        }),
        Animated.timing(scaleAnim, {
          toValue: 1,
          duration: 300,
          useNativeDriver: true,
        }),
      ]),
    ).start();
  }, []);

  const handlePressIn = () => {
    scaleAnim.stopAnimation();
    Animated.spring(scaleAnim, {
      toValue: 0.9,
      useNativeDriver: true,
    }).start();
  };

  const handlePressOut = () => {
    Animated.spring(scaleAnim, {
      toValue: 1,
      friction: 3,
      tension: 40,
      useNativeDriver: true,
    }).start();
  };

  return (
    <TouchableOpacity
      onPressIn={handlePressIn}
      onPressOut={handlePressOut}
      style={[styles.fab, { backgroundColor: buttonColor, transform: [{ scale: scaleAnim }] }]}
    >
      <Ionicons name="add" size={34} color={iconColor} />
    </TouchableOpacity>
  );
};

const fabSize = 48;
const fabPosition = 20;
const shadow = {
  shadowColor: "#000",
  shadowOffset: {
    width: 0,
    height: 2,
  },
  shadowOpacity: 0.25,
  shadowRadius: 3.84,
};

const styles = StyleSheet.create({
  fab: {
    position: "absolute",
    width: fabSize,
    height: fabSize,
    alignItems: "center",
    justifyContent: "center",
    right: fabPosition,
    bottom: fabPosition,
    borderRadius: 10, // Cambiar el valor de borderRadius para mantener las esquinas redondeadas
    elevation: 8, // Android elevation
    ...shadow, // iOS shadow
  },
});

export default FloatingActionButton;
