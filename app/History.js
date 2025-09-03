import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, FlatList, TouchableOpacity, Alert } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { AntDesign } from "@expo/vector-icons";
import { theme } from "../theme";

export default function HistoryScreen() {
  const [history, setHistory] = useState([]);

  const loadHistory = async () => {
    const data = (await AsyncStorage.getItem("billHistory")) || "[]";
    setHistory(JSON.parse(data));
  };

  const deleteBill = async (id) => {
    const updated = history.filter((h) => h.id !== id);
    await AsyncStorage.setItem("billHistory", JSON.stringify(updated));
    setHistory(updated);
  };

  useEffect(() => {
    loadHistory();
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Bill History</Text>
      <FlatList
        data={history}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.row}>
            <View style={{ flex: 1 }}>
              <Text style={styles.text}>Buyer: {item.buyerName}</Text>
              <Text style={styles.text}>Bill No: {item.billNo}</Text>
              <Text style={styles.text}>Total: {item.grandTotal}</Text>
              <Text style={styles.text}>Date: {item.date}</Text>
            </View>
            <TouchableOpacity onPress={() => deleteBill(item.id)}>
              <AntDesign name="closecircle" size={24} color={theme.colorRed} />
            </TouchableOpacity>
          </View>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: "#fff" },
  title: { fontSize: 20, fontWeight: "bold", marginBottom: 10 },
  row: { flexDirection: "row", justifyContent: "space-between", alignItems: "center", backgroundColor: "#f2f2f2", padding: 10, marginBottom: 8, borderRadius: 8 },
  text: { fontSize: 14 },
});
