import { View, Text, TextInput, Button, StyleSheet, Alert,TouchableOpacity } from "react-native";
import { useLocalSearchParams, useRouter } from "expo-router";
import { useEffect, useState } from "react";
import { appKey } from "../../utils/key";
import { InputTextField } from "../../components/inputTextField";
import { getStorageValues, setStorageData } from "../../utils/storage";
import AntDesign from "@expo/vector-icons/AntDesign";
export default function EditBuyer() {
  const { id } = useLocalSearchParams();
  const router = useRouter();

  const [buyerName, setBuyerName] = useState("");
  const [products, setProducts] = useState([]);
  const [db, setDb] = useState([]);

  // Load DB
  useEffect(() => {
    const fetchDb = async () => {
      const udb = (await getStorageValues(appKey)) || [];
      setDb(udb);
    };
    fetchDb();
  }, []);

  // Load this buyer’s data
  useEffect(() => {
    if (db.length === 0) return;
    const existing = db.find((b) => b.id == id);
    if (existing) {
      setBuyerName(existing.name);
      setProducts(existing.products || []);
    }
  }, [db, id]);

  // Update product
  const updateProduct = (index, newData) => {
    const updated = [...products];
    updated[index] = newData;
    setProducts(updated);
  };

  // Delete product/input field
  const deleteProduct = (index) => {
    Alert.alert("Delete Product?", "", [
      {
        text: "Yes",
        style: "destructive",
        onPress: () => {
          const updated = products.filter((_, i) => i !== index);
          setProducts(updated);
        },
      },
      { text: "No", style: "cancel" },
    ]);
  };

  // Add new product
  const handleAddProduct = () => {
    setProducts([...products, { name: "", price: "" }]);
  };

  // Save to DB
  const handleSave = async () => {
    const updatedBuyer = { id: Number(id), name: buyerName, products };
    const updatedDb = db.map((b) =>
      b.id === Number(id) ? updatedBuyer : b
    );
    setDb(updatedDb);
    await setStorageData(appKey, updatedDb);
    router.push("/buyers");
  };

  return (
    <View style={{ flex: 1, padding: 20 }}>
      <Text>Edit Buyer</Text>

      {/* Buyer name */}
      <TextInput
        placeholder="Enter buyer name"
        value={buyerName}
        onChangeText={setBuyerName}
        style={styles.textInputStyles}
      />

      {/* Product fields */}
      {products.map((product, index) => (
        <InputTextField
          key={index}
          product={product}
          index={index}
          onChangeData={(data, i) => updateProduct(i, data)}
          onDelete={() => deleteProduct(index)}
        />
      ))}

      {/* Add Product */}
      <View style={{ marginTop: 20 }}>
      <TouchableOpacity
          style={styles.button}
          onPress={handleAddProduct} // Navigate to Add Buyer screen
        >
          {/* Icon + text inside button */}<AntDesign name="pluscircleo" size={24} color="white" />
          <Text style={styles.buttonText}>Add Product</Text>
        </TouchableOpacity>
      </View>

      {/* Save */}
      <View style={{ marginTop: 20 }}>
        <TouchableOpacity
          style={styles.button}
          onPress={handleSave} // Navigate to Add Buyer screen
        >
          {/* Icon + text inside button */}<AntDesign name="save" size={24} color="white" />
          <Text style={styles.buttonText}>Save Changes</Text>
        </TouchableOpacity>
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
  
  button: {
    flexDirection: 'row', // icon + text side by side
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#007bff',
    padding: 12,
    borderRadius: 8,
  },
  buttonText: {
    color: 'white',
    marginLeft: 8, // spacing between icon and text
    fontSize: 16,
  },
});
