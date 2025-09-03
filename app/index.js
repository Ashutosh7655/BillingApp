import { useEffect, useState } from "react";
import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import { Dropdown } from "react-native-element-dropdown";
import { AddProduct } from "../components/AddProduct"; // Component for dynamic product input
import { theme } from "../theme"; // Custom theme colors
import { getStorageValues } from "../utils/storage"; // AsyncStorage helper
import { appKey } from "../utils/key"; // Key for AsyncStorage

/**
 * Main App Component for creating a new bill
 * ------------------------------------------------
 * Features:
 * 1. Select a buyer from a dropdown populated from local storage.
 * 2. Dynamically add product input fields.
 * 3. Button to "Generate Bill" (functionality to implement).
 */
export default function App() {
  // Selected buyer ID
  const [selectedBuyer, setSelectedBuyer] = useState("");

  // Array of product objects. Each object represents a product entered by user.
  const [products, setProducts] = useState([]);

  // Array of all buyers fetched from local storage
  const [db, setDb] = useState([]);

  // Load buyers from AsyncStorage on mount
  useEffect(() => {
    const loadDb = async () => {
      const udb = await getStorageValues(appKey); // fetch stored buyers
      setDb(udb || []); // set to empty array if null
    };
    loadDb();
  }, []);

  // Map buyers to the format needed by Dropdown component
  const dropdowndb = db.map((item) => ({
    label: item.name, // Displayed in the dropdown
    value: item.id, // Stored as the value
  }));

  /**
   * Add an empty product object to products state.
   * This triggers rendering a new AddProduct component for user input.
   */
  const handleAddProduct = () => {
    setProducts([...products, {}]);
  };
  const buyerDetails = db.find((item) => item.id == selectedBuyer);
  return (
    <View style={styles.container}>
      <Text>Select Buyer:</Text>

      {/* Buyer selection dropdown */}
      <Dropdown
        data={dropdowndb}
        labelField="label"
        valueField="value"
        placeholder="Select a buyer"
        value={selectedBuyer}
        onChange={(item) => setSelectedBuyer(item.value)}
        style={styles.dropdown}
      />

      {/* Dynamic product fields */}
      {products.map((_, index) => (
        <AddProduct key={index}
        buyerDetails={buyerDetails} />
      ))}

      {/* Button to add more product input fields */}
      <TouchableOpacity
        onPress={handleAddProduct}
        style={{
          backgroundColor: theme.colorCelurian,
          paddingVertical: 12,
          paddingHorizontal: 24,
          borderRadius: 10,
          marginTop: 10,
        }}
        activeOpacity={0.8}
      >
        <Text style={{ color: theme.colorWhite }}>Add Product</Text>
      </TouchableOpacity>

      {/* Floating "Generate Bill" button */}
      <TouchableOpacity style={styles.floatingBtn} activeOpacity={0.8}>
        <Text style={{color: theme.colorWhite} }>Generate Bill</Text>
      </TouchableOpacity>
    </View>
  );
}

/** Styles for the App */

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    paddingTop: 40,
  },
  dropdown: {
    width: 200,
    borderWidth: 1,
    borderColor: "gray",
    borderRadius: 8,
    padding: 8,
    marginTop: 10,
  },
  
floatingBtn: {
  position: "absolute",
  bottom: 80,
  alignSelf: "center", // centers the button itself horizontally
  backgroundColor: theme.colorCelurian,
  paddingVertical: 12,
  paddingHorizontal: 24,
  borderRadius: 30,
}
 
});
