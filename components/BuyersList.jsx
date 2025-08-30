import { Alert, Pressable, View,Text, TouchableOpacity } from "react-native";

export function BuyerListItem(){
    function handleDelete(){
        Alert.alert(
            "Are you sure you want to delete this","",
            [
                {
                    text:"yes",
                    onPress:()=>console.log("deleted"),
                    style:"destructive"
                },
                {
                    text:"cancel",
                    style:"cancel"
                },

            ]

        )
    }
    return (
        <View>
            <TouchableOpacity onPress={()=>console.log("user added")}>
                <Text>Add user</Text>
            </TouchableOpacity>
            <Text>Buyer1</Text>
            <Pressable onPress={handleDelete}>
                <Text>Delete</Text>
            </Pressable>
        </View>
    )
}