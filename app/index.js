import { useState } from 'react';
import { StyleSheet, Text, View, Button, TouchableOpacity } from 'react-native';
import { Dropdown } from 'react-native-element-dropdown';
import { BillCreate } from '../components/BillCreate';
import { db } from './buyers/add';
import { theme } from '../theme';

export default function App() {
  const [selectedBuyer, setSelectedBuyer] = useState('');
  const [products, setProducts] = useState([]); // store product fields

  const dropdowndb = db.map(item => ({
    label: item.name,
    value: item.id,
  }));

  const handleAddProduct = () => {
    setProducts([...products, {}]); // add empty product object
  };

  return (
    <View style={styles.container}>
      <Text>Select Buyer:</Text>
      <Dropdown
        data={dropdowndb}
        labelField="label"
        valueField="value"
        placeholder="Select a buyer"
        value={selectedBuyer}
        onChange={item => setSelectedBuyer(item.value)}
        style={styles.dropdown}
      />

      {/* Dynamic product fields */}
      {products.map((_, index) => (
        <BillCreate key={index} />
      ))}
      <TouchableOpacity onPress={handleAddProduct} style={{backgroundColor:theme.colorCelurian,paddingVertical: 12,
    paddingHorizontal: 24,borderRadius:10,}}activeOpacity={0.8}>
        <Text style={{color:theme.colorWhite}} >Add Product</Text>
      </TouchableOpacity>

      {/* Floating Generate Bill button */}
      <TouchableOpacity style={styles.floatingBtn} activeOpacity={0.8}>
        <Text style={styles.btnText}>Generate Bill</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    paddingTop: 40,
  },
  dropdown: {
    width: 200,
    borderWidth: 1,
    borderColor: 'gray',
    borderRadius: 8,
    padding: 8,
    marginTop: 10,
  },
  floatingBtn: {
    position: "absolute",
    bottom: 80, // keep just above tab bar
    alignSelf: "center",
    backgroundColor: theme.colorCelurian,
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 30,
    elevation: 5,
  },
  btnText: {
    color: "white",
    fontSize: 18,
    fontWeight: "bold",
  },
});
