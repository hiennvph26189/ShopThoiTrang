import { Image, TextInput, View, Alert,Text} from "react-native";
import React, { useState,useEffect } from "react";
import { useNavigation,useIsFocused } from "@react-navigation/native";
import { ORDER_CARD_9PAY } from "../../api";
import axios from "axios";
const ThongBaoOrder = (props) => {
  const navigation = useNavigation()
    const route = props.route;
    let data = route.params.utf8String
    let data2 = route.params.data_order
   
    const [getData, setData] = useState({})
    const [text, setText] = useState();
   
    useEffect(()=>{
       setData(data)
      
       payOrder9Pay()
       
    },[])
    const price =(price)=>{
      let x = price;
      x = x.toLocaleString('it-IT', {style : 'currency', currency : 'VND'});
      return  x;
}
    const payOrder9Pay = async()=>{
      if(data && data.status == 5 ){
        await axios.post(ORDER_CARD_9PAY,data2).then(res=>{
                  }).catch(err=>{console.log(err)});
       }
    }
   
    return (
        <View >
          {data.status == 5?
            <Text>Bạn đã thanh toán thành công với tông số tiền là: {price(data2.tongTien)}</Text>

          :
            <Text>Giao dịch thất bại</Text>
        }
            
        
        </View>
    )
}
export default ThongBaoOrder;