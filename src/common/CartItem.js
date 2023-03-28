import { View, Text, Image, TouchableOpacity,Pressable } from "react-native"
import React from "react";
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

const CartItem = ({ item, onRemoteItem, onAddWishlist }) => {
    showImage = (image)=>{
        if(image){
           
            let list = JSON.parse(image)
           let url = ""
           for(let i = 0; i< list.length; i++){
                if(list[0]){
                    url = list[0]
                }
           }
           return url

        }
    }
    const price =(price)=>{
        let x = price;
        x = x.toLocaleString('it-IT', {style : 'currency', currency : 'VND'});
        return  x;
}
    return (
        <TouchableOpacity style={{
            borderRadius: 20,
            elevation: 5,
            width:'95%',
            justifyContent:'center',
            alignItems:'center',
            backgroundColor: '#fff',
            marginLeft: 10,
            marginTop: 10,
            marginRight:50,
            position: 'relative',
            paddingBottom:20,
            marginBottom: 10,
        }}>
            <View style={{
            width:'100%',
        }}>
            <View style={{
                       
                       justifyContent:"center",
                       alignItems:"center"
                   }} >
               <Image source={{uri:showImage(item.image)}}
                   style={{
                       width: 250,
                       height: 200,
                       borderTopLeftRadius: 10,
                       borderTopRightRadius: 10,
                       justifyContent:"center",
                       alignItems:"center"
                   }} />
                   <TouchableOpacity
                    style={{
                        position:'absolute',
                        top:5,
                        right:5,
                        
                        width:35,
                        height:35,
                        justifyContent:"center",
                        alignContent:"center",
                        borderWidth: 1,
                        borderRadius: 50,
                       
                        
                        
                    }} onPress={()=>{
                        onRemoteItem();
                    }}>
                    <Text style={{
                        textAlign: "center",
                        fontSize:20,
                        fontWeight: "bold",color:"red"
                    }}>X</Text>
                </TouchableOpacity>
           </View>
            <Text style={{
                marginLeft: 10,
                marginTop: 10,
                fontSize: 16,
                fontWeight: '600',
            }}>
                {item.tenSp}</Text>
            <View style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                paddingLeft: 10,
                paddingRight: 10,
                marginTop: 10,
                alignItems: 'center',
            }}>
                <Text style={{
                    fontSize: 16,
                    fontWeight: '600',
                }}>

                    {item.sale <=0 ?price(item.giaSanPham):price(item.giaSanPham-(item.giaSanPham *(item. sale/100)) )}
                </Text>

                <View style={{
                    flexDirection:"row",
                }}>
                    <Pressable style={{
                        width:25,
                        height:25,
                        borderColor: "black",
                        borderWidth: 1,
                        marginLeft:10,
                        marginRight:10,
                        position: "relative",
                        alignContent: "center",
                        borderRadius:5
                    }}>
                        <Text style={{
                            textAlign:"center",
                            position:"absolute",
                            top:"-80%",
                            right:6,
                            
                            fontSize:40
                        }}>-</Text>
                    </Pressable>
                    <Text style={{
                        fontSize:17,fontWeight:"600"
                    }}>1</Text>
                    <Pressable style={{
                        width:25,
                        height:25,
                        borderColor: "black",
                        borderWidth: 1,
                        marginLeft:10,
                        position: "relative",
                        marginRight:10,
                        justifyContent: "center",
                        alignContent: "center",
                        borderRadius:5
                    }}>
                        <Text
                            style={{
                                textAlign:"center",
                                position:"absolute",
                                top:"-40%",
                                right:4,
                                
                                fontSize:28
                            }}
                        >+</Text>
                    </Pressable>
                </View>
                <View>
                    <Text>Sze</Text>
                </View>
                
            </View>
            
        </View>
        
        </TouchableOpacity>
        
    );
};

export default CartItem;