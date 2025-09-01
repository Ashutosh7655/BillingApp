
import { StyleSheet, Text, View, TouchableOpacity, Alert, Pressable } from 'react-native';
import { theme } from '../theme.js';
import AntDesign from "@expo/vector-icons/AntDesign";
import { useRouter } from 'expo-router';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
export function BuyerListItem({ name, id }) {
  const parseId = id;
  const router = useRouter();
  const handleDelete = () => {
    Alert.alert(`This will delete the ${name}?`, "",
      [
        {
          text: "Yes",
          onPress: () => console.log("deleted"),
          style: "destructive",
        },
        {
          text: "No",
          style: "cancel",
        }
      ]
    );
  }
  const routeTobuyerInfo = () => {
    router.push({ pathname: '/buyers/buyerInfo', params: { id: parseId } })
  }
  const handleEdit=()=>{
    router.push({ pathname: "/buyers/EditBuyer", params: { id } });
  }
  return (
    <View >
      <View style={styles.itemContainer}>

        {/* <Text  style={styles.itemText}>{contact}</Text> */}
        <Text style={styles.itemText}>{name}</Text>

        {/* Info Button*/}
        <TouchableOpacity style={{ marginRight: 12 }}
          onPress={routeTobuyerInfo} activeOpacity={0.8}
          hitSlop={{ left: 10 }}>
          <MaterialCommunityIcons name="account-details" size={24} color="black" />
        </TouchableOpacity>
        {/* Edit Info Button*/}
        <TouchableOpacity
          style={{ marginRight: 12 }}
          onPress={() => handleEdit(id)} // pass buyer id
          activeOpacity={0.8}
        >
          <AntDesign
            name="edit"
            size={24}
            color="Blue"/>
        </TouchableOpacity>

        {/* Delete Button*/}
        <TouchableOpacity
          onPress={() => handleDelete()} activeOpacity={0.8}>
          <AntDesign
            name="closecircle"
            size={24}
            color={theme.colorRed}
          />
        </TouchableOpacity>
      </View>

    </View>);
}
const styles = StyleSheet.create({

  itemText: {
    fontSize: 18,
    fontWeight: "400",
    flex: 1
  },
  itemContainer: {
    borderBottomWidth: 1,
    borderBottomColor: theme.colorCelurian,
    paddingVertical: 18,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-evenly"
  },

  row: {
    flex: 1,
    flexDirection: 'row',
    gap: 8
  }


});
