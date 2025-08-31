import { StyleSheet, Text, TextInput, View ,TouchableOpacity,Alert} from "react-native";

import AntDesign from "@expo/vector-icons/AntDesign";
import { useState } from "react";
import { theme } from "../theme";

export function BillCreate() {
  const [id, setId] = useState("");
  const [quantity, setQuantity] = useState("");
const handleDelete=()=>{
    Alert.alert(`This will delete the product?`,"",
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
  const pricePerUnit = 15; 
  const total = Number(quantity || 0) * pricePerUnit;

  return (
    <View style={{ flexDirection: "row", alignItems: "center" ,justifyContent:"center",borderColor:"white",borderWidth:2,margin:2,gap:2}}>
      <TextInput
        placeholder="Product Id"
        value={id}
        onChangeText={setId}
        style={styles.textInput}
      />
      <Text> - </Text>
      <TextInput
        placeholder="Quantity"
        value={quantity}
        onChangeText={setQuantity}
        keyboardType="numeric"
        style={styles.textInput}
      />
       <Text> x </Text>
      <Text> {pricePerUnit} </Text>
      <Text> = </Text>
      <Text>{total}</Text>
      <TouchableOpacity
      onPress={()=>handleDelete()} activeOpacity={0.8} style={{marginLeft:2}}>
        <AntDesign
          name="closecircle"
          size={24}
          color={theme.colorRed}
        />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  textInput: {
    borderWidth: 1,
    borderColor:"#ccc",
    padding: 8,
    marginHorizontal: 4,
    borderRadius: 6,
    fontSize: 16,
    backgroundColor: "#fff",
    minWidth: 60,
    textAlign: "center",
  },
});
