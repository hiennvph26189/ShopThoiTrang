import {  View,ScrollView,FlatList,Alert,Text,RefreshControl,TouchableOpacity,Image ,Pressable} from "react-native";
import axios from "axios";
import {GET_ALL_USER_ORDERS,HUY_USER_ORDERS,CHECK_STAR_PRODUCT} from "../../api"
import {React,useState,useEffect} from "react";
import { useNavigation,useIsFocused } from "@react-navigation/native";
import {useDispatch, useSelector} from 'react-redux'
import Moment from 'moment';
import vi from "moment/locale/vi";
import fr from "moment/locale/fr";
import ButtonVote from "../common/ButtonVote";
const DonHoan = () => {
    const navigation = useNavigation()
    const isFocused = useIsFocused()
    const [listDonHang,setListDonHang] = useState([])
    const [listCarts, setListCarts] = useState([])
    const [getAllProducts, setGetAllProducts] = useState([])
    const [getOrder,setGetOrder] = useState([])
    const info = useSelector((state)=> state.Reducers.arrUser)
    const [refreshing, setRefreshing] = useState(false);
    onRefresh = () => {
        getAllOrder()
        setRefreshing(true)
        
    }
    const getAllOrder = async()=>{
        let arr = []
        await axios.get(`${GET_ALL_USER_ORDERS}?id=${info.id}`).then((res)=>{
            
            if(res.data.errCode === 0){
              
                setListDonHang(res.data.getDonHoan)
                setListCarts(res.data.getCarts)
                setGetAllProducts(res.data.getAllProducts)    
                setRefreshing(false)
            }
        }).catch((err)=>{console.log(err)})
    }
   
 
    
    useEffect(()=>{
        
        getAllOrder()
       

    },

    [isFocused])
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
    const formatDate= (date)=>{
        const newFr = Moment(date).locale("vi", fr).format("DD/MM/YYYY  HH:mm:ss");
        return newFr
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
     getSoLuong =(arr,id)=>{
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
      
        return list.length 
    }
     list = (id,tongtien,id_donhang)=>{
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
                    products.push({
                        ...product,
                       id_cart: item.id
                    }) 
                }
            })
        })
        getDanhGia = (id_member,id_sp,id_donhang,id_cart)=>{
            navigation.navigate('Đánh giá sản phẩm',{id_member: id_member,id_sp: id_sp,id_donhang: id_donhang,id_cart: id_cart});
            
        }
       
        return (
            products.map((item,index)=>{
                return (
                    <View key={index} style={{borderBottomColor:"#ccc",borderBottomWidth:.7}}>
                        <View style={{flexDirection:"row",margin:5, }}>
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
                        <View style={{flexDirection:"row",justifyContent:"flex-end",marginTop:5, marginBottom:5}}>
                        
                        {/* <TouchableOpacity onPress={()=>{getDanhGia(info.id,item.id,id_donhang,item.id_cart)}} key={index} style={{  padding:10,backgroundColor:"red", borderRadius:10}}>
                            <Text  style={{color:"#fff", fontWeight:500}}>Đánh giá   </Text>
                        </TouchableOpacity> */}
                        </View>
                        
                    </View>
                    
                       
                    
                )

           })
        )
    }
   
    orderDetail = (id)=>{
      
        navigation.navigate('Chi tiết đơn hàng',{id: id,idUser: info.id,});
    } 
    return (
        <ScrollView 
                refreshControl={
                    <RefreshControl
                        refreshing={refreshing}
                        onRefresh={() => { onRefresh() }}
                    />
                }
                >
            {listDonHang.map((item,index)=>{
                return (
                    
                    <Pressable onPress={()=>{orderDetail(item.id)}}  key={item.id} style={{backgroundColor:"#fff",borderRadius:10,marginTop:15,marginLeft:5,marginRight:5,padding:7,justifyContent:"space-between"}}>
                       
                        <View style={{justifyContent:"space-between",flexDirection:"row"}}>
                            <View></View>
                            <Text style={{color:"#A9A9A9",fontWeight:"600"}}> {formatDate(item.updatedAt)}</Text>
                        </View>
                        {list(item.idCart,item.tongTien,item.id)}
                        <View style={{borderBottomColor:"#ccc",borderBottomWidth:.7, padding:5}}>
                        
                            <Text style={{fontWeight:"600",color:item.status === 10?"#006400":"green"}}>{item.status === 10?"Đơn đang trong quá trình xử lý hoàn tiền:":"Đơn hàng đã được hoàn tiền " +" +"+price(item.tongTien)} </Text>
                       
                            
                        </View>
                        <View style={{flexDirection:"row", justifyContent:"space-between",alignItems:"center",padding:5}}>
                            
                        <Text style={{fontWeight:"600"}}>Số Sản phẩm: {tongSoSanPham(item.idCart,item.id)}</Text>
                        <Text style={{fontSize:18, fontWeight:"700",textDecorationLine:item.status === 11?"line-through":"none"}}>Tổng: <Text style={{fontSize:17,color:"#B22222"}}>{price(item.tongTien)}</Text> </Text>
                        </View>
                        
                        
                        
                    </Pressable>
                )
            })}
        </ScrollView>
    )
}
export default DonHoan;