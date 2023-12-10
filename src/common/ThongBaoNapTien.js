import { Text, View } from "react-native";
import {Avatar, Title,Caption,TouchableRipple} from "react-native-paper"
import React, { useState,useEffect } from "react";
import { useNavigation,useIsFocused } from "@react-navigation/native";
import { POST_PRICE_9PAY,RESET_CART_ORDER } from "../../api";
import Icon from "react-native-vector-icons/MaterialCommunityIcons"
import {useDispatch, useSelector} from 'react-redux'
import axios from "axios";
const ThongBaoNapTien = (props) => {
    const info = useSelector(state => state.Reducers.arrUser);
    const navigation = useNavigation()
    const route = props.route;
    let data_9pay  = route.params.data_price
    useEffect(()=>{
            if(data_9pay.status ==5){
                let data = {
                    id: info.id,
                    data9Pay:data_9pay
                }
                postPrice9Pay(data)
                
            }
    },[])
   const postPrice9Pay = async(data)=>{
        await axios.post(POST_PRICE_9PAY,data).then((res)=>{

        }).catch((err)=>{console.log(err);})
    }
    const price =(price)=>{
        let x = price;
        x = x.toLocaleString('it-IT', {style : 'currency', currency : 'VND'});
        return  x;
  }
    return (
        <View style={{padding:10}}>
        {data_9pay.status == 5?
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
                  <Text style={{marginLeft:15,fontWeight:500, color:"#000"}}>{data_9pay.card_info.card_name}</Text>
                </View>
                <View style={{flexDirection:"row", borderBottomWidth: 1, borderBottomColor:"#CCC", paddingBottom:6, justifyContent:"flex-start", alignItems:"center",marginBottom:20}}>
                  <Text style={{fontWeight:500}}>Loại thẻ: </Text>
                  <Text style={{marginLeft:15,fontWeight:500}}>{data_9pay.card_info.card_brand}</Text>
                </View>
                <View style={{flexDirection:"row", borderBottomWidth: 1, borderBottomColor:"#CCC", paddingBottom:6, justifyContent:"flex-start", alignItems:"center",marginBottom:20}}>
                  <Text style={{fontWeight:500}}>Số tài khoản: </Text>
                  <Text style={{marginLeft:15,fontWeight:500}}>{data_9pay.card_info.card_number}</Text>
                </View>
                <View style={{flexDirection:"row", borderBottomWidth: 1, borderBottomColor:"#CCC", paddingBottom:6, justifyContent:"flex-start", alignItems:"center",marginBottom:20}}>
                  <Text style={{fontWeight:500}}>Số tiền thanh toán: </Text>
                  <Text style={{marginLeft:15,fontWeight:500, color:"red"}}>{price(data_9pay.amount_request)}</Text>
                </View>
                <View style={{flexDirection:"row", borderBottomWidth: 1, borderBottomColor:"#CCC", paddingBottom:6, justifyContent:"flex-start", alignItems:"center",marginBottom:20}}>
                  <Text style={{fontWeight:500}}>Mã đơn hàng: </Text>
                  <Text style={{marginLeft:15,fontWeight:500}}>{data_9pay.invoice_no}</Text>
                </View>
                <View style={{flexDirection:"row", borderBottomWidth: 1, borderBottomColor:"#CCC", paddingBottom:6, justifyContent:"flex-start", alignItems:"center",marginBottom:20}}>
                  <Text style={{fontWeight:500}}>Mã thanh toán cổng 9Pay: </Text>
                  <Text style={{marginLeft:15,fontWeight:500}}>{data_9pay.payment_no}</Text>
                </View>
                <View style={{ borderBottomWidth: 1, borderBottomColor:"#CCC", paddingBottom:6, marginBottom:20}}>
                  <Text style={{fontWeight:500}}>Sản phẩm đã mua: </Text>
                  <Text style={{marginLeft:15,fontWeight:500}}>{ data_9pay.description}</Text>
                 
                </View>
                
              
            </View>
        </View>

        :
        <View>
        <View style={{flexDirection:"row", justifyContent:"center",alignItems:"center", marginTop:70, marginBottom:20}}> 
            <View style={{ padding:10, borderRadius:100, backgroundColor:"red"}}> 
              <Icon name="close-thick" size={30} color='#fff'/>
            </View>
            
          
        </View>
        <View style={{}}> 
          <Text style={{textAlign:"center", fontSize:30, fontWeight:600, color:"red"}}>Giao dịch thất bại</Text>
        </View>
        <View style={{}}> 
          <Text style={{textAlign:"center", fontSize:18, fontWeight:600, color:"#000"}}>Vui lòng giao tùy chọn giao dịch khác</Text>
        </View>
        
    </View>
      }
          
        <View style={{flexDirection:"row", alignItems:"center",justifyContent:"space-around"}}>
          {data_9pay.status != 5?
          <TouchableRipple onPress={()=>{navigation.navigate('Home',0)} }  style={{backgroundColor:"red", width:150, padding:10, borderRadius:10, marginTop:50}}>
                  <View style={{ }}>
                     
                      <Text style={{textAlign:"center", fontSize:15, fontWeight:"600", color:"#fff"}}>
                         Cancel
                      </Text>
                  </View>
                 
          </TouchableRipple >
          :
          <TouchableRipple onPress={()=>{navigation.navigate('Home')} } style={{backgroundColor:"#66a182", width:150, padding:10, borderRadius:10}}>
                  <View style={{flexDirection:"row",justifyContent:"center",alignContent:"center"}}>
                     
                      <Text style={{textAlign:"center", fontSize:15, fontWeight:"600", color:"#fff"}}>
                          OK
                      </Text>
                  </View>
                 
          </TouchableRipple>
          }
        </View>
      </View>
    );
};
export default ThongBaoNapTien;