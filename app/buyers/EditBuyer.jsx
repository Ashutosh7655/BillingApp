import { View, Text, TextInput, Button, StyleSheet } from "react-native";
import { useLocalSearchParams, useRouter } from "expo-router";
import { useEffect, useState } from "react";
import { db } from "./add"; // shared db array
import { InputTextField } from "../../components/inputTextField";

export default function EditBuyer() {
  const { id } = useLocalSearchParams(); // read buyer id from route
  const router = useRouter();

  const [buyerName, setBuyerName] = useState("");
  const [products, setProducts] = useState([]);

  // Load existing buyer data
  useEffect(() => {
    const existing = db.find(b => b.id == id);
    if (existing) {
      setBuyerName(existing.name);
      setProducts(existing.products);
    }
  }, [id]);

  const updateProduct = (index, newData) => {
    const updated = [...products];
    updated[index] = newData;
    setProducts(updated);
  };

  const handleSave = () => {
    const updatedBuyer = { id: Number(id), name: buyerName, products };
    const index = db.findIndex(b => b.id == id);
    if (index >= 0) {
      db[index] = updatedBuyer;
    }
    router.back(); // go back to list
  };

  return (
    <View style={{ flex: 1, padding: 20 }}>
      <Text>Edit Buyer</Text>
      <TextInput
        placeholder="Enter buyer name"
        value={buyerName}
        onChangeText={setBuyerName}
        style={styles.textInputStyles}
      />
      {products.map((product, index) => (
        
        <InputTextField
          key={index}
          product={products[index]}
          index={index}
          onChangeData={(data, i) => updateProduct(i, data)}
        />
      ))}

      <View style={{ marginTop: 20 }}>
        <Button title="Save Changes" onPress={handleSave} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  textInputStyles: {
    borderWidth: 1,
    borderColor: "#ccc",
    padding: 10,
    marginVertical: 10,
  },
});
