import { View, Text, TextInput, Button, StyleSheet } from "react-native";
import { useRouter } from "expo-router";
import { useState } from "react";
import { InputTextField } from "../../components/inputTextField";

export default function AddBuyer() {
  const router = useRouter();
  const [name, setName] = useState("");
  const [products, setProducts] = useState([]); // store product fields

  const handleAddProduct = () => {
    setProducts([...products, {}]); // add empty product object
  };

  const handleSave = () => {
    console.log("New Buyer:", name);
    console.log("Products:", products); // here you’d map product input values
    router.back();
  };

  return (
    <View style={{ flex: 1, padding: 20 }}>
      <Text>Add Buyer Name</Text>
      <TextInput
        placeholder="Enter buyer name"
        value={name}
        onChangeText={setName}
        style={styles.textInputStyles}
      />
      {products.map((_, index) => (
        <InputTextField key={index} />
      ))}

      <Button title="Add New Product" onPress={handleAddProduct} />

      <View style={{ marginTop: 20 }}>
        <Button title="Save" onPress={handleSave} />
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
