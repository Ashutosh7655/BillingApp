import { View, Text, TextInput, Button } from "react-native";
import { db } from ".";
import { useLocalSearchParams } from "expo-router";
export default function BuyerInfo() {
const { id,name} = useLocalSearchParams();
console.log(id,name);
  return (
    <View style={{ flex: 1, padding: 20 }}>

        <Text>Here we will show buyers info{'\n'}
         id is  {id} name is  {name}
        </Text>
    </View>
  );
}
