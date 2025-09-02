import { Tabs } from "expo-router";
import AntDesign from '@expo/vector-icons/AntDesign';
import Octicons from '@expo/vector-icons/Octicons';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
/**
 * Layout Component
 * ----------------
 * This component defines the bottom tab navigation for the app using Expo Router.
 * Each <Tabs.Screen> represents a tab in the bottom navigation.
 * 
 * Screens included:
 * 1. Buyers        -> Displays the list of buyers
 * 2. AddBill (index) -> Screen to create a new bill
 * 3. History       -> Displays the bill/payment history
 * 
 * Tab icons are set using vector-icons.
 */
export default function Layout(){
    return(
        <Tabs>
            <Tabs.Screen name="buyers" options={{title:"Buyers",headerShown:false,
                tabBarIcon:(color,size)=>{
                    return (<AntDesign name="user" size={24} color="#1a759f" />);
                }
            }}/>
            <Tabs.Screen name="index" options={{title:"AddBill",tabBarIcon:()=><Octicons name="log" size={24} color="#1a759f" />}}/>
            <Tabs.Screen name="History" options={{title:"History",tabBarIcon:()=>{
                return (<MaterialIcons name="history" size={24} color="#1a759f" />);}}}/>
        </Tabs>
    )

}