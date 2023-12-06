import { Text, TouchableOpacity,View } from "react-native";
import React, { useEffect,useState } from "react";
import { useNavigation,useIsFocused } from "@react-navigation/native";
import {GET_ALL_USER_ORDERS,HUY_USER_ORDERS,CHECK_STAR_PRODUCT} from "../../api"
import Star from "./Star";
import axios from "axios";
const ButtonVote = (props) => {
    
     const index = props.index
     const id_member = props.id_member
     const id_sp = props.id_sp
     const id_donhang = props.id_donhang
     const id_cart = props.id_cart
    const navigation = useNavigation();
    const [checkVote,setCheckVote] = useState(false)
    const [rating, setRating] = useState(5);
    const checkVoteStar = async()=>{
        console.log(id_donhang);
        await axios.get(`${CHECK_STAR_PRODUCT}?id_member=${id_member}&id_sp=${id_sp}&id_donhang=${id_donhang}&id_cart=${id_cart}`).then((res)=>{
            console.log(res.data)
            if(res.data.errCode === 0){
                setCheckVote(true)
                setRating(res.data.numberStar)
            }else if(res.data.errCode ===2){
                setCheckVote(false)
            }
        }).catch((err)=>{console.log(err)})
    }
    useEffect(()=>{
        checkVoteStar()
       

    },[])
    getDanhGia = (id_member,id_sp,id_donhang,id_cart)=>{
        navigation.navigate('Đánh giá sản phẩm',{id_member: id_member,id_sp: id_sp,id_donhang: id_donhang,id_cart: id_cart});
        
    }
    return (
        <>
            {checkVote == true ?
            <View style={{  padding:10, borderRadius:10, flexDirection:"row"}}>
                 <Text  style={{color:"#000", fontWeight:500}}>Đã đánh giá:   </Text>
                 <Text>{[...Array(5).keys()].map((index) => (
                    <Star key={index} selected={index < rating} sizeStar={15} checkView={"View"}/>
        ))}</Text>
             </View>
             : 
            <TouchableOpacity key={index} onPress={()=>{getDanhGia(id_member,id_sp,id_donhang,id_cart)}}  style={{  padding:10,backgroundColor:"red", borderRadius:10}}>
             <Text  style={{color:"#fff", fontWeight:500}}>Đánh giá   </Text>
            </TouchableOpacity>
        }
        </>
       
    );
};
export default ButtonVote;