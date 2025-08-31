import { StyleSheet, TextInput, View } from "react-native";
import { theme } from "../theme.js";
import { useState } from "react";

export function InputTextField() {
  const [id, setId] = useState('');
  const [price, setPrice] = useState('');
  console.log(id,price);
  return (
    <View>
      <TextInput
        placeholder="Product Id"
        value={id}
        onChangeText={setId}
        style={styles.textInput}
      />
      <TextInput
        placeholder="Product Price"
        value={price}
        onChangeText={setPrice}
        keyboardType="numeric"  // 👈 ensures number pad for price
        style={styles.textInput}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  textInput: {
    borderWidth: 1,
    borderColor: theme.colorCelurian || "#ccc",
    padding: 12,
    marginVertical: 8,
    borderRadius: 8,
    fontSize: 16,
    backgroundColor: "#fff",
    borderWidth: 1,
    borderColor: "#ccc",
    padding: 10,
    marginVertical: 10,
  },
  textInputStyles: {
    borderWidth: 1,
    borderColor: "#ccc",
    padding: 10,
    marginVertical: 10,
  }
});
