import { View, Text, Alert, StyleSheet, TouchableOpacity, Button } from "react-native";
import AntDesign from "@expo/vector-icons/AntDesign";
import { theme } from "../../theme";
import { router, useLocalSearchParams } from "expo-router";
import { useEffect, useState } from "react";
import { getStorageValues, setStorageData } from "../../utils/storage";
import { appKey } from "../../utils/key";

export default function BuyerInfo() {
  const { id } = useLocalSearchParams();
  const [db, setDb] = useState([]);
  const [buyer, setBuyer] = useState(null);
  const [products, setProducts] = useState([]);

  // Load buyers from AsyncStorage
  useEffect(() => {
    const loadDb = async () => {
      const storedDb = (await getStorageValues(appKey)) || [];
      setDb(storedDb);
    };
    loadDb();
  }, []);

  // Set the current buyer and products once db is loaded
  useEffect(() => {
    if (!db.length) return;
    const currentBuyer = db.find((item) => item.id == id);
    setBuyer(currentBuyer);
    setProducts(currentBuyer ? currentBuyer.products : []);
  }, [db, id]);

  // Handle deletion of a product
  const handleDelete = (productId) => {
    Alert.alert(`This will delete the product ${productId}?`, "", [
      {
        text: "Yes",
        style: "destructive",
        onPress: async () => {
          const updatedProducts = products.filter((p) => p.id != productId);
          setProducts(updatedProducts);

          // Update buyer in db and save to AsyncStorage
          const updatedDb = db.map((b) =>
            b.id == id ? { ...b, products: updatedProducts } : b
          );
          setDb(updatedDb);
          await setStorageData(appKey, updatedDb);
        },
      },
      { text: "No", style: "cancel" },
    ]);
  };

  return (
    <View style={{ flex: 1, padding: 20, backgroundColor: theme.colorWhite }}>
      <Text style={{ fontSize: 24, fontWeight: "600", marginBottom: 16 }}>
        Products of {buyer ? buyer.name : "Unknown Buyer"}
      </Text>

      {products.length === 0 ? (
        <Text style={{ fontSize: 18, color: theme.colorGrey }}>
          No products found.
        </Text>
      ) : (
        products.map((product) => (
          <View style={styles.itemContainer} key={product.id}>
            <Text style={styles.itemText}>ID: {product.id}</Text>
            <Text style={styles.itemText}>Price: {product.price}</Text>
            <TouchableOpacity
              onPress={() => handleDelete(product.id)}
              activeOpacity={0.8}
            >
              <AntDesign name="closecircle" size={24} color={theme.colorRed} />
            </TouchableOpacity>
          </View>
        ))
      )}<TouchableOpacity
          style={styles.button}
          onPress={() =>router.push({ pathname: "/buyers/EditBuyer", params: { id } })} // Navigate to Add Buyer screen
        >
          {/* Icon + text inside button */}<AntDesign
            name="edit"
            size={24}
            color="Blue"/>
          <Text style={styles.buttonText}>Add Buyer</Text>
        </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  itemText: {
    fontSize: 18,
    fontWeight: "400",
    flex: 1,
  },
  itemContainer: {
    borderBottomWidth: 1,
    borderBottomColor: theme.colorCelurian,
    paddingVertical: 16,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: theme.colorLightGrey,
    borderRadius: 8,
    marginBottom: 8,
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