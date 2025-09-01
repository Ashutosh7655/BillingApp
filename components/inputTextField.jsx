import { StyleSheet, TextInput, View,Text } from "react-native";
import { theme } from "../theme.js";
import { useState } from "react";

export function InputTextField(props) {
  const [id, setId] = useState(''||props.product.id);
  const [price, setPrice] = useState('');
  const sendData=(addId,addPrice)=>{
    if(props.onChangeData){
      props.onChangeData({id:addId,price:addPrice},props.index); 
      
    }
    
  }
  return (
    <View>
      <TextInput
        placeholder="Product Id"
        value={id}
        onChangeText={(text)=>{
          setId(text);
          sendData(text,price);}}
        style={styles.textInput}
      />
      <TextInput
        placeholder="Product Price"
        value={price}
        onChangeText={(text)=>{
          setPrice(text);
          sendData(id,text);}}
        keyboardType="numeric" 
        style={styles.textInput}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  textInput: {
    borderWidth: 1,
    borderColor: theme.colorCelurian || "#ccc",
    padding: 12,
    marginVertical: 8,
    borderRadius: 8,
    fontSize: 16,
    backgroundColor: "#fff",
    borderWidth: 1,
    borderColor: "#ccc",
    padding: 10,
    marginVertical: 10,
  },
  textInputStyles: {
    borderWidth: 1,
    borderColor: "#ccc",
    padding: 10,
    marginVertical: 10,
  }
});
