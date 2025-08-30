import { View,Button } from "react-native";
import { useRouter } from "expo-router";
import { BuyerListItem } from "../../components/BuyersList";

export default function Buyers() {
  const router = useRouter();

  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <BuyerListItem/>
      <Button
        title="Add Buyer"
        onPress={() => router.push("/buyers/add")}
      />
    </View>
  );
}
