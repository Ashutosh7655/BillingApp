import {
  StyleSheet,
  View,
  ScrollView,
  TouchableOpacity,
  Text
} from "react-native";
import AntDesign from '@expo/vector-icons/AntDesign';
import { useRouter } from "expo-router";
import { BuyerListItem } from "../../components/BuyersList";
import { theme } from "../../theme";
const db = [
  {
    id: 1,
    name: "John",
    contact: "55555555",
  },
  {
    id: 2,
    name: "Jane",
    contact: "666666",
  },
  {
    id: 3,
    name: "Josh",
    contact: "777777",
  },
];
export default function Buyers() {
  const router = useRouter();

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        {db.length === 0 ? (
          <View style={styles.emptyContainer}>
            <Text style={styles.emptyText}>The List is empty.</Text>
          </View>
        ) : (
          db.map((item) => (
            <BuyerListItem
              name={item.name}
              id={item.id}
              key={item.id}
            />
          ))
        )}
      </ScrollView>

      <View style={styles.buttonContainer}>
        <TouchableOpacity
          style={styles.button}
          onPress={() =>  router.push("/buyers/add")}
        >
          <AntDesign name="adduser" size={24} color="black" />
          <Text style={styles.buttonText}>Add Buyer</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
  //return (
  //   <ScrollView style={styles.container} contentContainerStyle={{paddingBottom:24}} stickyHeaderIndices={[1]}>{/* Main container */}
  //     <StatusBar style="auto" />{/* Automatically adjust status bar style */}

  //     {/* Text input for adding new items */}

  //     <TextInput style={styles.textInput}
  //      placeholder='e.g coffee'
  //      value={userInput}
  //      onChangeText={(userInput)=>setUserInput(userInput)}
  //      returnKeyType='done'  // Show "Done" key on keyboard
  //      onSubmitEditing={handleSubmit}// Call handleSubmit when user presses "Done"
  //      />
  //        {/* Render shopping list items */}
  //     {shoppingList.length===0?(
  //       <View style={{flex:1,fontSize:36,alignItems:'center',color:theme.colorBlack}}>
  //       <Text>
  //        The List is empty.
  //       </Text>
  //     </View>)
  //     :(shoppingList.map((item)=><ShoppingList name={item.name} key={item.id}/>))}
  //   </ScrollView>
  // );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    //justifyContent: 'center',
    padding: 12,
  },
  itemText: {
    fontSize: 18,
    fontWeight: "200",
  },
  itemContainer: {
    borderBottomWidth: 1,
    borderBottomColor: "#1a759f",
    paddingHorizontal: 8,
    paddingVertical: 18,
    flexDirection: "row",
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
    flexDirection: 'row', // icon + text in a row
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#007bff',
    padding: 12,
    borderRadius: 8,
  },
  buttonText: {
    color: 'white',
    marginLeft: 8,
    fontSize: 16,
  },
});
