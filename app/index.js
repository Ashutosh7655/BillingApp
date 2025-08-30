import { StyleSheet, Text, View } from 'react-native';
import { BuyerListItem } from '../components/BuyersList';

export default function App() {
  return (
    <View style={styles.container}>
     <Text>Here, we create Bill</Text>
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
