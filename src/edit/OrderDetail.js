import { View,ScrollView,FlatList,Alert,Text,RefreshControl,StyleSheet,Image ,Pressable } from "react-native";
import axios from "axios";
import {GET_ALL_USER_ORDERS,CHI_TIET_ORDERS} from "../../api"
import { useNavigation,useIsFocused } from "@react-navigation/native";
import {React,useState,useEffect} from "react";
const OrderDetail = (props) => {
    const isFocused = useIsFocused()
    const [getAllProducts, setGetAllProducts] = useState([]) 
    const [listCarts, setListCarts] = useState([])
    const [getOrder, setOrder] = useState({})
    const [idCart,setIdCart] = useState("")
    const [IdSP,setIdSP] = useState([])
    const route = props.route;
    const idOder = route.params.id
    const idUser = route.params.idUser
    const getAllOrder = async()=>{
        let arr = []
        await axios.get(`${GET_ALL_USER_ORDERS}?id=${idUser}`).then((res)=>{
            
            if(res.data.errCode === 0){
                setListCarts(res.data.getCarts)
                setGetAllProducts(res.data.getAllProducts)   
                 
                // setRefreshing(false)
            }
        }).catch((err)=>{console.log(err)})
    }
    const getOrderDetails = async() =>{
        await axios.get(`${CHI_TIET_ORDERS}?id=${idOder}`).then((res)=>{
            
            if(res.data.errCode === 0){
                setOrder(res.data.detailOrder)
                setIdCart(res.data.detailOrder.idCart)
            }
        }).catch((err)=>{console.log(err)})
    }
    useEffect(()=>{
        
        getOrderDetails()
        getAllOrder()
        list()

    },[isFocused])
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
    const price =(price)=>{
        let x = price;
        x = x.toLocaleString('it-IT', {style : 'currency', currency : 'VND'});
        return  x;
}
 const list = ()=>{
     
        let list = JSON.parse(idCart)
       
       console.log(list,"aksdfakdf;");
        list.map((item)=>{
            listCarts.map((item2)=>{
                if(item === item2.id){
                    setIdSP({...item2})
                }
            }) 
        })
    //     IdSP.map((item)=>{
    //         getAllProducts.map((product)=>{
    //             if(item.ipSanPham == product.id){
    //                 products.push(product) 
    //             }
    //         })
    //     })
    //     return (
    //         products.map((item,index)=>{
    //             return (
    //                 <View  key={index}>
    //                     <View  style={{flexDirection:"row",margin:5, borderBottomColor:"#ccc",borderBottomWidth:.7}}>
    //                         <Image
    //                            source={{uri:showImage(item.image)}} 
    //                            style={{width:50,height:50}}
    //                         />
    //                         <View style={{}}>
    //                             <Text style={{width:"80%",padding:6,alignItems:"center"}}>{item.tenSp}</Text>
    //                             <View style={{width:310, flexDirection:"row", justifyContent:"space-between"}}>
    //                             {item.sale <=0?
    //                                  <Text style={{
    //                                     fontSize: 15,
    //                                     fontWeight: '600',
    //                                     color: 'red'
    //                                 }}>
                                        
    //                                     {price(item.giaSanPham) }
    //                                 </Text>
    //                                 :
    //                                 <View style={{flexDirection:'row', marginLeft:4
                                   
                                   
    //                             }}>
    //                                  <Text style={{
    //                                     fontSize: 14,
    //                                     fontWeight: '600',
    //                                     color: '#696969',
    //                                     textDecorationLine:'line-through'
    //                                 }}>
                                    
    //                                 {price(item.giaSanPham ) }
    //                             </Text>
                                   
    //                             <Text style={{
    //                                 fontSize:18,
    //                                 marginLeft:5,
    //                                 marginRight:5
    //                             }}>-</Text>
    //                             <Text style={{
    //                                     fontSize: 15,
    //                                     fontWeight: '600',
    //                                     color: '#B22222',
                                       
    //                                 }}>
                                    
    //                                 {price(item.giaSanPham-(item.giaSanPham *(item. sale/100)) ) }
    //                             </Text>
    //                             </View>
    //                         }
    //                         <Text>Size: {getSize(IdSP,item.id)}</Text>
    //                         <Text >x{getSoLuong(IdSP,item.id)}</Text>
    //                             </View>
                              
    //                         </View>
    //                     </View>
                        
    //                 </View>
                    
                       
                    
    //             )

    //        })
    //     )
    }
    
    return (
        <View style={styles.container}>
            <View style={{marginBottom:10,marginTop:5}}>
                <Text style={styles.thongtinkhachhnag}>Thông tin khách hàng</Text>
                <View style={styles.infoUser}>
                        <Text style={styles.textInfoUser}>Họ và tên:  <Text style={styles.textName}>Nguyễn Văn Hiển</Text></Text>
                        <Text style={styles.textInfoUser}>Số Điện thoại:  <Text style={styles.textName}>0373753158</Text></Text>
                        <Text style={styles.textInfoUser}>Địa chỉ nhận hàng:  <Text style={styles.textName}>Hải Dương</Text></Text>
                        <Text style={styles.textInfoUser}>Ngày đặt đơn:  <Text style={styles.textName}></Text></Text>
                        <Text style={styles.textInfoUser}>Tổng tiền:  <Text style={styles.textName}>{price(getOrder.tongTien?getOrder.tongTien:"")}</Text></Text>
                        <Text style={styles.textInfoUser}>Trạng thái đơn hàng:  <Text style={styles.textName}>100000</Text></Text>
                </View>
            </View>
            <View>
                <Text style={styles.thongtinkhachhnag}>Đơn hàng</Text>
                <ScrollView>
                    
                </ScrollView>
            </View>
        </View>
    )
}
export default OrderDetail;
const styles = StyleSheet.create({
    container:{
        flex: 1,
    },
    thongtinkhachhnag:{
        fontSize:20,
        padding:7,
        fontWeight:"700",
        borderBottomColor:'#000',
        borderBottomWidth:.7,
    },
    infoUser:{
        padding:5
    },
    textInfoUser:{
        fontSize:15,
        fontWeight: '500',
        lineHeight:25,
        color:'#444444',
        borderBottomColor:'#ccc',
        borderBottomWidth:.2,
        paddingBottom:5,
        paddingTop:5,
     
    },
    textName:{
        fontWeight:"600",
       color:"#000",
       
    }
})