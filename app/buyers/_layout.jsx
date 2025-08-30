import { Stack } from "expo-router";

export default function BuyersLayout() {
  return (
    <Stack>
      <Stack.Screen name="index" options={{ title: "Buyers" }} />
      <Stack.Screen name="add" options={{ title: "Add Buyer" }} />
      <Stack.Screen name="buyerInfo" options={{ title: "Buyer information" }} />
    </Stack>
  );
}
