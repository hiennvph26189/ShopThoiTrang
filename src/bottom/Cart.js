import { FlatList, Text, View,ScrollView, RefreshControl,Pressable } from "react-native";
import React, { useState,useEffect } from "react";
import CartItem from "../common/CartItem";
import {useDispatch, useSelector} from 'react-redux';
import { removeFormCart } from "../redux/action/Actions";
import Header from "../common/Header";
import {GETCARTUSER,POSTCARTUSER,GETALLPRODUCTS,DELETECARTUSER,UPDATECARTUSER} from "../../api"
import { useNavigation,useIsFocused } from "@react-navigation/native";
import axios from "axios";

const Cart = () => {
    const [refreshing, setRefreshing] = useState(false);
    const isFocused = useIsFocused()
    const [cartList, setCartList] = useState([]);
    const cartData = useSelector(state => state.Reducers.arrCart);
    const info = useSelector(state => state.Reducers.arrUser);
    const dispacth = useDispatch();
    const [load,setIsLoadding] = useState(false)
    const [arrProducts,setArrProducts] = useState()
    const [tongTiens,setTongTien] = useState(0)
    const loadAllProducts = async (id) => {
            await axios.get(GETALLPRODUCTS).then((res) => {
    
                if (res && res.data.errCode === 0) {
                    //console.log(res.data.products,"OK")
                    setArrProducts(res.data.products)
                    
                    setRefreshing(false)
                }
            }).catch((error) => { console.log(error) });
        }
    const price =(price)=>{
        let x = price;
        x = x.toLocaleString('it-IT', {style : 'currency', currency : 'VND'});
        return  x;
    }
    const listCart = async()=>{
        if(info.id){
            let idUser = info.id;
            await axios.get(`${GETCARTUSER}?id=${idUser}`).then(res=>{
                console.log(res.data.Carts,"ads;ak;dfk");
                if(res.data.errCode == 0){
                    setCartList(res.data.Carts)
                    tongTien(res.data.Carts)
                    setRefreshing(false)
                }
            })
        }
    }
    useEffect(()=>{
        listCart()
        loadAllProducts()
        
    },[isFocused])
    onRefresh = () => {
        setRefreshing(true)
        listCart()
        loadAllProducts()
    }
    // setCartList(cartData);
   const DeleteItemCart = async(id)=>{
  
           await axios.delete(`${DELETECARTUSER}?id=${id}`).then(res=>{
            if(res.data.errCode === 0){
                listCart()
                console.log(res.data.errMessage)
            }
       }).catch(err=>{console.log(err)});
   }
   const checkId = (id)=>{
    
   }
   const congSL = async(id,sl)=>{
        let data = {
            id: id,
            soLuong: sl
        }
        // console.log(data)
    await axios.put(UPDATECARTUSER,data).then(res=>{
        if(res.data.errCode === 0){
            listCart()
           
        }
   }).catch(err=>{console.log(err)});
   }
   const tongTien = (arr)=>{
        let tien = 0
        arr.map((item)=>{
            tien = tien + item.thanhTien
            
        })
        setTongTien(tien)
        
        
   }
   const truSL = async(id,sl)=>{
        let data = {
            id: id,
            soLuong: sl
        }
        // console.log(data)
    await axios.put(UPDATECARTUSER,data).then(res=>{
        if(res.data.errCode === 0){
            listCart()
           
        }
   }).catch(err=>{console.log(err)});
   }
    return (
        <View style={{ flex: 1 }}>
             <Header
            
                    title={'Home'} />
             <ScrollView
                refreshControl={
                    <RefreshControl
                        refreshing={refreshing}
                        onRefresh={() => { onRefresh() }}
                    />
                }
             >
                {cartList.map((item,index)=>{
                    return(
                        <CartItem key={item.id} item1={item} deteleItem ={DeleteItemCart} checkid = {checkId} congSL = {congSL} truSL = {truSL} tongTien = {tongTiens}
                    
                    />
                    )
                })}
             </ScrollView>

            
            <View style={{
               
                height:50,
                
                alignItems: 'center',
                flexDirection:'row',
                marginLeft:10,
                marginRight:10,
                marginTop:20,
                borderRadius:5,
                padding:10,
                justifyContent: 'space-between',
                
            }}>
                <View style={{
                    flexDirection:'row'
                }}>
                    <Text style={{
                        fontSize: 17,
                        fontWeight:'bold',
                    }}>Tổng: </Text>
                    <Text
                        style={{
                            color:'red',
                            fontSize: 17,
                            fontWeight:'bold',
                        }}
                    >{price(tongTiens)}</Text>
                </View>
                <View>
                    <Pressable style={{
                        borderColor: "#000",
                        borderWidth:1,
                        height:50,
                        width: 130,
                        justifyContent: "center",
                        alignItems: "center",
                        borderRadius:10,
                        backgroundColor: "#000",
                    }}>
                        <Text style={{
                            color: "#fff",
                            fontSize:17,
                            fontWeight: "bold",
                            
                        }}> Đặt Hàng</Text>

                    </Pressable>
                </View>
            </View>
            <View style={{height:80}}></View>
        </View>
    )
}
export default Cart;