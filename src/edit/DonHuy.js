import {  View,ScrollView,FlatList,Alert,Text,RefreshControl,StyleSheet,Image ,Pressable} from "react-native";
import axios from "axios";
import {GET_ALL_USER_ORDERS,HUY_USER_ORDERS,DELETE_ORDERS} from "../../api"
import {React,useState,useEffect} from "react";
import { useNavigation,useIsFocused } from "@react-navigation/native";
import {useDispatch, useSelector} from 'react-redux'
import Moment from 'moment';
import FontAwesome from "react-native-vector-icons/FontAwesome";
import vi from "moment/locale/vi";
import fr from "moment/locale/fr";
const DonHuy = () => {
    const isFocused = useIsFocused()
    const navigation = useNavigation()
    const [listDonHang,setListDonHang] = useState([])
    const [listCarts, setListCarts] = useState([])
    const [getAllProducts, setGetAllProducts] = useState([])
    const [getOrder,setGetOrder] = useState([])
    const info = useSelector((state)=> state.Reducers.arrUser)
    const [refreshing, setRefreshing] = useState(false);
    const [showDelete,setShowDelete] = useState(false)
    onRefresh = () => {
        getAllOrder()
        setRefreshing(true)
        
    }
    const getAllOrder = async()=>{
        let arr = []
        await axios.get(`${GET_ALL_USER_ORDERS}?id=${info.id}`).then((res)=>{
            
            if(res.data.errCode === 0){
                setListDonHang(res.data.getDonHuy)
                setListCarts(res.data.getCarts)
                setGetAllProducts(res.data.getAllProducts)    
                setRefreshing(false)
            }
        }).catch((err)=>{console.log(err)})
    }
    // const checkStatus = () => {
    //     let arr = []
    //     listDonHang.map((item)=>{
    //         if(item.status===0||item.status===5){
    //             arr.push(item)
    //         }
    //     })
    //    setGetOrder([...arr])
    // }
  
    const handleHuyDon = (id)=>{
        data = {
            id: id,
        }
        if(id){
            Alert.alert('Xác nhận hủy đơn hàng', 'Bạn có chắc muốn hủy đơn hàng này', [
                {
                  text: 'Cancel',
                  onPress: () => console.log('Cancel Pressed'),
                  style: 'cancel',
                },
                {text: 'OK', onPress: async() => {
                    await axios.put(HUY_USER_ORDERS,data).then((res) => {
                        if(res.data.errCode == 0){
                            Alert.alert('Thông báo', 'Đơn hàng đã được hủy, bạn hãy chờ bên Shop duyệt hủy đơn hàng', [
                                {text: 'OK', onPress: () => {
                                    getAllOrder()
                                }},
                              ]);
                        }else{
                            alert("Đơn hàng không tồn tại")
                        }

                     }).catch((err) => {console.log(err)});
                }},
              ]);
        }

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
   
    handleShowDelete = (id)=>{
        Alert.alert('Delete orders', 'Bạn có chắc muốn xóa đơn hàng này', [
            {
              text: 'Cancel',
              onPress: () => console.log('Cancel Pressed'),
              style: 'cancel',
            },
            {text: 'OK', onPress: async() => {
                await axios.delete(`${DELETE_ORDERS}?id=${id}`).then((res) => {
                    if(res.data.errCode == 0){
                        Alert.alert('Thông báo', 'Đơn hàng đã được Xóa', [
                            {text: 'OK', onPress: () => {
                                getAllOrder()
                            }},
                          ]);
                    }else{
                        alert("Đơn hàng không tồn tại")
                    }

                 }).catch((err) => {console.log(err)});
            }},
          ]);
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
                    
                       
                        <Pressable onPress={()=>{orderDetail(item.id)}} onLongPress={()=>{item.status == 5&&handleShowDelete(item.id)}} key={item.id}  style={{backgroundColor:"#fff",borderRadius:10,marginLeft:5,marginTop:10,marginRight:5,padding:7,justifyContent:"space-between"}}>
                            
                            <View style={{justifyContent:"space-between",flexDirection:"row"}}>
                                <View></View>
                                <Text style={{color:"#A9A9A9",fontWeight:"600"}}> {formatDate(item.updatedAt )}</Text>
                            </View>
                            {list(item.idCart,item.tongTien)}
                            <View style={{borderBottomColor:"#ccc",borderBottomWidth:.7, padding:5}}>
                            
                                <Text style={{fontWeight:"600",color:item.status === 4?"#FF0000 ":"#008000"}}>{item.status === 4?"Đang xác nhận hủy đơn":`Đã hủy đơn, tiền của bạn đã được hoàn lại:  +${price(item.tongTien)} `} </Text>
                        
                                
                            </View>
                            <View style={{flexDirection:"row", justifyContent:"space-between",alignItems:"center",padding:5}}>
                                
                            <Text style={{fontWeight:"600"}}>Số Sản phẩm: {tongSoSanPham(item.idCart)}</Text>
                            <Text style={{fontSize:18, fontWeight:"700",textDecorationLine:item.status === 5?"line-through":"none"}}>Tổng: <Text style={{fontSize:17,color:"#B22222"}}>{price(item.tongTien)}</Text> </Text>
                            </View>
                        
                            
                        </Pressable>  
                  
                )
            })}
        </ScrollView>
    )
}
export default DonHuy;