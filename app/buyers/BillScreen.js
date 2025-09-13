import React, { useRef, useState, useEffect } from "react";
import { View, Text, StyleSheet, TouchableOpacity, FlatList, Alert } from "react-native";
import { useLocalSearchParams, useRouter } from "expo-router";
import { captureRef } from "react-native-view-shot";
import * as Sharing from "expo-sharing";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { MaterialIcons } from "@expo/vector-icons";
import { theme } from "../../theme";

export default function BillScreen() {
  const { buyer, billItems, grandTotal } = useLocalSearchParams();
  const router = useRouter();
  const viewRef = useRef();

  const parsedBuyer = buyer ? JSON.parse(buyer) : null;
  const parsedItems = billItems ? JSON.parse(billItems) : [];

  const [history, setHistory] = useState([]);

  // 🔹 Load history on mount
  useEffect(() => {
    const loadHistory = async () => {
      const data = (await AsyncStorage.getItem("billHistory")) || "[]";
      setHistory(JSON.parse(data));
    };
    loadHistory();
  }, []);

  const handleShare = async () => {
    try {
      // Capture bill as image
      const uri = await captureRef(viewRef, { format: "png", quality: 1 });
      if (!(await Sharing.isAvailableAsync())) {
        Alert.alert("Sharing not available on this device");
        return;
      }

      // ✅ Filter bills only for this buyer
      const buyerBills = history.filter((b) => b.buyerId === parsedBuyer?.id);

      // ✅ Next sequential bill number
      const nextBillNo =
        buyerBills.length > 0
          ? Math.max(...buyerBills.map((b) => Number(b.billNo))) + 1
          : 1;

      const newBill = {
        id: Date.now().toString(),
        buyerId: parsedBuyer?.id,
        buyerName: parsedBuyer?.name,
        billNo: nextBillNo,
        grandTotal,
        date: new Date().toLocaleString(),
      };

      // ✅ Save and update state (forces re-render)
      const updatedHistory = [newBill, ...history];
      await AsyncStorage.setItem("billHistory", JSON.stringify(updatedHistory));
      setHistory(updatedHistory); // 🔹 triggers re-render

      // Share via WhatsApp
      await Sharing.shareAsync(uri, { dialogTitle: "Share Bill via WhatsApp" });
    } catch (error) {
      console.error("Error sharing:", error);
    }
  };

  return (
    <View style={styles.container}>
      {/* Header with History button */}
      <View style={styles.header}>
        <Text style={styles.title}>Bill</Text>
        <TouchableOpacity onPress={() => router.push("../History")}>
          <MaterialIcons name="history" size={24} color={theme.colorCelurian} />
        </TouchableOpacity>
      </View>

      <View ref={viewRef} collapsable={false} style={styles.billContainer}>
        <Text style={styles.buyerText}>
          Buyer: {parsedBuyer?.name} {"\n"}
          Bill No: {history.filter((b) => b.buyerId === parsedBuyer?.id).length + 1}
        </Text>

        {/* Table header */}
        <View style={styles.headerRow}>
          <Text style={[styles.headerCell, { flex: 0.5 }]}>#</Text>
          <Text style={[styles.headerCell, { flex: 2 }]}>Product</Text>
          <Text style={[styles.headerCell, { flex: 1 }]}>Price</Text>
          <Text style={[styles.headerCell, { flex: 1 }]}>Qty</Text>
          <Text style={[styles.headerCell, { flex: 1 }]}>Total</Text>
        </View>

        <FlatList
          data={parsedItems}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({ item, index }) => (
            <View style={styles.row}>
              <Text style={[styles.cell, { flex: 0.5 }]}>{index + 1}</Text>
              <Text style={[styles.cell, { flex: 2 }]}>{item.id}</Text>
              <Text style={[styles.cell, { flex: 1 }]}>{item.price}</Text>
              <Text style={[styles.cell, { flex: 1 }]}>{item.quantity}</Text>
              <Text style={[styles.cell, { flex: 1 }]}>{item.total}</Text>
            </View>
          )}
        />

        <Text style={styles.totalText}>Grand Total: {grandTotal}</Text>
      </View>

      <TouchableOpacity style={styles.shareBtn} onPress={handleShare}>
        <Text style={{ color: "#fff", fontWeight: "bold" }}>Share Bill</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: "#fff" },
  header: { flexDirection: "row", justifyContent: "space-between", alignItems: "center", marginBottom: 10 },
  title: { fontSize: 20, fontWeight: "bold" },
  billContainer: { backgroundColor: "#f9f9f9", padding: 10, borderRadius: 8 },
  buyerText: { fontSize: 16, marginBottom: 10 },
  headerRow: { flexDirection: "row", marginBottom: 4 },
  headerCell: { fontWeight: "bold", textAlign: "center" },
  row: { flexDirection: "row", marginBottom: 6 },
  cell: { textAlign: "center" },
  totalText: { fontWeight: "bold", fontSize: 16, marginTop: 10, textAlign: "right" },
  shareBtn: { marginTop: 16, backgroundColor: theme.colorCelurian, padding: 14, borderRadius: 10, alignItems: "center" },
});
