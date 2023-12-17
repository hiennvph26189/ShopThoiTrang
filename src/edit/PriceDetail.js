import { Text, View } from "react-native";
import {Avatar, Title,Caption,TouchableRipple} from "react-native-paper"
import React, { useState,useEffect } from "react";
import { useNavigation,useIsFocused } from "@react-navigation/native";
import { GET_ONE_THANHTOAN_9PAY,RESET_CART_ORDER } from "../../api";
import Icon from "react-native-vector-icons/MaterialCommunityIcons"
import {useDispatch, useSelector} from 'react-redux'
import Moment from 'moment';
import vi from "moment/locale/vi";
import fr from "moment/locale/fr";
import axios from "axios";
const PriceDetail = (props) => {
    const info = useSelector(state => state.Reducers.arrUser);
    const navigation = useNavigation()
    const route = props.route;
    const data_price  = route.params.data_price
    const [data_9pay,setData_9pay]= useState({})
    useEffect(()=>{
        getItemThanhToan(data_price.id_thanhtoan)
    },[])
    let getItemThanhToan = async(id_thanhtoan) => {
        if(id_thanhtoan){
           await axios.get(`${GET_ONE_THANHTOAN_9PAY}?id_thanhtoan=${id_thanhtoan}`).then((res)=>{
                if(res.data.errCode ===0){
                    setData_9pay(res.data.itemThanhToan)
                }
           }).catch((err) => {console.log(err);})
        }
    }
    const price =(price)=>{
        let x = parseInt(price);
        x = x.toLocaleString('it-IT', {style : 'currency', currency : 'VND'});
        return  x;
  }
  const formatDate= (date)=>{
    const newFr = Moment(date).locale("vi", fr).format("DD/MM/YYYY");
    return newFr
}
const formatTime= (time)=>{
    const newFr = Moment(time).locale("vi", fr).format("HH:mm:ss");

    return newFr
} 
    return (
        <View style={{padding:10}}>
       
        <View>
            <View style={{flexDirection:"row", justifyContent:"center",alignItems:"center", marginTop:70, marginBottom:20}}> 
                <View style={{ padding:10, borderRadius:100, backgroundColor:"green"}}> 
                  <Icon name="check-bold" size={30} color='#fff'/>
                </View>
                
              
            </View>
            <View style={{}}> 
              <Text style={{textAlign:"center", fontSize:20, fontWeight:600, color:"#66a182"}}>Giao dịch thành công</Text>
            </View>
            <View style={{padding:10, marginTop:10}}>
                
                <View style={{flexDirection:"row", borderBottomWidth: 1, borderBottomColor:"#CCC", paddingBottom:6, justifyContent:"flex-start", alignItems:"center",marginBottom:20}}>
                  <Text style={{fontWeight:500}}>Tên chủ thẻ: </Text>
                  <Text style={{marginLeft:15,fontWeight:500, color:"#000"}}>{data_9pay.card_name}</Text>
                </View>
                <View style={{flexDirection:"row", borderBottomWidth: 1, borderBottomColor:"#CCC", paddingBottom:6, justifyContent:"flex-start", alignItems:"center",marginBottom:20}}>
                  <Text style={{fontWeight:500}}>Loại thẻ: </Text>
                  <Text style={{marginLeft:15,fontWeight:500}}>{data_9pay.card_brand}</Text>
                </View>
                <View style={{flexDirection:"row", borderBottomWidth: 1, borderBottomColor:"#CCC", paddingBottom:6, justifyContent:"flex-start", alignItems:"center",marginBottom:20}}>
                  <Text style={{fontWeight:500}}>Số tài khoản: </Text>
                  <Text style={{marginLeft:15,fontWeight:500}}>{data_9pay.card_number}</Text>
                </View>
                <View style={{flexDirection:"row", borderBottomWidth: 1, borderBottomColor:"#CCC", paddingBottom:6, justifyContent:"flex-start", alignItems:"center",marginBottom:20}}>
                  <Text style={{fontWeight:500}}>Số tiền thanh toán: </Text>
                  <Text style={{marginLeft:15,fontWeight:500, color:"red"}}>{price(data_9pay.amount)}</Text>
                </View>
                
                <View style={{flexDirection:"row", borderBottomWidth: 1, borderBottomColor:"#CCC", paddingBottom:6, justifyContent:"flex-start", alignItems:"center",marginBottom:20}}>
                  <Text style={{fontWeight:500}}>Mã thanh toán cổng 9Pay: </Text>
                  <Text style={{marginLeft:15,fontWeight:500}}>{data_9pay.payment_no}</Text>
                </View>
                <View style={{flexDirection:"row", borderBottomWidth: 1, borderBottomColor:"#CCC", paddingBottom:6, justifyContent:"flex-start", alignItems:"center",marginBottom:20}}>
                  <Text style={{fontWeight:500}}>Nội dung thanh toán: </Text>
                  <Text style={{marginLeft:15,fontWeight:500}}>{data_9pay.description}</Text>
                </View>
                <View style={{flexDirection:"row", borderBottomWidth: 1, borderBottomColor:"#CCC", paddingBottom:6, marginBottom:20}}>
                  <Text style={{fontWeight:500}}>Ngày thanh toán: </Text>
                  <Text style={{marginLeft:15,fontWeight:500}}>{formatDate(data_price.createdAt)} - {formatTime(data_price.createdAt)}</Text>
                 
                </View>
                
              
            </View>
        </View>    
        <View style={{flexDirection:"row", alignItems:"center",justifyContent:"space-around"}}>
         
          <TouchableRipple onPress={()=>{navigation.goBack()} } style={{backgroundColor:"#66a182", width:150, padding:10, borderRadius:10}}>
                  <View style={{flexDirection:"row",justifyContent:"center",alignContent:"center"}}>
                     
                      <Text style={{textAlign:"center", fontSize:15, fontWeight:"600", color:"#fff"}}>
                          OK
                      </Text>
                  </View>
                 
          </TouchableRipple>
         
        </View>
      </View>
    );
};
export default PriceDetail;