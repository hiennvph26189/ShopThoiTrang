import { FlatList, Text, Alert, View, ScrollView, RefreshControl, Pressable, Linking } from "react-native";
import React, { useState, useEffect } from "react";
import CartItem from "../common/CartItem";
import { decode } from 'base-64';
import { useDispatch, useSelector } from 'react-redux';
import { removeFormCart } from "../redux/action/Actions";
import Header from "../common/Header";
import { GET_CART_USER, POST_CART_USER, GETALLPRODUCTS, DELETE_CARTU_SER, UPDATE_CART_USER, ORDER_CART_USER, PROFILE_MEMBER, IP, ORDER_CARD_9PAY, CONVERT_CODE_SHA,CHECK_SOLUONG_SP_THEOSIZE_TRONG_ODER } from "../../api"
import { useNavigation, useIsFocused } from "@react-navigation/native";
import axios from "axios";
import CryptoJS from 'crypto-js';
import { measure } from "react-native-reanimated";
import { el } from "date-fns/locale";
const Cart = (props) => {
    const [refreshing, setRefreshing] = useState(false);
    const isFocused = useIsFocused()
    const [cartList, setCartList] = useState([]);
    const cartData = useSelector(state => state.Reducers.arrCart);
    const info = useSelector(state => state.Reducers.arrUser);
    const dispacth = useDispatch();
    const [checkOrder, setCheckedOrder] = useState(false)
    const [load, setIsLoadding] = useState(false)
    const [loaditemChill, setLoaditemChill] = useState(false)
    const [arrProducts, setArrProducts] = useState()
    const [tongTiens, setTongTien] = useState(0)
    const [profile, setProfile] = useState({})
    const [idCart, setIdCart] = useState([])
    const [buy9Pay, setBuy9Pay] = useState({})
    const [token, setToken] = useState("")


    const navigation = useNavigation()
    const getUser = () => {
        let data = {
            id: info.id,
        }
        axios.post(PROFILE_MEMBER, data).then((response) => {

            if (response.data.errCode === 0) {

                setProfile({ ...response.data.userMember })

            }
        }).catch((error) => { console.log(error) });
    }
    const loadAllProducts = async (id) => {
        await axios.get(GETALLPRODUCTS).then((res) => {

            if (res && res.data.errCode === 0) {

                setArrProducts(res.data.totalProducts)

                setRefreshing(false)
            }
        }).catch((error) => { console.log(error) });
    }
    const price = (price) => {
        let x = price;
        x = x.toLocaleString('it-IT', { style: 'currency', currency: 'VND' });
        return x;
    }
    const listCart = async () => {
        if (info.id) {
            let idUser = info.id;
            await axios.get(`${GET_CART_USER}?id=${idUser}`).then(res => {

                if (res.data.errCode == 0) {
                    setCartList(res.data.Carts)
                   
                    tongTien(res.data.Carts)
                    setRefreshing(false)
                }
            }).catch((error) => { console.log(error) });
        }
    }
    useEffect(() => {
        listCart()
        getUser()
        loadAllProducts()


    }, [isFocused])
    onRefresh = () => {
        setRefreshing(true)
        listCart()
        loadAllProducts()
    }
    useEffect(() => {

        const handleDeepLink = async () => {
            const initialUrl = await Linking.getInitialURL();
            listCart()
            if (initialUrl) {

                // Xử lý URL và hiển thị cửa sổ alert dựa trên nội dung của URL
                handleUrl(initialUrl);
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

    // setCartList(cartData);
    const DeleteItemCart = async (id) => {

        await axios.delete(`${DELETE_CARTU_SER}?id=${id}`).then(res => {
            if (res.data.errCode === 0) {
                listCart()
                props.deleteCart()
            }
        }).catch(err => { console.log(err) });
    }
    const checkId = (id) => {

    }
    const tongTien = (arr) => {
        let tien = 0
        arr.map((item) => {
            tien = tien + item.thanhTien

        })

        setTongTien(tien)


    }
    const updateCart = async (id, sl, size) => {
        let data = {
            id: id,
            soLuong: sl,
            size: size
        }


        await axios.put(UPDATE_CART_USER, data).then(res => {
            if (res.data.errCode === 0) {
                listCart()
            }
        }).catch(err => { console.log(err) });
    }
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
    const orderProducts = async () => {

        let ids = []
        let tongTien = 0
        let arrTenSp = ""
        let id_sp = []
        cartList.map((item) => {
            ids.push(item.id)
            tongTien = tongTien + item.thanhTien
            arrProducts.map((product, index) => {
                if (item.ipSanPham === product.id) {
                    arrTenSp += product.tenSp + ' (x' + item.soLuong + " size: " + item.size + ")" + "\n"
                }
            })
        })
        let postData = {
            cartList: JSON.stringify(cartList)
        }
        await axios.post(CHECK_SOLUONG_SP_THEOSIZE_TRONG_ODER,postData).then(res => {
          
            if (res.data.success == true) {
                    post9Pay(arrTenSp,tongTiens,IP)
                    listCart()
                    setLoaditemChill(!loaditemChill)
                   
            }else{
                listCart()
                alert(res.data.message)
                setLoaditemChill(!loaditemChill)
                
                
              

            }
        }).catch(err => { console.log(err) });
       
        // if(cartList){
        //     if(tongTiens <profile.tienTk){
        //         data = {
        //             idCart:ib,
        //             idUser: info.id,
        //             tongTien: tongTiens,
        //         }
        //         await axios.post(ORDER_CART_USER,data).then(res=>{
        //             if(res.data.errCode === 0){
        //                 Alert.alert('Đặt Đơn thành công', 'Đơn hàng của bạn đã được đặt, hãy chờ bên shop xét duyệt', [

        //                     {text: 'OK', onPress: () =>{
        //                         setCartList([])
        //                         setCheckedOrder(false)
        //                         listCart()
        //                         getUser()
        //                         props.deleteCart()
        //                     }},
        //                   ]);



        //             }else{

        //                 alert(res.data.errMessage)
        //             }
        //         }).catch(err=>{console.log(err)});
        //     }else{
        //         return alert("Số dư của bạn không đủ, hãy nạp thêm tiền")
        //     }

        // }else{

        //     return alert("Không có sản phẩm nào trong giỏ hàng"); 
        // }
    }
    const loadDataCartItem = () => {
       
    }
    const handleUrl = async (url) => {
        // Kiểm tra và xử lý dữ liệu từ URL
        // Nếu có dữ liệu, hiển thị cửa sổ alert

        if (url.includes('?code=')) {
            const data = url.split('?code=')[1];
            let utf8String = ""
            console.log(data)
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

                navigation.navigate('Thông báo Order', { utf8String, data_order, arrTenSp })
            }

        }
    };


    const deleteCart = () => {

    }
    return (
        <View style={{ flex: 1 }}>
            <Header

                title={'Cart'} />
            <ScrollView
                refreshControl={
                    <RefreshControl
                        refreshing={refreshing}
                        onRefresh={() => { onRefresh() }}
                    />
                }
            >
                {cartList.map((item, index) => {
                    return (
                        <CartItem key={item.id} item1={item} deteleItem={DeleteItemCart} checkid={checkId} tongTien={tongTiens} updateCart={updateCart}  loaditemChill={loaditemChill}

                        />
                    )
                })}
            </ScrollView>


            <View style={{

                height: 50,

                alignItems: 'center',
                flexDirection: 'row',
                marginLeft: 10,
                marginRight: 10,
                marginTop: 20,
                borderRadius: 5,
                padding: 10,
                justifyContent: 'space-between',

            }}>
                <View style={{
                    flexDirection: 'row'
                }}>
                    <Text style={{
                        fontSize: 17,
                        fontWeight: 'bold',
                    }}>Tổng: </Text>
                    <Text
                        style={{
                            color: 'red',
                            fontSize: 17,
                            fontWeight: 'bold',
                        }}
                    >{price(tongTiens)}</Text>
                </View>
                <View>
                    <Pressable onPress={() => { orderProducts() }} style={{
                        borderColor: "#000",
                        borderWidth: 1,
                        height: 50,
                        width: 130,
                        justifyContent: "center",
                        alignItems: "center",
                        borderRadius: 10,
                        backgroundColor: "#000",
                    }}>
                        <Text style={{
                            color: "#fff",
                            fontSize: 17,
                            fontWeight: "bold",

                        }}> Đặt Hàng</Text>

                    </Pressable>
                </View>
            </View>
            <View style={{ height: 80 }}></View>
        </View>
    )
}
export default Cart;