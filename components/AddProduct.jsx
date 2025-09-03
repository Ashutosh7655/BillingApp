import { StyleSheet, Text, TextInput, View, TouchableOpacity, Alert } from "react-native";
import AntDesign from "@expo/vector-icons/AntDesign";
import { useEffect, useState } from "react";
import { theme } from "../theme";

export function AddProduct({ buyerDetails,onDelete }) {
  console.log(buyerDetails);
  const [id, setId] = useState("");
  const [quantity, setQuantity] = useState("");
  const [pricePerUnit, setPricePerUnit] = useState(0);

  const total = Number(quantity || 0) * pricePerUnit;

  // Update price per unit whenever product id changes
 useEffect(() => {
  if (!buyerDetails || !buyerDetails.products) return;
  const product = buyerDetails.products.find(item => item.id == id);
  setPricePerUnit(product ? Number(product.price) : 0);
}, [id]);

  const handleDelete = () => {
    Alert.alert("This will delete the product?", "", [
      { text: "Yes", onPress: onDelete, style: "destructive" },
      { text: "No", style: "cancel" }
    ]);
  };

  return (
    <View style={styles.row}>
      <TextInput
        placeholder="Product Id"
        value={id}
        onChangeText={setId}
        style={styles.textInput}
      />
      <Text style={styles.operator}>-</Text>
      <TextInput
        placeholder="Quantity"
        value={quantity}
        onChangeText={setQuantity}
        keyboardType="numeric"
        style={styles.textInput}
      />
      <Text style={styles.operator}>x</Text>
      <Text style={styles.price}>{pricePerUnit}</Text>
      <Text style={styles.operator}>=</Text>
      <Text style={styles.total}>{total}</Text>
      <TouchableOpacity onPress={handleDelete} activeOpacity={0.8} style={styles.deleteBtn}>
        <AntDesign name="closecircle" size={24} color={theme.colorRed} />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 4,
    flexWrap: "wrap" // ensures items don’t overflow
  },
  textInput: {
    borderWidth: 1,
    borderColor: "#ccc",
    padding: 8,
    borderRadius: 6,
    fontSize: 16,
    backgroundColor: "#fff",
    minWidth: 60,
    textAlign: "center",
    marginHorizontal: 2
  },
  operator: {
    marginHorizontal: 4,
    fontSize: 16,
    fontWeight: "bold"
  },
  price: {
    minWidth: 40,
    textAlign: "center",
    marginHorizontal: 2
  },
  total: {
    minWidth: 50,
    textAlign: "center",
    marginHorizontal: 2,
    fontWeight: "bold"
  },
  deleteBtn: {
    marginLeft: 4
  }
});
