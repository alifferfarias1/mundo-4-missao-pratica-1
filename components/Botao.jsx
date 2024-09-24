import React from 'react';
import { StyleSheet, Text, Pressable } from 'react-native';

const CustomButton = ({ title, onPress, color = "#404040" }) => {
  return (
    <Pressable 
      style={({ pressed }) => [
        styles.button, 
        { backgroundColor: pressed ? '#303030' : color }
      ]}
      onPress={onPress}
    >
      <Text style={styles.buttonText}>{title}</Text>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  button: {
    padding: 12,
    borderRadius: 12,
    marginBottom: 8,
    alignItems: "center",
  },
  buttonText: {
    color: "#FFF",
    fontSize: 16,
    fontWeight: "bold",
  },
});

export default CustomButton;
