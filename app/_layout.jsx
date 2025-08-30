import { Tabs } from "expo-router";
import AntDesign from '@expo/vector-icons/AntDesign';
import Octicons from '@expo/vector-icons/Octicons';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';

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