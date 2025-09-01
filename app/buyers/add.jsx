import { View, Text, TextInput, Button, StyleSheet } from "react-native";
import { useRouter } from "expo-router";
import { useState,useEffect } from "react";
import { InputTextField } from "../../components/inputTextField";
import { appKey } from "../../utils/key";
import { getStorageValues, setStorageData } from "../../utils/storage";
//export const db = [];
export default function AddBuyer() {
  const router = useRouter();
  const [buyerName, setBuyerName] = useState("");//BuyerHook
  const [products, setProducts] = useState([]); // store product fields
  const [buyer,setBuyer]=useState([]);

  useEffect(() => {
  const loadBuyers = async () => {
    const data = await getStorageValues(appKey);
    if (data) {
      setBuyer(data);   // already saved buyers
    } else {
      setBuyer([]);     // nothing saved yet → empty list
    }
  };
  loadBuyers();
}, []);

  const handleAddProduct = () => {
    setProducts([...products, { id: '', price: '' }]); // add empty product object
  };

  const handleSave = async() => {
    //console.log("New Buyer:", buyerName);
    //console.log("Products:", products);
    
    const newBuyer = { name: buyerName, products, id: Date.now() };
    const updated = [...buyer, newBuyer];      // merge with current state
    await setStorageData(appKey, updated);   // save to AsyncStorage
    setBuyer(updated);                         // update local state
    router.back();
    
  };
  const updateProduct = (index, newData) => {
    const updated = [...products];
    updated[index] = newData;
    setProducts(updated);
  };


  return (
    <View style={{ flex: 1, padding: 20 }}>
      <Text>Add Buyer Name</Text>
      <TextInput
        placeholder="Enter buyer name"
        value={buyerName}
        onChangeText={setBuyerName}
        style={styles.textInputStyles}
      />
      {products.map((_, index) => (
        <InputTextField
          product={products[index]}
          index={index}
          onChangeData={(data, i) => updateProduct(i, data)}
          key={index}
        />
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
