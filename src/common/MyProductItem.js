import { View, Text, Image, TouchableOpacity } from "react-native"
import React from "react";
import axios from "axios";
import {GETCARTUSER,POSTCARTUSER} from "../../api"
import {useDispatch, useSelector} from 'react-redux'

const MyProductItem = ({ item,onAddToCart,onAddWishlist }) => {
    const info = useSelector(state => state.Reducers.arrUser);
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
   onAddToCart= async(item)=>{
        let id =  info.id
        if(id&&item.id){
            let data = {
                idUser: id,
                idSP: item.id,
                size: "M"
            }
            await axios.post(POSTCARTUSER,data).then(res =>{
                if(res.errCode === 0 ){
                    console.log("OK")
                }
            })
        }
    }
    return (
        <View style={{
            width: 250,
            height: 370,
            borderRadius: 10,
            elevation: 5,
            backgroundColor: '#fff',
            marginLeft: 20,
            marginBottom: 10,
        }}>
            <View style={{
                       
                        justifyContent:"center",
                        alignItems:"center"
                    }} >
                <Image source={{uri:showImage(item.image)}}
                    style={{
                        width: 200,
                        height: 200,
                        borderTopLeftRadius: 10,
                        borderTopRightRadius: 10,
                        justifyContent:"center",
                        alignItems:"center"
                    }} />
            </View>
            
           
            <Text style={{
                marginLeft: 10,
                marginTop: 10,
                fontSize: 16,
                fontWeight: '600',
            }}>
                {item.tenSp}</Text>
            <View style={{
                paddingLeft: 10,
                paddingRight: 10,
                marginTop: 20,
                marginBottom:10,
                
            }}>
                {item.sale <=0?
                 <Text style={{
                    fontSize: 18,
                    fontWeight: '600',
                    color: 'red'
                }}>
                    
                    {price(item.giaSanPham) }
                </Text>
                :   <View style={{flexDirection:'row',
                    justifyContent:"center",
                    alignItems:"center"
                }}>
                    <Text style={{
                        fontSize: 17,
                        fontWeight: '600',
                        color: 'red',
                       
                    }}>
                    
                    {price(item.giaSanPham-(item.giaSanPham *(item. sale/100)) ) }
                </Text>
                <Text style={{
                    fontSize:25,
                    marginLeft:10,
                    marginRight:10
                }}>-</Text>
                <Text style={{
                        fontSize: 15,
                        fontWeight: '600',
                        color: '#696969',
                        textDecorationLine:'line-through'
                    }}>
                    
                    {price(item.giaSanPham ) }
                </Text>
                </View>
                    
                }
               
                <TouchableOpacity
                    style={{
                        borderWidth: 1,
                        borderRadius: 10,
                        paddingLeft: 10,
                        paddingRight: 10,
                        marginTop:10,
                        paddingBottom: 10,
                        paddingTop: 7,
                    }} onPress={()=>{
                        onAddToCart(item);
                    }}>
                    <Text style={{textAlign:"center"}}>Add to Cart</Text>
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
    );
};

export default MyProductItem;