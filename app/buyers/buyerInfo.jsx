import { View, Text,Alert,StyleSheet,TouchableOpacity} from "react-native";

import AntDesign from "@expo/vector-icons/AntDesign";
import { db } from "./add";
import { theme } from "../../theme";
import { useLocalSearchParams } from "expo-router";
export default function BuyerInfo() {
const { id} = useLocalSearchParams();
const buyer = db.find(item => item.id == id);
const products = buyer ? buyer.products : [];
const handleDelete=(id)=>{
    Alert.alert(`This will delete the ${id}?`,"",
      [
      {
      text:"Yes",
      onPress:()=> console.log("deleted"),
      style:"destructive",
    },
    {
      text:"No",
      style:"cancel",
    }
  ]
  );
  }
console.log(id);
  
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
      onPress={()=>handleDelete(product.id)} activeOpacity={0.8}>
        <AntDesign
          name="closecircle"
          size={24}
          color={theme.colorRed}
        />
      </TouchableOpacity>
        </View>
      ))
    )}
  </View>
);

}
const styles = StyleSheet.create({
  
  itemText:{
    fontSize:18,
    fontWeight:"400",
    flex:1
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
  marginBottom: 8
}});