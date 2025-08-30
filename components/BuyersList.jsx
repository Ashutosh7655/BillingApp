
import { StyleSheet, Text, View ,TouchableOpacity,Alert, Pressable} from 'react-native';
import {theme} from '../theme.js';
import AntDesign from "@expo/vector-icons/AntDesign";
import { useRouter } from 'expo-router';
export function BuyerListItem({name,id}){
    const parseName=name;
    const parseId=id;
    const router=useRouter();
    const handleDelete=()=>{
    Alert.alert(`This will delete the ${name}?`,"",
      [
      {
      text:"Yes",
      onPress:()=> console.log("deleted"),
      style:"destructive",
    },
    {
      text:"No",
      style:"cancel",
    }
  ]
  );
  }
  const routeTobuyerInfo=()=>{
    router.push({pathname:'/buyers/buyerInfo',params:{id:parseId,name:parseName}})
  }
  
return (
      <Pressable onPress={routeTobuyerInfo}>
      <View style={styles.itemContainer}>
      <Text  style={styles.itemText}>{name}</Text>
      {/* <Text  style={styles.itemText}>{contact}</Text> */}
      
      <TouchableOpacity
      onPress={()=>handleDelete()} activeOpacity={0.8}>
        <AntDesign
          name="closecircle"
          size={24}
          color={theme.colorRed}
        />
      </TouchableOpacity>
      </View>

      </Pressable>);
}
const styles = StyleSheet.create({
  
  itemText:{
    fontSize:18,
    fontWeight:"200",
    flex:1
  },
  itemContainer:{
        borderBottomWidth:1,
        borderBottomColor:theme.colorCelurian,
        paddingVertical:18,
        flexDirection:"row",
        alignItems:"center",
        justifyContent:"space-evenly"
      },
      
  row:{
    flex:1,
    flexDirection:'row',
    gap:8
  }
 
  
});
