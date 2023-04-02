import React from "react";
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import ManChao from '../Screen/ManChao';
import Login from '../Screen/Login';

import NewAccount from '../Screen/NewAccount';
import Home from '../Screen/Home';
import EditProfile from '../edit/EditProfile';
import PriceProfile from "../edit/PriceProfile";
import LichSuNapTien from "../edit/LichSuNapTien";
import LichSuOrders from "../edit/LichSuOrders";
import OrderDetail from "../edit/OrderDetail";
import DetailProduct from "../common/DetailProduct";
const Stack = createNativeStackNavigator();
// const HomeScreen = () => {
//   return(
//     <AuthDrawer/>
  
//   )
  
//   }
const AuthStack = ()=>{
    return(
        <Stack.Navigator  initialRouteName="Login">
          {/* <Stack.Screen name="HomeScreen" component={HomeScreen} /> */}
          <Stack.Screen options={{headerShown: false}} name='ManChao' component={ManChao}></Stack.Screen>
          <Stack.Screen options={{headerShown: false}} name='Login' component={Login}></Stack.Screen>
          <Stack.Screen options={{headerShown: false}} name='NewAccount' component={NewAccount}></Stack.Screen>
          <Stack.Screen options={{headerShown: false}} name='Home' component={Home}></Stack.Screen>
          <Stack.Screen options={{headerShown: true}} name='EditProfile' component={EditProfile}></Stack.Screen>
          <Stack.Screen options={{headerShown: true}} name='PriceProfile' component={PriceProfile}></Stack.Screen>
          <Stack.Screen options={{headerShown: true}} name='LichSuNapTien' component={LichSuNapTien}></Stack.Screen>
          <Stack.Screen options={{headerShown: true}} name='Lịch Sử Mua Hàng' component={LichSuOrders}></Stack.Screen>
          <Stack.Screen options={{headerShown: true}} name='Chi tiết đơn hàng' component={OrderDetail}></Stack.Screen>
          <Stack.Screen options={{headerShown: true}} name='Chi tiết sản phẩm' component={DetailProduct}></Stack.Screen>
        </Stack.Navigator>
    )
}
export default AuthStack