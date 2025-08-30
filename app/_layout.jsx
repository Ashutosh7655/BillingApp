import { Tabs } from "expo-router";

export default function Layout(){
    return(
        <Tabs>
            <Tabs.Screen name="buyers" options={{title:"Buyers",headerShown:false}}/>
            <Tabs.Screen name="index" options={{title:"AddBill"}}/>
            <Tabs.Screen name="History" options={{title:"History"}}/>
        </Tabs>
    )

}