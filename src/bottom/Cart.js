import { FlatList, Text, View } from "react-native";
import React, { useState } from "react";
import CartItem from "../common/CartItem";
import {useDispatch, useSelector} from 'react-redux';
import { removeFormCart } from "../redux/action/Actions";

const Cart = () => {
    const [cartList, setCartList] = useState([]);
    const cartData = useSelector(state => state.Reducers.arrCart);
    
    const dispacth = useDispatch();
    // setCartList(cartData);
    return (
        <View style={{ flex: 1 }}>
            <FlatList data={cartData} renderItem={({item, index})=>{
                return(
                    <CartItem item={item} onRemoteItem={()=>{
                        
                        dispacth(removeFormCart(index));
                    }}/>
                )
            }}/>
        </View>
    )
}
export default Cart;