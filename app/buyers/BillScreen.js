import { View, Text, StyleSheet, FlatList } from "react-native";
import { useLocalSearchParams } from "expo-router";

export default function BillScreen() {
  const { buyer, billItems, grandTotal } = useLocalSearchParams();

  // ✅ Parse safely
  const buyerObj = buyer ? JSON.parse(buyer) : {};
  const items = billItems ? JSON.parse(billItems) : [];
  const gTotal = grandTotal ? Number(grandTotal) : 0;
    console.log(buyer);
  return (
    <View style={styles.container}>
      <Text style={styles.heading}>🧾 Invoice / Bill</Text>

      {/* Buyer Info */}
      <View style={styles.section}>
        <Text style={styles.label}>Buyer:{buyerObj.name}</Text>
      </View>

      {/* Table Header */}
      <View style={styles.headerRow}>
        <Text style={[styles.headerCell, { flex: 0.5 }]}>#</Text>
        <Text style={[styles.headerCell, { flex: 2 }]}>Product ID</Text>
        <Text style={[styles.headerCell, { flex: 1 }]}>Price</Text>
        <Text style={[styles.headerCell, { flex: 1 }]}>Qty</Text>
        <Text style={[styles.headerCell, { flex: 1 }]}>Total</Text>
      </View>

      {/* Products */}
      <FlatList
        data={items}
        keyExtractor={(item,index) => item.id.toString()}
        renderItem={({ item,index }) => (
          <View style={styles.row}>
            <Text style={[styles.cell, { flex: 0.5 }]}>{index + 1}</Text>
            <Text style={[styles.cell, { flex: 2 }]}>{item.id}</Text>
            <Text style={[styles.cell, { flex: 1 }]}>{item.price}</Text>
            <Text style={[styles.cell, { flex: 1 }]}>{item.quantity}</Text>
            <Text style={[styles.cell, { flex: 1 }]}>{item.total}</Text>
          </View>
        )}
      />

      {/* Grand Total */}
      <View style={styles.totalRow}>
        <Text style={styles.totalLabel}>Grand Total:</Text>
        <Text style={styles.totalValue}>{gTotal}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#fff", padding: 20 },
  heading: { fontSize: 20, fontWeight: "bold", textAlign: "center", marginBottom: 16 },
  section: { marginBottom: 12 },
  label: { fontWeight: "bold", fontSize: 16 },
  value: { fontSize: 16, marginTop: 2 },
  headerRow: {
    flexDirection: "row",
    borderBottomWidth: 1,
    borderBottomColor: "#000",
    paddingBottom: 6,
    marginBottom: 6,
  },
  headerCell: { fontWeight: "bold", textAlign: "center" },
  row: { flexDirection: "row", marginBottom: 4 },
  cell: { textAlign: "center" },
  totalRow: {
    marginTop: 16,
    borderTopWidth: 1,
    borderTopColor: "#000",
    paddingTop: 8,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  totalLabel: { fontWeight: "bold", fontSize: 18 },
  totalValue: { fontWeight: "bold", fontSize: 18 },
});
