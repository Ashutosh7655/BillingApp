import { StyleSheet, TextInput, View, TouchableOpacity } from "react-native";
import { theme } from "../theme";
import { useState, useEffect } from "react";
import AntDesign from "@expo/vector-icons/AntDesign";

export function InputTextField({ product, index, onChangeData, onDelete }) {
  const [id, setId] = useState(product?.id || '');
  const [price, setPrice] = useState(product?.price || '');

  // Send updated data to parent whenever id or price changes
  useEffect(() => {
    onChangeData({ id, price }, index);
  }, [id, price]);

  return (
    <View style={styles.row}>
      <TextInput
        placeholder="Product Name"
        value={id}
        onChangeText={setId}
        
        placeholderTextColor="#000"
        style={styles.textInput}
      />
      <TextInput
        placeholder="Product Price"
        value={price}
        onChangeText={setPrice}
        keyboardType="numeric"
        style={styles.textInput}
        
        placeholderTextColor="#000"
      />
      {onDelete && (
        <TouchableOpacity onPress={onDelete} style={styles.deleteBtn}>
          <AntDesign name="closecircle" size={24} color={theme.colorRed} />
        </TouchableOpacity>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 6,
  },
  textInput: {
    flex: 1,
    borderWidth: 1,
    borderColor: "#ccc",
    padding: 10,
    borderRadius: 8,
    marginHorizontal: 4,
  },
  deleteBtn: {
    marginLeft: 8,
  },
});
