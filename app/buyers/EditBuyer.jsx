import { View, Text, TextInput, Button, StyleSheet } from "react-native";
import { useLocalSearchParams, useRouter } from "expo-router";
import { useEffect, useState } from "react";
import { appKey } from "../../utils/key";
// Input component for dynamically editing product details
import { InputTextField } from "../../components/inputTextField";
import { getStorageValues, setStorageData } from "../../utils/storage";

export default function EditBuyer() {
  // Get the buyer ID from route parameters
  const { id } = useLocalSearchParams();
  const router = useRouter();

  // Local state for buyer name
  const [buyerName, setBuyerName] = useState("");

  // Local state for product list of the current buyer
  const [products, setProducts] = useState([]);

  // Local state representing the full buyers database loaded from storage
  const [db, setDb] = useState([]);

  // -------------------------------
  // Load the buyers DB from AsyncStorage when component mounts
  // -------------------------------
  useEffect(() => {
    const fetchDb = async () => {
      // Try to get saved buyers from AsyncStorage
      const udb = await getStorageValues(appKey) || []; // if nothing stored, default to empty array
      setDb(udb); // update local DB state
    };
    fetchDb();
  }, []); // empty dependency → run only once when component mounts

  // -------------------------------
  // Extract the specific buyer's data once DB is loaded or when ID changes
  // -------------------------------
  useEffect(() => {
    if (db.length === 0) return; // if DB is empty, nothing to load
    const existing = db.find(b => b.id == id); // find the buyer by ID
    if (existing) {
      setBuyerName(existing.name);       // set buyer name in state
      setProducts(existing.products);    // set products array in state
    }
  }, [db, id]); // run when DB changes or route ID changes

  // -------------------------------
  // Update a specific product in the products array
  // -------------------------------
  const updateProduct = (index, newData) => {
    const updated = [...products];    // copy current products array
    updated[index] = newData;         // replace product at specific index
    setProducts(updated);             // update state → triggers re-render
  };

  // -------------------------------
  // Save the edited buyer back to storage
  // -------------------------------
  const handleSave = async () => {
    const updatedBuyer = { id: Number(id), name: buyerName, products }; // new buyer object
    // Update the buyer in the local DB array
    const updatedDb = db.map(b => b.id === Number(id) ? updatedBuyer : b);
    setDb(updatedDb); // update local state for immediate UI reflection
    console.log('added 1'); // debug log
    await setStorageData(appKey, updatedDb); // persist updated DB to AsyncStorage
    console.log('added 2'); // debug log to ensure storage is done

    // Navigate back to the buyers list screen
    router.push('/buyers'); // or router.back() if you prefer
  };

  // -------------------------------
  // Render section
  // -------------------------------
  return (
    <View style={{ flex: 1, padding: 20 }}>
      <Text>Edit Buyer</Text>

      {/* Buyer name input */}
      <TextInput
        placeholder="Enter buyer name"
        value={buyerName}
        onChangeText={setBuyerName}
        style={styles.textInputStyles}
      />

      {/* Dynamic product input fields */}
      {products.map((_, index) => (
        <InputTextField
          key={index}                  // unique key for React rendering
          product={products[index]}    // pass the product data
          index={index}                // pass index for update reference
          onChangeData={(data, i) => updateProduct(i, data)} // callback for updating product
        />
      ))}

      {/* Save changes button */}
      <View style={{ marginTop: 20 }}>
        <Button title="Save Changes" onPress={handleSave} />
      </View>
    </View>
  );
}

// -------------------------------
// Styles
// -------------------------------
const styles = StyleSheet.create({
  textInputStyles: {
    borderWidth: 1,
    borderColor: "#ccc",
    padding: 10,
    marginVertical: 10,
  },
});
