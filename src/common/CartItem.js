    import { View, Text, Image, TouchableOpacity,Pressable,StyleSheet } from "react-native"
import React from "react";
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {GET_CART_USER,POST_CART_USER,GETALLPRODUCTS,DELETE_CARTU_SER,LIST_SIZE_IN_CART_PRODUCT} from "../../api"
import { useNavigation,useIsFocused } from "@react-navigation/native";
import SelectDropdown from 'react-native-select-dropdown'
import FontAwesome from "react-native-vector-icons/FontAwesome"
import axios from "axios";

import {useDispatch, useSelector} from 'react-redux';
import { useEffect,useState } from "react";
const CartItem = (props) => {
    const navigation = useNavigation()
    const [soLuong,setSoLuong] = useState(0)
    const isFocused = useIsFocused()
    const [itemProduct,setItemProduct]= useState([])
    const [itemProducts,setItemProducts]= useState({})
    const [itemCarrt,setItemCarrt]= useState({})
    const [itemSize,setItemSize]= useState({})
    const [arrProducts,setArrProducts]= useState([])
    const [idSP,setIdSp] = useState()
    const info = useSelector(state => state.Reducers.arrUser);
    const [size,setSize] = useState('')
    const [numberSize,setNumberSize] = useState(0)
    const [arrSize,setArrSize] = useState([])
    const countries = ["36", "37", "38", "39","40","41","42","43","44","45"]
    let item = props.item1
    let loaditemChill = props.loaditemChill
    const loadAllProducts = async (id) => {
      
        await axios.get(GETALLPRODUCTS).then((res) => {

            if (res && res.data.errCode === 0) {
               
                setArrProducts(res.data.totalProducts)
                if(res.data.totalProducts){
                    res.data.totalProducts.map((item,index)=>{
                        if(item.id==props.item1.ipSanPham){
                            setItemProduct(item)  
                        }
                    })
                }
            }
        }).catch((error) => { console.log(error) });
    }
    const loadDataCartItem = async()=>{
        await axios.get(`${LIST_SIZE_IN_CART_PRODUCT}?id_cart=${item.id}&id_product=${item.ipSanPham}`).then((res) => {
           
            if (res.data.errCode === 0) {
                
                setItemCarrt(res.data.data.carts[0])
                setItemProducts(res.data.data.products[0])
                
                setItemSize(res.data.data.sizes[0].size)
                
                const outputArray = Object.entries(res.data.data.sizes[0].size)
                .filter(([key, value]) => value !== 0)
                .map(([key]) => key);
         
                    // Nếu có, set state cho numberSize với giá trị của size đó
                    setNumberSize(res.data.data.sizes[0].size[item.size]);
                    
                  
                
                setArrSize(outputArray)
            }
                
        }).catch((error) => { console.log(error) });
    }
    useEffect(()=>{
        if(loaditemChill){
            setSize(props.item1.size)
           
            loadDataCartItem()
            setSoLuong(props.item1.soLuong)
    
            loadAllProducts()
        }else{
            setSize(props.item1.size)
        loadDataCartItem()
        setSoLuong(props.item1.soLuong)
    
        loadAllProducts()
        }
        
        setSize(props.item1.size)
        loadDataCartItem()
        setSoLuong(props.item1.soLuong)
    
        loadAllProducts()
       
    },[loaditemChill])

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
    const loadDataCartItem2 = async()=>{
        props.loadDataCartItem()
   }
   const onRemoteItem2 = async(id)=>{
  
         props.deteleItem(id)
    }
    const loadItem = async(id)=>{
        props.loadDataCartItem()
     
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
    const defaultIndex = countries.findIndex((item) => item === "40");
    const truSoLuong =(id)=>{
        
        let count = soLuong 
        count = count -1
        setSoLuong(count)
        props.updateCart(id,count,size)

        
    }
  
    handleDetailProduct = (id)=>{
        navigation.navigate('Chi tiết sản phẩm',{id: id});
    }
    return (
        
        <TouchableOpacity onPress={()=>{}} style={{
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
               <Image source={{uri:showImage(itemProducts.image)}}
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
                {itemProducts.tenSp}</Text>
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
                    <TouchableOpacity onPress={()=>{truSoLuong(props.item1.id)}}  style={{
                        marginLeft:10,
                        marginRight:10,
                        flexDirection:"row",
                        justifyContent:"center",
                        alignItems: "center",
                      
                    }}>
                        <FontAwesome
                            size={28}
                            name= "minus-square-o"
                            />
                    </TouchableOpacity>
                    :
                    <TouchableOpacity  style={{
                       
                        marginLeft:10,
                        marginRight:10,
                        flexDirection:"row",
                        justifyContent:"center",
                        alignItems: "center",
                        borderRadius:5,
                        
                    }}>
                       <FontAwesome
                            size={27}
                            name= "minus-square"
                            />
                           
                    </TouchableOpacity>
                   
                }
                    
                    <Text style={{
                        fontSize:17,fontWeight:"600"
                         }}>{soLuong}</Text>
                         {soLuong < numberSize?
                            <TouchableOpacity onPress={()=>{congSoLuong(props.item1.id,itemProducts.soLuong)}} style={{
                               
                                marginLeft:10,
                               
                                marginRight:10,
                                flexDirection:"row",
                                justifyContent:"center",
                                alignItems: "center",
                               
                            }}>
                                 <FontAwesome
                                size={28}
                                name= "plus-square-o"
                                />
                            </TouchableOpacity>
                            :
                            <TouchableOpacity  style={{
                               
                               
                                marginLeft:10,
                                flexDirection:"row",
                                marginRight:10,
                                justifyContent:"center",
                                alignItems: "center",
                              
                               
                            }}>
                                <FontAwesome
                                size={26}
                                name= "plus-square"
                                />
                            </TouchableOpacity>
                         }
                    
                </View>
               
                 <View style={{flexDirection:"row",alignItems:"center"}}>
                    <Text style={{fontWeight:"600",fontSize:15}}>
                        Size:  
                    </Text>
                    <Text> </Text>
                    <SelectDropdown
                    buttonStyle={{ width: 75, fontSize: 16,height: 30 ,marginLeft:10 }}
                    data={arrSize}
                    dropdownStyle={{ width: 100, fontSize: 16,marginRight:20 }}
                    defaultButtonText={size}
                    defaultIndex={defaultIndex}
                    onSelect={(selectedItem, index) => {
                        props.updateCart(props.item1.id,1,selectedItem)
                       
                            // Nếu có, set state cho numberSize với giá trị của size đó
                           
                            setNumberSize(itemSize[selectedItem]);
                          
                          setSoLuong(1)
                          
                        setSize(selectedItem)
                        
                    }}
                    buttonTextAfterSelection={(selectedItem, index) => {
                       
                        return selectedItem
                    }}
                    rowTextForSelection={(item, index) => {
                       
                        return item
                    }}
                />
                </View>
                
                
                
            </View>
            
        </View>
        
        </TouchableOpacity>
        
    );
};
const styles = StyleSheet.create({
   size:{
   
    padding:10,
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