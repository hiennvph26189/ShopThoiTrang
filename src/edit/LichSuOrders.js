import {  View,SafeAreaView,TextInput,ScrollView,FlatList,Text,ImageBackground,StyleSheet,Button,Pressable,ImputText, Platform, Image } from "react-native";
import {React,useState,useEffect} from "react";
import { ActivityIndicator} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import FontAwesome from "react-native-vector-icons/FontAwesome";
import Feather from "react-native-vector-icons/Feather";
import {useDispatch, useSelector} from 'react-redux'
import { RadioButton } from "react-native-paper";
import * as ImagePicker from 'expo-image-picker';
import { format } from 'date-fns'
import { useNavigation,useIsFocused } from "@react-navigation/native";
import axios from "axios";
import Moment from 'moment';
import vi from "moment/locale/vi";
import fr from "moment/locale/fr";
import {PROFILEMEMBER,LichSuOrdersMEMBER} from "../../api";
import { onChange } from "react-native-reanimated";
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import DangXuLy from "./DangXuLy";
import DangGiaoHang from "./DangGiaoHang";
import DonHuy from "./DonHuy";
import GiaoThanhCong from "./GiaoThanhCong";
const LichSuOrders = (props) => {
    const navigation = props.navigation;
    console.log(navigation);
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
            <View style={{flexDirection:"row" ,justifyContent:"center",backgroundColor:'#000',padding:2,alignItems:"center",marginLeft:3,marginRight:2, borderRadius:5}}>
                <Pressable style={[styles.tab,{
                    backgroundColor: selectTab == 0 ? "#FF9900" : "#fff"
                }]} onPress={()=>{setSelectetab(0)}}>
                    <Text style={{fontWeight:"600"}}>Đang xử lý</Text>
                </Pressable>
                <Pressable style={[styles.tab,{
                    backgroundColor: selectTab == 1 ? "#FF9900" : "#fff"
                }]} onPress={()=>{setSelectetab(1)}}>
                    <Text style={{fontWeight:"600"}}>Đang Giao </Text>
                </Pressable>
                <Pressable style={[styles.tab,{
                    backgroundColor: selectTab == 2 ? "#FF9900" : "#fff"
                }]} onPress={()=>{setSelectetab(2)}}>
                    <Text style={{fontWeight:"600"}}>Đã giao thành công</Text>
                </Pressable>
                <Pressable style={[styles.tab,{
                    backgroundColor: selectTab == 3 ? "#FF9900" : "#fff"
                }]} onPress={()=>{setSelectetab(3)}}>
                    <Text style={{fontWeight:"600"}}> Đơn hủy</Text>
                </Pressable>
            </View>
            <ScrollView>
            {selectTab == 0 ? (<DangXuLy orderDetails={orderDetails} />) : selectTab == 1 ? (<DangGiaoHang orderDetail={orderDetails} />) : selectTab == 2 ? (<GiaoThanhCong orderDetails={orderDetails}/>) :  (<DonHuy />) }
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
        
        borderRadius:5,
    }
   
})