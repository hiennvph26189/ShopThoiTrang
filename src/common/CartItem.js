import { View, Text, Image, TouchableOpacity } from "react-native"
import React from "react";

const CartItem = ({ item, onRemoteItem, onAddWishlist }) => {
    return (
        <TouchableOpacity style={{
            borderRadius: 20,
            elevation: 5,
            width:'94%',
            justifyContent:'center',
            alignItems:'center',
            backgroundColor: '#fff',
            marginLeft: 10,
            marginBottom: 10,
        }}>
            <View style={{
            width:'100%',
        }}>
            <Image source={item.image}
                style={{
                    width: '100%',
                    height: 140,
                    borderTopLeftRadius: 10,
                    borderTopRightRadius: 10,
                }} />
            <Text style={{
                marginLeft: 10,
                marginTop: 10,
                fontSize: 18,
                fontWeight: '600',
            }}>
                {item.name}</Text>
            <View style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                paddingLeft: 10,
                paddingRight: 10,
                marginTop: 10,
                alignItems: 'center',
            }}>
                <Text style={{
                    fontSize: 18,
                    fontWeight: '600',
                }}>{"$" + item.price}
                </Text>
                <TouchableOpacity
                    style={{
                        borderWidth: 1,
                        borderRadius: 10,
                        paddingLeft: 10,
                        paddingRight: 10,
                        paddingBottom: 7,
                        paddingTop: 7,
                    }} onPress={()=>{
                        onRemoteItem();
                    }}>
                    <Text>Remote Item</Text>
                </TouchableOpacity>
            </View>
            <TouchableOpacity
                style={{
                    width: 40,
                    height: 40,
                    backgroundColor: '#fff',
                    borderRadius: 20,
                    elevation: 5,
                    position: 'absolute',
                    top: 10,
                    right: 10,
                    justifyContent: 'center',
                    alignItems: 'center',
                }} onPress={()=>{
                    onAddWishlist(item);
                }}>
                <Image source={require('../imgs/heart.png')}
                    style={{ width: 24, height: 24, }}
                />
            </TouchableOpacity>
        </View>
        </TouchableOpacity>
        
    );
};

export default CartItem;