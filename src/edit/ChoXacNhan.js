import {  View,RefreshControl,ScrollView,FlatList,Text,StyleSheet,Image } from "react-native";
import axios from "axios";
import {GET_ALL_USER_ORDERS} from "../../api"

import {React,useState,useEffect} from "react";
import { useNavigation,useIsFocused } from "@react-navigation/native";
import {useDispatch, useSelector} from 'react-redux'

const ChoXacNhan = () => {
    const isFocused = useIsFocused()
    const [listDonHang,setListDonHang] = useState([])
    const [listCarts, setListCarts] = useState([])
    const [getAllProducts, setGetAllProducts] = useState([])
    const info = useSelector((state)=> state.Reducers.arrUser)
    const getAllOrder = async()=>{
        
        await axios.get(`${GET_ALL_USER_ORDERS}?id=${info.id}`).then((res)=>{
            
            if(res.data.errCode === 0){
               
                setListDonHang(res.data.getOrders)
                setListCarts(res.data.getCarts)
                setGetAllProducts(res.data.getAllProducts)
            }
        }).catch((err)=>{console.log(err)})
    }
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
    getSize = (arr,id)=>{
        let size = ""
        arr.map((item)=>{
            if(item.ipSanPham === id){
                size = item.size
            }
        })
        
        return(
            size
        )
    }
     getSoLuong = (arr,id)=>{
        let soLuong = 0
        arr.map((item)=>{
            if(item.ipSanPham === id){
                soLuong = item.soLuong
            }
        })
       
        return(
            soLuong
        )
    }
    tongSoSanPham =(id)=>{
        let list = JSON.parse(id)
      let count = 0
        list.map((item)=>{
            listCarts.map((item2,inbiex)=>{
                if(item === item2.id){
                    count = count+1
                }
            }) 
        })
        return count
    }
     list = (id)=>{
        let list = JSON.parse(id)
       let IdSP = []
       let products = []
        list.map((item)=>{
            listCarts.map((item2)=>{
                if(item === item2.id){
                    IdSP.push(item2)
                }
            }) 
        })
        IdSP.map((item)=>{
            getAllProducts.map((product)=>{
                if(item.ipSanPham == product.id){
                    products.push(product) 
                }
            })
        })
        return (
            products.map((item,index)=>{
                return (
                    <View key={index}>
                        <View style={{flexDirection:"row",margin:5, borderBottomColor:"#ccc",borderBottomWidth:.7}}>
                            <Image
                               source={{uri:showImage(item.image)}} 
                               style={{width:50,height:50}}
                            />
                            <View style={{}}>
                                <Text style={{width:"80%",padding:6,alignItems:"center"}}>{item.tenSp}</Text>
                                <View style={{width:310, flexDirection:"row", justifyContent:"space-between"}}>
                                {item.sale <=0?
                                     <Text style={{
                                        fontSize: 15,
                                        fontWeight: '600',
                                        color: 'red'
                                    }}>
                                        
                                        {price(item.giaSanPham) }
                                    </Text>
                                    :
                                    <View style={{flexDirection:'row', marginLeft:4
                                   
                                   
                                }}>
                                     <Text style={{
                                        fontSize: 14,
                                        fontWeight: '600',
                                        color: '#696969',
                                        textDecorationLine:'line-through'
                                    }}>
                                    
                                    {price(item.giaSanPham ) }
                                </Text>
                                   
                                <Text style={{
                                    fontSize:18,
                                    marginLeft:5,
                                    marginRight:5
                                }}>-</Text>
                                <Text style={{
                                        fontSize: 15,
                                        fontWeight: '600',
                                        color: '#B22222',
                                       
                                    }}>
                                    
                                    {price(item.giaSanPham-(item.giaSanPham *(item. sale/100)) ) }
                                </Text>
                                </View>
                            }
                            <Text>Size: {getSize(IdSP,item.id)}</Text>
                            <Text >x{getSoLuong(IdSP,item.id)}</Text>
                                </View>
                               
                            </View>
                        </View>
                        
                    </View>
                    
                       
                    
                )

           })
        )
    }
    useEffect(()=>{
        
        getAllOrder()

    },

    [isFocused])
    
    return (
        <ScrollView>
            {listDonHang.map((item,index)=>{
                return (
                    
                    <View key={item.id} style={{backgroundColor:"#fff",borderColor:"#A9A9A9",borderWidth:.6,borderRadius:10,marginTop:15,marginLeft:5,marginRight:5,padding:7,justifyContent:"space-between"}}>
                       

                        {list(item.idCart,item.tongTien)}
                        <View style={{borderBottomColor:"#ccc",borderBottomWidth:.7, padding:5}}>
                        {item.status === 0&&
                            <Text style={{fontWeight:"600",color:"#FFA500"}}>Đang chờ xét duyệt</Text>
                        }
                            
                        </View>
                        <View style={{flexDirection:"row", justifyContent:"space-between",alignItems:"center",padding:5}}>
                            
                        <Text style={{fontWeight:"600"}}>Số Sản phẩm: {tongSoSanPham(item.idCart)}</Text>
                        <Text style={{fontSize:18, fontWeight:"700"}}>Tổng: <Text style={{fontSize:17,color:"#B22222"}}>{price(item.tongTien)}</Text> </Text>
                        </View>
                        
                        
                        
                    </View>
                )
            })}
        </ScrollView>
    )
}
export default ChoXacNhan;