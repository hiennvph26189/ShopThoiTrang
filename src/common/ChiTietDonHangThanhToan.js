import { Text, TouchableOpacity ,View,Linking,ScrollView,Image,BackHandler ,Alert,AppState,ToastAndroid } from "react-native";
import React, {useRef, useState,useEffect } from "react";
import { useNavigation,useIsFocused } from "@react-navigation/native";
import {useDispatch, useSelector} from 'react-redux'
import { GET_PRODUCT_CART_MEMBER,ITEM_ADDRESS_MEMBER,RESET_CART_ORDER,CONVERT_CODE_SHA,GET_CART_USER ,GETALLPRODUCTS,ORDER_CART_USER} from "../../api";
import axios from "axios";
import { onPress } from "deprecated-react-native-prop-types/DeprecatedTextPropTypes";
const ChiTietDonHangThanhToan = (props) => {
    const navigation = useNavigation()
    const isFocused = useIsFocused();
    const route = props.route;
    let item  = route.params
    let tongTiens = route.params.tongTiens
    let postData = route.params.postData
    let arrTenSp = route.params.arrTenSp
    let IP = route.params.IP
    const info = useSelector((state)=> state.Reducers.arrUser)
    const id_member = info.id
    const [arrProductCart , setArrProductCart] =  useState([])
    const [itemAddress , setItemAddress] =  useState({})
    const [loaiThanhToan , setLoaiThanhToan] =  useState('')
    const appState = useRef(AppState.currentState);
    const preventExit = useRef(false);
    React.useEffect(() => {
        const unsubscribe = navigation.addListener('blur', () => {
           
      });
    
      return unsubscribe;
    }, [navigation]);

    useEffect(() => {
      const handleAppStateChange = (nextAppState) => {
       
        if (appState.current === 'active' && nextAppState === 'background') {
          // App chuyển từ trạng thái active sang background
          // Chặn thoát ứng dụng
          preventExit.current = true;
          ToastAndroid.show('Ứng dụng đang chặn thoát', ToastAndroid.SHORT);
        } else if (appState.current === 'background' && nextAppState === 'active') {
          // App chuyển từ trạng thái background sang active
          // Cho phép thoát ứng dụng
          preventExit.current = false;
        }
  
        appState.current = nextAppState;
      };
  
      const backHandler = () => {
      
        if (preventExit.current) {
          // Nếu đang chặn thoát ứng dụng, hiển thị thông báo
          ToastAndroid.show('Ứng dụng đang chặn thoát', ToastAndroid.SHORT);
          return true; // Ngăn chặn hành động mặc định của nút back
        }
  
        return false; // Cho phép hành động mặc định của nút back
      };
  
      // Đăng ký sự kiện lắng nghe AppState
      const appStateSubscription = AppState.addEventListener('change', handleAppStateChange);
  
      // Đăng ký sự kiện lắng nghe nút back
      const backHandlerSubscription = BackHandler.addEventListener('hardwareBackPress', backHandler);
  
      return () => {
        // Hủy đăng ký sự kiện khi component unmount
        appStateSubscription.remove();
        backHandlerSubscription.remove();
      };
    }, []);
    const getProductCart = async () => {
        await axios.get(`${GET_PRODUCT_CART_MEMBER}?id_member=${id_member}`).then((res) => {
            
          if (res.data.errCode === 0) {
                setArrProductCart(res.data.data)   
          }
        }).catch((err) => { console.log(err) })
      }
      const getItemAddressMember = async () => {
        await axios.get(`${ITEM_ADDRESS_MEMBER}?id_member=${id_member}`).then((res) => {
           
          if (res.data.errCode === 0) {
            setItemAddress(res.data.itemAddress)   
          }
        }).catch((err) => { console.log(err) })
      }
    useEffect(()=>{
        getProductCart()
        getItemAddressMember()
        
    },[isFocused])
    useEffect(() => {
        const handleBackPress = () => {
           
          // Log ở đây khi người dùng ấn nút back
         alert("Vui lòng thanh toán hàng hoặc hủy đơn hàng")
          // Trả về true để ngăn chặn hành động mặc định của nút back
          return true;
        };
    
        // Đăng ký sự kiện khi component được mount
        BackHandler.addEventListener('hardwareBackPress', handleBackPress);
    
        // Hủy đăng ký sự kiện khi component bị unmount
        return () => {
          BackHandler.removeEventListener('hardwareBackPress', handleBackPress);
        };
      }, []);
    useEffect(() => {
       
        const handleDeepLink = async () => {
            const initialUrl = await Linking.getInitialURL();
            if (initialUrl) {

                // Xử lý URL và hiển thị cửa sổ alert dựa trên nội dung của URL
                handleUrl(initialUrl);
            }else{
                console.log("Đã hủy giao dịch")
            }
           
            // Lắng nghe sự kiện khi có liên kết sâu được mở
            Linking.addEventListener('url', ({ url }) => handleUrl(url));

            return () => {
                // Hủy đăng ký sự kiện khi component bị unmounted
              
                Linking.removeEventListener('url', handleUrl);
            };
        };
        
        handleDeepLink();
    }, [isFocused]);
    const post9Pay = (arrTenSp,tongTiens,IP) =>{
        let formdata = new FormData();

        formdata.append("name", `${arrTenSp}`)
        formdata.append("price", `${tongTiens}`)
        formdata.append("cookie_port", IP)


        axios({
            url: "https://shopacc12312.000webhostapp.com/thongtinkhachhang.php",
            method: 'POST',
            data: formdata,
            headers: {
                Accept: 'application/json',
                'Content-Type': 'multipart/form-data',
                'Authorization': 'Basic YnJva2VyOmJyb2tlcl8xMjM='
            }
        })
            .then(function (response) {

                Linking.openURL(response.data.redirectUrl);
            })
            .catch(function (error) {
                console.log("error from image :", error);
            })
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
           return list[0]

        }
    }
 
  
    
      
    const thanhToan = async(postData,tongTiens,arrTenSp,IP,itemAddress)=>{
        if(itemAddress){
            if(loaiThanhToan == "9Pay"){
                post9Pay(arrTenSp,tongTiens,IP)
               
           }else if(loaiThanhToan == "TK"){
                if(postData){
                    let arrCart = JSON.parse(postData.cartList)
                let arrIdCart = []
                arrCart.map((item,index)=>{
                    arrIdCart.push(item.id)
                })
               
                    if(tongTiens <info.tienTk){
                      
                        data = {
                            idCart:JSON.stringify(arrIdCart),
                            idUser: info.id,
                            tongTien: tongTiens,
                        }
                        await axios.post(ORDER_CART_USER,data).then(res=>{
                            if(res.data.errCode === 0){
                                Alert.alert('Đặt Đơn thành công', 'Đơn hàng của bạn đã được đặt, hãy chờ bên shop xét duyệt', [
    
                                    {text: 'OK', onPress: () =>{
                                        navigation.navigate("Home")
                                    }},
                                  ]);
                            }else{
    
                                alert(res.data.errMessage)
                            }
                        }).catch(err=>{console.log(err)});
                    }else{
                        return alert("Số dư của bạn không đủ, hãy nạp thêm tiền")
                    }
    
                }else{
    
                    return alert("Không có sản phẩm nào trong giỏ hàng"); 
                }
           }else{
                return alert("Bạn chưa chọn hình thức thanh toán")
           }
        }else{
            return alert("Vui lòng chọn đại chỉ giao hàng")
        }
       
    }
    const price =(price)=>{
        let x = price;
        x = x.toLocaleString('it-IT', {style : 'currency', currency : 'VND'});
        return  x;
    }
    const huyThanhToan = (postData,id_member)=>{
        Alert.alert('Thông báo', "Bạn có chắc muốn hủy đơn hàng này không" , [
            {text: 'OK', onPress: async() => {
                let arrCart = JSON.parse(postData.cartList)
                let arrIdCart = []
                arrCart.map((item,index)=>{
                    arrIdCart.push(item.id)
                })
                
                let post_data = {
                    idCart: JSON.stringify(arrIdCart),
                    idUser: id_member
                }
            
                  await axios.post(RESET_CART_ORDER,post_data).then(res=>{
        
                  }).catch(err=>{console.log(err)});
                  navigation.goBack();
            }},
            {text: 'Cancel' }
          ]);
         
    }
    const handleUrl = async (url) => {
        // Kiểm tra và xử lý dữ liệu từ URL
        // Nếu có dữ liệu, hiển thị cửa sổ alert

        if (url.includes('?code=')) {
            const data = url.split('?code=')[1];
            let utf8String = ""
            
            await axios.get(`${CONVERT_CODE_SHA}?data=${data}`).then(res => {

                utf8String = res.data
            }).catch((error) => { console.log(error.message) });


            let idUser = info.id;
            let ids = []
            let arrProducts2 = []
            await axios.get(`${GET_CART_USER}?id=${idUser}`).then(res => {

                if (res.data.errCode == 0) {
                    ids = res.data.Carts

                }
            }).catch((error) => { console.log(error.message) });
            await axios.get(GETALLPRODUCTS).then((res) => {

                if (res && res.data.errCode === 0) {

                    arrProducts2 = res.data.totalProducts


                }
            }).catch((error) => { console.log(error.message) });
            let tien = 0
            let arrIdProducts = []
            let arrTenSp = ""

            if (ids.length > 0) {
                ids.map((item) => {
                    arrIdProducts.push(item.id)
                    tien = tien + item.thanhTien

                    arrProducts2.map((product, index) => {
                        if (item.ipSanPham === product.id) {
                            arrTenSp += product.tenSp + ' (x' + item.soLuong + " size: " + item.size + ")" + "\n"
                        }
                    })

                })
                let ib = JSON.stringify(arrIdProducts)

                const data_order = {
                    idCart: ib,
                    idUser: info.id,
                    tongTien: tien,
                  
                }
                
                navigation.navigate('Thông báo Order', { utf8String, data_order, arrTenSp, })
            }

        }else{
            console.log("Thất bại");
        }
    };
    return (
       <View> 
        <View style={{
            
            height: 70,
            justifyContent: "center",
            alignItems:"center",
            flexDirection:"row",
            borderBottomWidth:0.2,
            borderBottomColor:'#8e8e8e',
            backgroundColor:'#fff',
            paddingTop:10,
            marginTop:10
            

        }}>
          
            <Text style={{
                fontWeight:'600',
                fontSize:20,
                color:'#000',
                marginLeft:15,
                marginTop:15,
                textAlign:'center',
                }}>Chi tiết đơn hàng thanh toán </Text>
        
            
        </View>
            <View style={{maxHeight:500}}>
                <ScrollView>
                    {arrProductCart && arrProductCart.map((item,index)=>{
                        return (
                            <>
                                <View key={index} style={{borderBottomColor:"#ccc",borderBottomWidth:.7}}>
                                    <View style={{flexDirection:"row",margin:5, }}>
                                        <Image
                                        source={{uri:JSON.parse(item.image)[0]}} 
                                        style={{width:50,height:50}}
                                        />
                                        <Text>{}</Text>
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
                                        <Text>Size: {item.size}</Text>
                                        <Text >x{item.soLuong}</Text>
                                            </View>
                                        
                                        </View>
                                    </View>
                                    <View style={{flexDirection:"row",justifyContent:"flex-end",marginTop:5, marginBottom:5}}>
                                    
                                    {/* <TouchableOpacity onPress={()=>{getDanhGia(info.id,item.id,id_donhang,item.id_cart)}} key={index} style={{  padding:10,backgroundColor:"red", borderRadius:10}}>
                                        <Text  style={{color:"#fff", fontWeight:500}}>Đánh giá   </Text>
                                    </TouchableOpacity> */}
                                    </View>
                                    
                                </View>
                            </>
                        )
                    })

                    }
                </ScrollView>
            </View>
            <View style={{marginTop:20}}>
                 <Text style={{color:"#B22222", fontSize:20, textAlign:'right', marginRight:15, fontWeight:600}}>Tổng: {price(tongTiens)}</Text>
            </View>
            <View style={{padding:10}}>
                    <View style={{marginTop:5}}>
                        <Text style={{fontSize:16}}>- Phương thức thanh toán:</Text>
                        <View style={{flexDirection:"row", justifyContent:"space-evenly", alignItems:"center", marginTop:10}}>
                            <TouchableOpacity style={{padding:10,paddingLeft:20, paddingRight:20, borderWidth:1, borderColor:"green", borderRadius:5,backgroundColor:loaiThanhToan == "9Pay"?"#FFA500":null}} onPress={()=>{setLoaiThanhToan("9Pay")}}>
                                    <Text style={{fontWeight:500}}>Ví 9Pay</Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={{padding:10,paddingLeft:20, paddingRight:20, borderWidth:1, borderColor:"green", borderRadius:5,backgroundColor:loaiThanhToan == "TK"?"#FFA500":null}} onPress={()=>{setLoaiThanhToan("TK")}}>
                                    <Text style={{fontWeight:500}}>Tiền trong tài khoản</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                    <View style={{marginTop:10 , borderBottomWidth:1, paddingBottom:10,borderBottomColor:"#ccc"}}>
                        <Text style={{fontSize:16}}>- Địa chỉ nhận hàng:</Text>
                        <View style={{marginTop:5}}>
                            {itemAddress &&
                                <>
                                    <Text style={{fontSize:15, fontWeight:500}}> {itemAddress.hoTen}  </Text>
                                    <Text style={{fontSize:15, fontWeight:500}}> {itemAddress.soDienThoai} </Text>
                                  
                                    <Text style={{fontSize:15, fontWeight:500}}> {itemAddress.diaChi}</Text>
                                </>
                            }
                            
                        </View>
                    </View>
            </View>
            <View style={{
                flexDirection:"row", justifyContent:"space-around", alignItems:"center",marginTop:20
            }}>
                <TouchableOpacity style={{padding:15, borderRadius:10 , backgroundColor:"green"}} onPress={()=>{navigation.navigate('Địa chỉ')}}> 
                    <Text style={{color:"#fff", fontSize:16, fontWeight:600}}>Chọn địa chỉ</Text>
                </TouchableOpacity>
                <TouchableOpacity style={{padding:15, borderRadius:10 , backgroundColor:"blue"}} onPress={()=>{thanhToan(postData,tongTiens,arrTenSp,IP,itemAddress)}}>
                    <Text style={{color:"#fff", fontSize:16, fontWeight:600}}>Thanh toán</Text>
                </TouchableOpacity>
                <TouchableOpacity style={{padding:15, borderRadius:10 , backgroundColor:"red"}} onPress={()=>{huyThanhToan(postData,id_member)}}>
                    <Text style={{color:"#fff", fontSize:16, fontWeight:600}}>Hủy </Text>
                </TouchableOpacity>
            </View>
            
       </View>
    );
};
export default ChiTietDonHangThanhToan;