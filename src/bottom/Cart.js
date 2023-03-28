import { FlatList, Text, View,ScrollView, Pressable } from "react-native";
import React, { useState } from "react";
import CartItem from "../common/CartItem";
import {useDispatch, useSelector} from 'react-redux';
import { removeFormCart } from "../redux/action/Actions";
import Header from "../common/Header";

const Cart = () => {
    const [cartList, setCartList] = useState([]);
    const cartData = useSelector(state => state.Reducers.arrCart);
    
    const dispacth = useDispatch();
    // setCartList(cartData);
    return (
        <View style={{ flex: 1 }}>
             <Header
                    title={'Home'} />
            <FlatList data={cartData} renderItem={({item, index})=>{
                return(
                    <CartItem item={item} onRemoteItem={()=>{
                        
                         dispacth(removeFormCart(index));
                    }}/>
                )
            }}/>
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
                    >50000</Text>
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