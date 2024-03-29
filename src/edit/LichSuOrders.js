import {  View,SafeAreaView,TextInput,ScrollView,FlatList,Text,ImageBackground,StyleSheet,Button,Pressable,ImputText, Platform, Image } from "react-native";
import {React,useState,useEffect} from "react";
import {useDispatch, useSelector} from 'react-redux'
import { useNavigation,useIsFocused } from "@react-navigation/native";
import DangXuLy from "./DangXuLy";
import DangGiaoHang from "./DangGiaoHang";
import DonHuy from "./DonHuy";
import GiaoThanhCong from "./GiaoThanhCong";
import DonHoan from "./DonHoan";
const LichSuOrders = (props) => {
    const navigation = props.navigation;
    
    const isFocused = useIsFocused()
    const [image, setImage] = useState('');
   
    const [arrprice, setArPrice] = useState([]);
    
    const info = useSelector((state)=> state.Reducers.arrUser)
    const [selectTab, setSelectetab] = useState(0);
    const [refreshing, setRefreshing] = useState(false);
    onRefresh = () => {
        getProfile()
        setRefreshing(true)
        
    }
    const data = {
        id: info.id  
     }
   
     
      useEffect(()=>{
       
   
    },[isFocused])
    const orderDetails = (id)=>{
       
    }
    return (
        <View style={[styles.container,{flex:1, backgroundColor:'#DCDCDC'}]} showsVerticalScrollIndicator={false}>
            <ScrollView  horizontal={true} showsHorizontalScrollIndicator={false} style={{flexDirection:"row",backgroundColor:'#000',padding:2, borderRadius:5,maxHeight:55 }}>
                <Pressable style={[styles.tab,{
                    backgroundColor: selectTab == 0 ? "#FF9900" : "#fff"
                }]} onPress={()=>{setSelectetab(0)}}>
                    <Text style={{fontWeight:"600"}}>Đơn đang xử lý</Text>
                </Pressable>
                <Pressable style={[styles.tab,{
                    backgroundColor: selectTab == 1 ? "#FF9900" : "#fff"
                }]} onPress={()=>{setSelectetab(1)}}>
                    <Text style={{fontWeight:"600"}}>Đơn đang Giao </Text>
                </Pressable>
                <Pressable style={[styles.tab,{
                    backgroundColor: selectTab == 2 ? "#FF9900" : "#fff"
                }]} onPress={()=>{setSelectetab(2)}}>
                    <Text style={{fontWeight:"600"}}>Đã giao thành công</Text>
                </Pressable>
                <Pressable style={[styles.tab,{
                    backgroundColor: selectTab == 3 ? "#FF9900" : "#fff"
                }]} onPress={()=>{setSelectetab(3)}}>
                    <Text style={{fontWeight:"600"}}> Đơn đã hủy</Text>
                </Pressable>
                <Pressable style={[styles.tab,{
                    backgroundColor: selectTab == 4 ? "#FF9900" : "#fff"
                }]} onPress={()=>{setSelectetab(4)}}>
                    <Text style={{fontWeight:"600"}}> Đơn hoàn</Text>
                </Pressable>
            </ScrollView>
            <ScrollView>
            {selectTab == 0 ? (<DangXuLy orderDetails={orderDetails} />) : selectTab == 1 ? (<DangGiaoHang orderDetail={orderDetails} />) : selectTab == 2 ? (<GiaoThanhCong orderDetails={orderDetails}/>) : selectTab == 3 ?  (<DonHuy />):selectTab == 4 ?<DonHoan /> :null }
            </ScrollView>
           
               

              
        </View>
    )
}
export default LichSuOrders;
const styles = StyleSheet.create({
    listView:{
        padding:10
    },
    listView_Text:{
        flexDirection:'row',
        alignItems: 'center',
        justifyContent:"space-between",
        borderBottomColor:'#ccc',
        borderBottomWidth:1,
        paddingBottom:10
    },
    tab:{
        margin:5,
        borderColor:'#000',
        borderWidth:1,
        padding:5,
        justifyContent: 'center',
        alignItems: 'center',
        textAlign: 'center',
        height:40,
        borderRadius:5,
    }
   
})