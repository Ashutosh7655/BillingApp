import { useEffect, useState } from "react";
import { StyleSheet, Text, View, TextInput, TouchableOpacity, FlatList } from "react-native";
import { Dropdown } from "react-native-element-dropdown";
import { theme } from "../theme";
import { getStorageValues } from "../utils/storage";
import { appKey } from "../utils/key";
import { useRouter } from "expo-router";
export default function App() {
  const router=useRouter();
  const [selectedBuyer, setSelectedBuyer] = useState("");
  const [db, setDb] = useState([]);
  const [selectedProducts, setSelectedProducts] = useState({}); // store checkbox & quantity

  // Load buyers
  useEffect(() => {
    const loadDb = async () => {
      const udb = await getStorageValues(appKey);
      setDb(udb || []);
    };
    loadDb();
  }, [db]);

  const buyerDetails = db.find((b) => b.id == selectedBuyer);
  const products = buyerDetails?.products || [];

  const toggleProductSelection = (id) => {
    setSelectedProducts((prev) => {
      const current = prev[id] || { selected: false, quantity: "" };
      return { ...prev, [id]: { ...current, selected: !current.selected } };
    });
  };

  const handleQuantityChange = (id, value) => {
    setSelectedProducts((prev) => ({
      ...prev,
      [id]: { ...(prev[id] || {}), quantity: value, selected: true },
    }));
  };

  const getTotal = (id, price) => {
    const qty = Number(selectedProducts[id]?.quantity || 0);
    return qty * price;
  };

 const handleGenerateBill = () => {
  const billItems = products
    .filter((item) => selectedProducts[item.id]?.selected)
    .map((item) => ({
      id: item.id,
      price: item.price,
      quantity: Number(selectedProducts[item.id].quantity),
      total: getTotal(item.id, item.price),
    }));

  const grandTotal = billItems.reduce((sum, i) => sum + i.total, 0);

  router.push({
    pathname: "./buyers/BillScreen",
    params: {
      buyer: JSON.stringify(buyerDetails),   // ✅ convert to string
      billItems: JSON.stringify(billItems),  // ✅ convert to string
      grandTotal: String(grandTotal),        // ✅ also send as string
    },
  });
  
};

  const dropdowndb = db.map((item) => ({ label: item.name, value: item.id }));

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Select Buyer:</Text>

      <Dropdown
        data={dropdowndb}
        labelField="label"
        valueField="value"
        placeholder="Select a buyer"
        value={selectedBuyer}
        onChange={(item) => setSelectedBuyer(item.value)}
        style={styles.dropdown}
      />

      {/* Table header */}
      <View style={styles.headerRow}>
        <Text style={[styles.headerCell, { flex: 0.5 }]}></Text>
        <Text style={[styles.headerCell, { flex: 2 }]}>Product</Text>
        <Text style={[styles.headerCell, { flex: 1 }]}>Qty</Text>
        <Text style={[styles.headerCell, { flex: 1 }]}>Price</Text>
        <Text style={[styles.headerCell, { flex: 1 }]}>Total</Text>
      </View>

      <FlatList
        data={products}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => {
          const selected = selectedProducts[item.id]?.selected || false;
          return (
            <View style={[styles.row, !selected && styles.uncheckedRow]}>
              <TouchableOpacity
                onPress={() => toggleProductSelection(item.id)}
                style={styles.checkbox(selected)}
              />
              <Text style={[styles.cell, { flex: 2 }]}>{item.id}</Text>
              <TextInput
                value={selectedProducts[item.id]?.quantity || ""}
                onChangeText={(text) => handleQuantityChange(item.id, text)}
                style={[styles.cell, styles.qtyInput, { flex: 1 }]}
                keyboardType="numeric"
                editable={selected}
              />
              <Text style={[styles.cell, { flex: 1 }]}>{item.price}</Text>
              <Text style={[styles.cell, { flex: 1 }]}>{getTotal(item.id, item.price)}</Text>
            </View>
          );
        }}
      />

      <TouchableOpacity style={styles.generateBtn} onPress={handleGenerateBill} activeOpacity={0.8}>
        <Text style={{ color: "#fff", fontWeight: "bold" }}>Generate Bill</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#fff",
  },
  title: { fontSize: 18, marginBottom: 8 },
  dropdown: { borderWidth: 1, borderColor: "gray", borderRadius: 8, padding: 8, marginBottom: 16 },
  headerRow: { flexDirection: "row", marginBottom: 4, alignItems: "center" },
  headerCell: { textAlign: "center", fontWeight: "bold" },
  row: { flexDirection: "row", alignItems: "center", marginBottom: 8 },
  uncheckedRow: {
    opacity: 0.4, // makes unchecked row lighter
  },
  cell: { textAlign: "center", paddingHorizontal: 4 },
  qtyInput: {
    borderWidth: 1,
    borderColor: "gray",
    borderRadius: 5,
    paddingVertical: 2,
    paddingHorizontal: 4,
    textAlign: "center",
  },
  checkbox: (selected) => ({
    width: 20,
    height: 20,
    borderWidth: 1,
    borderColor: "#000",
    backgroundColor: selected ? theme.colorCelurian : "#fff",
    marginRight: 6,
  }),
  generateBtn: {
    backgroundColor: theme.colorCelurian,
    padding: 14,
    borderRadius: 10,
    alignItems: "center",
    marginTop: 16,
  },
});
