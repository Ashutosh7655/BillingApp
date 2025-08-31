import { useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Dropdown } from 'react-native-element-dropdown';

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

      {selectedBuyer && (
        <Text style={{ marginTop: 20 }}>Selected Buyer ID: {selectedBuyer}</Text>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
