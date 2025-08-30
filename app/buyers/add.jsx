import { View, Text, TextInput, Button } from "react-native";
import { useRouter } from "expo-router";
import { useState } from "react";

export default function AddBuyer() {
  const router = useRouter();
  const [name, setName] = useState("");

  const handleSave = () => {
    // save buyer logic (db, async storage, etc.)
    console.log("New Buyer:", name);
    router.back(); 
  };

  return (
    <View style={{ flex: 1, padding: 20 }}>
      <Text>Add Buyer</Text>
      <TextInput
        placeholder="Enter buyer name"
        value={name}
        onChangeText={setName}
        style={{
          borderWidth: 1,
          borderColor: "#ccc",
          padding: 10,
          marginVertical: 10,
        }}
      />
      <Button title="Save" onPress={handleSave} />
    </View>
  );
}
