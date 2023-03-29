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
import ChoXacNhan from "./ChoXacNhan";
import DangGiaoHang from "./DangGiaoHang";
import DangXuLyHang from "./DangXuLyHang";
import GiaoThanhCong from "./GiaoThanhCong";
const LichSuOrders = () => {
    const navigation = useNavigation()
    const isFocused = useIsFocused()
    const [image, setImage] = useState('');
   
    const [arrprice, setArPrice] = useState([]);
    
    const info = useSelector((state)=> state.Reducers.arrUser)
    const [selectTab, setSelectetab] = useState(0);
    const data = {
        id: info.id  
     }
   
     
      useEffect(()=>{
       
   
    },[isFocused])
    
     
  
const formatDate= (date)=>{
    const newFr = Moment(date).locale("vi", fr).format("DD/MM/YYYY");
    return newFr
}
const formatTime= (time)=>{
    const newFr = Moment(time).locale("vi", fr).format("HH:mm:ss");
    return newFr
} 
const price =(price)=>{
    let x = price;
    x = x.toLocaleString('it-IT', {style : 'currency', currency : 'VND'});
    return  x;
} 

  
    return (
        <View style={[styles.container,{flex:1, backgroundColor:'#FFFFF0',marginBottom:55}]} showsVerticalScrollIndicator={false}>
            <View style={{flexDirection:"row" ,justifyContent:"center",alignItems:"center"}}>
                <Pressable style={[styles.tab,{
                    backgroundColor: selectTab == 0 ? "#CCC" : "#fff"
                }]} onPress={()=>{setSelectetab(0)}}>
                    <Text>Chờ Xác Nhận</Text>
                </Pressable>
                <Pressable style={[styles.tab,{
                    backgroundColor: selectTab == 1 ? "#CCC" : "#fff"
                }]} onPress={()=>{setSelectetab(1)}}>
                    <Text>Chờ lấy hàng </Text>
                </Pressable>
                <Pressable style={[styles.tab,{
                    backgroundColor: selectTab == 2 ? "#CCC" : "#fff"
                }]} onPress={()=>{setSelectetab(2)}}>
                    <Text>Đang Giao </Text>
                </Pressable>
                <Pressable style={[styles.tab,{
                    backgroundColor: selectTab == 3 ? "#CCC" : "#fff"
                }]} onPress={()=>{setSelectetab(3)}}>
                    <Text> Thành công</Text>
                </Pressable>
            </View>
            <View>
            {selectTab == 0 ? (<ChoXacNhan />) : selectTab == 1 ? (<DangXuLyHang />) : selectTab == 2 ? (<DangGiaoHang />) :  (<GiaoThanhCong />) }
            </View>
           
               

              
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