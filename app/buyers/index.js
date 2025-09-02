// Import core React Native components for UI
import {
  StyleSheet,   // For defining styles
  View,         // Container element like <div> in web
  ScrollView,   // Scrollable container for lists
  TouchableOpacity, // For clickable buttons
  Text          // For rendering text
} from "react-native";

// Import AntDesign icons from Expo’s icon library
import AntDesign from '@expo/vector-icons/AntDesign';

// Import navigation hook from Expo Router (handles screen navigation)
import { useRouter } from "expo-router";

// Custom component to render a single buyer item (defined elsewhere)
import { BuyerListItem } from "../../components/BuyersList";

// App-wide theme constants (colors, sizes, etc.)
import { theme } from "../../theme";

// React hooks for state & side-effects
import { useEffect, useState } from "react";

// Utility function for reading from AsyncStorage
import { getStorageValues } from "../../utils/storage";

// Key used to store/retrieve buyers in AsyncStorage
import { appKey } from "../../utils/key";

// Main Buyers screen component
export default function Buyers() {
  // Local state: list of all buyers
  const [buyers, setBuyers] = useState([]);

  // Effect runs when component mounts OR when `buyers` changes
  useEffect(() => {
    const loadData = async () => {
      const b = await getStorageValues(appKey); // Fetch stored buyers
      setBuyers(b || []); // Update state (fallback empty array if null)
      // console.log("Loaded buyers:", b);
    };

    loadData(); // Call async loader
  }, [buyers]); 
  // ⚠️ Problem: `buyers` is in dependency array, 
  // so whenever buyers is updated -> useEffect runs again -> infinite loop risk.
  // Correct: use `[]` so it runs once on mount, or `[appKey]` if key can change.

  // Router instance for navigation
  const router = useRouter();

  return (
    <View style={styles.container}>
      {/* Main scrollable area */}
      <ScrollView contentContainerStyle={styles.scrollContent}>
        {
          buyers.length === 0 ? (
            // Empty state UI when no buyers found
            <View style={styles.emptyContainer}>
              <Text style={styles.emptyText}>The List is empty.</Text>
            </View>
          ) : (
            // Render each buyer using BuyerListItem
            buyers.map((item) => (
              <BuyerListItem
                name={item.name}   // Buyer’s name
                id={item.id}       // Buyer’s id
                key={item.id}      // React key for list rendering
              />
            ))
          )
        }
      </ScrollView>

      {/* Add Buyer button fixed at bottom */}
      <View style={styles.buttonContainer}>
        <TouchableOpacity
          style={styles.button}
          onPress={() => router.push("/buyers/add")} // Navigate to Add Buyer screen
        >
          {/* Icon + text inside button */}
          <AntDesign name="adduser" size={24} color="black" />
          <Text style={styles.buttonText}>Add Buyer</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

//////////////////////////////////////////
// STYLES
//////////////////////////////////////////
const styles = StyleSheet.create({
  container: {
    flex: 1,              // Full screen
    backgroundColor: "#fff",
    padding: 12,
  },
  emptyContainer: {
    flex: 1,
    flexDirection: 'row',
    backgroundColor: "#fff",
    justifyContent: 'center', // Center horizontally
    alignItems: "center",     // Center vertically
  },
  emptyText: {
    fontSize: 18,
    fontWeight: "400",
  },
  itemText: {
    fontSize: 18,
    fontWeight: "400",
  },
  itemContainer: {
    borderBottomWidth: 1,
    borderBottomColor: "#1a759f",
    paddingHorizontal: 8,
    paddingVertical: 18,
    flexDirection: "row", // Text + actions in a row
    alignItems: "center",
    justifyContent: "space-between",
  },
  textInput: {
    borderColor: theme.colorBlack,
    borderWidth: 2,
    borderRadius: 40,
    padding: 10,
    margin: 10,
    backgroundColor: theme.colorWhite,
  },
  button: {
    flexDirection: 'row', // icon + text side by side
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#007bff',
    padding: 12,
    borderRadius: 8,
  },
  buttonText: {
    color: 'white',
    marginLeft: 8, // spacing between icon and text
    fontSize: 16,
  },
});
