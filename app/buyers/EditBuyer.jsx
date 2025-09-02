import { View, Text, TextInput, Button, StyleSheet } from "react-native";
import { useLocalSearchParams, useRouter } from "expo-router";
import { useEffect, useState } from "react";
import { appKey } from "../../utils/key";
//import { db } from "./add"; // shared db array
import { InputTextField } from "../../components/inputTextField";
import { getStorageValues,setStorageData } from "../../utils/storage";

export default function EditBuyer() {
  const { id } = useLocalSearchParams(); // read buyer id from route
  const router = useRouter();
  
  const [buyerName, setBuyerName] = useState("");
  const [products, setProducts] = useState([]);
  const [db,setDb]=useState([]);
  // Load existing buyer data
useEffect(() => {
  const fetchDb = async () => {
    const udb = await getStorageValues(appKey) || [];
    setDb(udb);
  };
  fetchDb();
}, []);

useEffect(() => {
  if (db.length === 0) return;
  const existing = db.find(b => b.id == id);
  if (existing) {
    setBuyerName(existing.name);
    setProducts(existing.products);
  }
}, [db, id]);

  const updateProduct = (index, newData) => {
    const updated = [...products];
    updated[index] = newData;
    setProducts(updated);

  };

  const handleSave = async () => {
  const updatedBuyer = { id: Number(id), name: buyerName, products };
  const updatedDb = db.map(b => b.id === Number(id) ? updatedBuyer : b);
  setDb(updatedDb); // update local state
  console.log('added 1')
  await setStorageData(appKey, updatedDb); 
  console.log('added 2')// save to AsyncStorage
  router.push('/buyers'); // navigate back
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
      {products.map((_, index) => (
        
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
