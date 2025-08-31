import { useState } from 'react';
import { StyleSheet, Text, View,Button } from 'react-native';
import { Dropdown } from 'react-native-element-dropdown';
import {BillCreate} from '../components/BillCreate';

const db = [
  { id: 1, name: "John", contact: "55555555" },
  { id: 2, name: "Jane", contact: "666666" },
  { id: 3, name: "Josh", contact: "777777" },
];

export default function App() {
  const [selectedBuyer, setSelectedBuyer] = useState('');

  const dropdowndb = db.map(item => ({
    label: item.name,
    value: item.id,
  }));
  const [id, setProductid] = useState("");
  const [quantity, setQuantity] = useState(0);
   // store product fields
  const [products, setProducts] = useState([]); // store product fields

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
        style={{ width: 200, borderWidth: 1, borderColor: 'gray', borderRadius: 8, padding: 8, marginTop: 10 }}
      />
      <View style={styles.container}>
      {products.map((_, index) => (
              <BillCreate key={index}/>))}
      <Button title="Add Product" onPress={handleAddProduct} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
