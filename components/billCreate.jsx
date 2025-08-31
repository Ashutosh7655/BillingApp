import { StyleSheet, Text, TextInput, View } from "react-native";

import { useState } from "react";

export default function App() {
  const [id, setId] = useState("");
  const [quantity, setQuantity] = useState("");

  const pricePerUnit = 15; 
  const total = Number(quantity || 0) * pricePerUnit;

  return (
    <View style={{flex :1, flexDirection: "row", alignItems: "center" ,justifyContent:"center"}}>
      <TextInput
        placeholder="Product Id"
        value={id}
        onChangeText={setId}
        style={styles.textInput}
      />
      <Text> - </Text>
      <TextInput
        placeholder="Quantity"
        value={quantity}
        onChangeText={setQuantity}
        keyboardType="numeric"
        style={styles.textInput}
      />
       <Text> x </Text>
      <Text> {pricePerUnit} </Text>
      <Text> = </Text>
      <Text>{total}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  textInput: {
    borderWidth: 1,
    borderColor:"#ccc",
    padding: 8,
    marginHorizontal: 4,
    borderRadius: 6,
    fontSize: 16,
    backgroundColor: "#fff",
    minWidth: 60,
    textAlign: "center",
  },
});
