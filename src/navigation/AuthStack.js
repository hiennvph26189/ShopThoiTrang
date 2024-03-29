import React, { useEffect,useState } from "react";
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { useNavigation,useIsFocused } from "@react-navigation/native";
import ManChao from '../Screen/ManChao';
import Login from '../Screen/Login';
import SearchProducts from '../Screen/SearchProducts';
import XacNhanEmail from '../Screen/XacNhanEmail';
import LayLaiMatKhau from '../Screen/LayLaiMatKhau';
import {GET_ONE_MEMBER} from "../../api"
import NewAccount from '../Screen/NewAccount';
import QuenMatKhau from '../Screen/QuenMatKhau';
import Home from '../Screen/Home';
import RePass from '../edit/RePass';
import EditProfile from '../edit/EditProfile';
import PriceProfile from "../edit/PriceProfile";
import LichSuNapTien from "../edit/LichSuNapTien";
import LichSuOrders from "../edit/LichSuOrders";
import PriceDetail from "../edit/PriceDetail";
import OrderDetail from "../edit/OrderDetail";
import NewsDetail from "../edit/NewsDetail";
import DetailProduct from "../common/DetailProduct";
import ChiTietDanhGia from "../common/ChiTietDanhGia";
import DanhSachSanPham from "../common/DanhSachSanPham";
import ThongBaoNapTien from "../common/ThongBaoNapTien";
import ThongBaoOrder from "../common/ThongBaoOrder";
import DanhGiaSanPham from "../common/ItemVote";
import ListAddress from '../common/ListAddress';
import NewAddress from '../edit/NewAddress';
import EditAddress from '../edit/EditAddress';
import ChiTietDonHangThanhToan from '../common/ChiTietDonHangThanhToan';
import {useDispatch, useSelector} from 'react-redux'
import axios from "axios";
import ListLikeProduct from "../common/ListLikeProduct";
const Stack = createNativeStackNavigator();

const AuthStack = ()=>{
  const isFocused = useIsFocused()
  const [infoUser,setInfoUser]= useState({})
  const info = useSelector(state => state.Reducers.arrUser);
  const isloading = useSelector(state => state.Reducers.isloading);
const getMember = async()=>{
 await axios.get(`${GET_ONE_MEMBER}?id=${info.id}`).then((res)=>{
  if(res.data.errCode === 0){
    setInfoUser(res.data.member)
  }
 }).catch((err)=>{console.log(err)})
}
  useEffect(()=>{
    getMember()
  },[isFocused])
  
    return(
        <>
        { infoUser.status !==2&&
        <Stack.Navigator  initialRouteName="Home">
          <Stack.Screen options={{headerShown: false}} name='ManChao' component={ManChao}></Stack.Screen>
          <Stack.Screen options={{headerShown: true}} name='Login' component={Login}></Stack.Screen>
          <Stack.Screen options={{headerShown: false}} name='NewAccount' component={NewAccount}></Stack.Screen>
          <Stack.Screen options={{headerShown: false}} name='Home'  component={Home}></Stack.Screen>
          <Stack.Screen options={{headerShown: true}} name='EditProfile' component={EditProfile}></Stack.Screen>
          <Stack.Screen options={{headerShown: true}} name='PriceProfile' component={PriceProfile}></Stack.Screen>
          <Stack.Screen options={{headerShown: true}} name='LichSuNapTien' component={LichSuNapTien}></Stack.Screen>
          <Stack.Screen options={{headerShown: true}} name='Lịch Sử Mua Hàng' component={LichSuOrders}></Stack.Screen>
          <Stack.Screen options={{headerShown: true}} name='Chi tiết đơn hàng' component={OrderDetail}></Stack.Screen>
          <Stack.Screen options={{headerShown: false}} name='Chi tiết đơn hàng thanh toán' component={ChiTietDonHangThanhToan}></Stack.Screen>
          <Stack.Screen options={{headerShown: true}} name='Chi tiết sản phẩm' component={DetailProduct}></Stack.Screen>
          <Stack.Screen options={{headerShown: true}} name='Danh Sách sản phẩm' component={DanhSachSanPham}></Stack.Screen>
          <Stack.Screen options={{headerShown: true}} name='Chi tiết tin tức' component={NewsDetail}></Stack.Screen>
          <Stack.Screen options={{headerShown: true}} name='Tìm kiếm' component={SearchProducts}></Stack.Screen> 
          <Stack.Screen options={{headerShown: false}} name='Thông báo Order' component={ThongBaoOrder}></Stack.Screen> 
          <Stack.Screen options={{headerShown: true}} name='Đánh giá sản phẩm' component={DanhGiaSanPham}></Stack.Screen> 
          <Stack.Screen options={{ headerShown: true }} name='Đổi mật khẩu' component={RePass} ></Stack.Screen> 
          <Stack.Screen options={{ headerShown: true }} name='Địa chỉ' component={ListAddress} ></Stack.Screen> 
          <Stack.Screen options={{ headerShown: true }} name='Thêm mới địa chỉ' component={NewAddress} ></Stack.Screen> 
          <Stack.Screen options={{ headerShown: true }} name='Sửa địa chỉ' component={EditAddress} ></Stack.Screen> 
          <Stack.Screen options={{ headerShown: true }} name='Lấy lại mật khẩu' component={QuenMatKhau} ></Stack.Screen> 
          <Stack.Screen options={{ headerShown: true }} name='Xác nhận Email' component={XacNhanEmail} ></Stack.Screen> 
          <Stack.Screen options={{ headerShown: true }} name='Lấy lại mật khẩu của bạn' component={LayLaiMatKhau} ></Stack.Screen> 
          <Stack.Screen options={{ headerShown: true }} name='Thông báo nạp tiền' component={ThongBaoNapTien} ></Stack.Screen> 
          <Stack.Screen options={{ headerShown: true }} name='Chi tiết nạp tiền' component={PriceDetail} ></Stack.Screen> 
          <Stack.Screen options={{ headerShown: true }} name='Tất cả đánh giá' component={ChiTietDanhGia} ></Stack.Screen> 
          <Stack.Screen options={{ headerShown: true }} name='Sản phẩm yêu thích' component={ListLikeProduct} ></Stack.Screen> 
        </Stack.Navigator>
        
      }
        </>
      
    )
}
export default AuthStack