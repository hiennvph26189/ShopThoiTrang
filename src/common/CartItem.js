import { View, Text, Image, TouchableOpacity,Pressable,StyleSheet } from "react-native"
import React from "react";
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {GETCARTUSER,POSTCARTUSER,GETALLPRODUCTS,DELETECARTUSER} from "../../api"
import { useNavigation,useIsFocused } from "@react-navigation/native";
import SelectDropdown from 'react-native-select-dropdown'
import axios from "axios";
import {useDispatch, useSelector} from 'react-redux';
import { useEffect,useState } from "react";
const CartItem = (props) => {
    const [soLuong,setSoLuong] = useState(0)
    const isFocused = useIsFocused()
    const [itemProduct,setItemProduct]= useState([])
    const [arrProducts,setArrProducts]= useState([])
    const [idSP,setIdSp] = useState()
    const info = useSelector(state => state.Reducers.arrUser);
    const [size,setSize] = useState('')
    const countries = ["Egypt", "Canada", "Australia", "Ireland"]

    const loadAllProducts = async (id) => {
        await axios.get(GETALLPRODUCTS).then((res) => {

            if (res && res.data.errCode === 0) {
                //console.log(res.data.products,"OK")
                setArrProducts(res.data.products)
                if(res.data.products){
                    res.data.products.map((item,index)=>{
                        if(item.id==props.item1.ipSanPham){
                            setItemProduct(item)  
                        }
                    })
                }
            }
        }).catch((error) => { console.log(error) });
    }
    useEffect(()=>{
        setSoLuong(props.item1.soLuong)
        setSize(props.item1.size)
        loadAllProducts()
       
    },[])
    
   
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
   
   const onRemoteItem2 = async(id)=>{
         props.deteleItem(id)
    //    await axios.delete(`${DELETECARTUSER}?id=${id}`).then(res=>{
    //         if(res.data.errCode === 0){
                
    //             props.onList("OK")
    //         }
    //    })
    // console.log(id)
    }
    CheckID = (id)=>{
        props.checkid(id)
    }
    const congSoLuong =(id,soLuongSanPham)=>{
        let count = soLuong 
        count = count +1
        setSoLuong(count)
        
        props.updateCart(id,count,size)

        
    }
    const truSoLuong =(id)=>{
        let count = soLuong 
        count = count -1
        setSoLuong(count)
        props.updateCart(id,count,size)

        
    }
    const sizeM = (id)=>{
        setSize("M")
       
        props.updateCart(id,soLuong,"M")
    }
    const sizeL = (id)=>{
        setSize("L")
        props.updateCart(id,soLuong,"L")
    }
    const sizeXL = (id)=>{
        setSize("XL")
        props.updateCart(id,soLuong,"XL")
    }
    const sizeXXL = (id)=>{
        setSize("XXL")
        props.updateCart(id,soLuong,"XXL")
    }
    return (
        
        <TouchableOpacity onPress={()=>{CheckID(props.item1.id)}} style={{
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
               <Image source={{uri:showImage(itemProduct.image)}}
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
                        onRemoteItem2(props.item1.id);
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
                {itemProduct.tenSp}</Text>
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

                    {price(props.item1.thanhTien)}
                </Text>

                <View style={{
                    flexDirection:"row",
                }}>
                    {soLuong >1?
                    <Pressable onPress={()=>{truSoLuong(props.item1.id)}}  style={{
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
                    :
                    <Pressable  style={{
                        width:25,
                        height:25,
                        borderColor: "black",
                        borderWidth: 1,
                        marginLeft:10,
                        marginRight:10,
                        position: "relative",
                        alignContent: "center",
                        borderRadius:5,
                        backgroundColor:"#ccc"
                    }}>
                        <Text style={{
                            textAlign:"center",
                            position:"absolute",
                            top:"-80%",
                            right:6,
                            
                            fontSize:40
                        }}>-</Text>
                    </Pressable>
                   
                }
                    
                    <Text style={{
                        fontSize:17,fontWeight:"600"
                         }}>{soLuong}</Text>
                         {soLuong < itemProduct.soLuong?
                            <Pressable onPress={()=>{congSoLuong(props.item1.id,itemProduct.soLuong)}} style={{
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
                            :
                            <Pressable  style={{
                                width:25,
                                height:25,
                                borderColor: "black",
                                borderWidth: 1,
                                marginLeft:10,
                                position: "relative",
                                marginRight:10,
                                justifyContent: "center",
                                alignContent: "center",
                                borderRadius:5,
                                backgroundColor:"#ccc"
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
                         }
                    
                </View>
                <View style={{flexDirection:"row"}}>
                      <Pressable onPress={()=>{sizeM(props.item1.id)}}  style={[styles.size,{backgroundColor: size=="M"?"#ccc":"#fff"}]}>
                        <Text style={styles.textSize}>M</Text>
                    </Pressable>   
                    <Pressable  onPress={()=>{sizeL(props.item1.id)}} style={[styles.size,{backgroundColor: size=="L"?"#ccc":"#fff"}]}>
                        <Text style={styles.textSize}>L</Text>
                    </Pressable  >
                    <Pressable  onPress={()=>{sizeXL(props.item1.id)}} style={[styles.size,{backgroundColor: size=="XL"?"#ccc":"#fff"}]}>
                        <Text style={styles.textSize}>XL</Text>
                    </Pressable >
                    <Pressable  onPress={()=>{sizeXXL(props.item1.id)}} style={[styles.size,{backgroundColor: size=="XXL"?"#ccc":"#fff"}]}>
                        <Text style={styles.textSize}>XXL</Text>
                    </Pressable>
                </View>
                
            </View>
            
        </View>
        
        </TouchableOpacity>
        
    );
};
const styles = StyleSheet.create({
   size:{
    width:36,
    padding:7,
    borderColor:"#000",
    borderWidth:1,
    borderRadius:3,
    marginRight: 2
   },
textSize:{
    fontSize:11,
    textAlign: "center"
}
})
export default CartItem;