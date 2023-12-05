import {
    View,
    ScrollView,
    SafeAreaView,
    Dimensions,
    Image,
    StyleSheet,
    Text,
    Alert,
    TextInput,
    Pressable,
    TouchableOpacity,
    useWindowDimensions 
} from "react-native"
import { useNavigation,useIsFocused } from "@react-navigation/native";
import React, { useState, useRef,useEffect } from "react";
import { onChange } from "react-native-reanimated";
import { FlatList } from "react-native";
import {useDispatch, useSelector} from 'react-redux'
import RenderHtml from 'react-native-render-html';
import MyProductItem from "./MyProductItem";
import FontAwesome from "react-native-vector-icons/FontAwesome"
import axios from "axios";
import {GET_CATEGORIES,POST_CART_USER,GET_ONE_PRODUCT,LIST_SIZE_PRODUCTS} from "../../api"


const WIDTH = Dimensions.get('window').width;
const HEIGHT = Dimensions.get('window').height;


const DetailProduct = (props) => {
    const isFocused = useIsFocused();
    const navigation = useNavigation()
    const route = props.route;
    let idProduct = route.params.id
    const { width } = useWindowDimensions();
    const info = useSelector(state => state.Reducers.arrUser);
    const [profile,setProfile] = useState({})
    const [imgActive, setImgActive] = useState(0);
    const [detailProduct,setDetailProduct] = useState({});
    const [images,setImages] = useState([])
    const [categoryList, setCategoryList] = useState([]);
    const [ortherProducrs, setOrtherProducrs] = useState([]);
    const [arrSizes, setArrSizes] = useState([]);
    const [soLuong,setSoLuong] = useState(0);
    const [size,setSize] = useState("");
    const [totalSoLuongSize,setTotalSoLuongSize] = useState(0);


    const [xemChiTiet,setXemChiTiet] = useState(true)
    const [refreshing, setRefreshing] = useState(false);
    onRefresh = () => {
        getAllOrder()
        setRefreshing(true)
        
    }
    const onchange = (nativeEvent) => {
        if (nativeEvent) {
            const slide = Math.ceil(nativeEvent.contentOffset.x / nativeEvent.layoutMeasurement.width);
            if (slide != imgActive) {
                setImgActive(slide);
            }
        }
    }
    const getDetailProduct = async() =>{
        if(idProduct){
            await axios.get(`${GET_ONE_PRODUCT}?id=${idProduct}`).then((res)=>{
                if(res.data.errCode === 0){
                    setDetailProduct(res.data.getDetailProduct)
                    setImages(JSON.parse(res.data.getDetailProduct.image))
                    setOrtherProducrs(res.data.arProduct)
                    
                }
            })
        }
    }
    const getArrSizesroduct = async() =>{
        if(idProduct){
            await axios.get(`${LIST_SIZE_PRODUCTS}?id=${idProduct}`).then((res)=>{
                console.log(res.data)
                if(res.data.errCode === 0){
                  
                   let arr = Object.entries(res.data.data).map(([key, value]) => ({ key, value }));
                   
                    setArrSizes(arr)
                    
                }
            })
        }
    }
    const loadCategories = async () => {
        await axios.get(GET_CATEGORIES).then((res) => {

            if (res && res.data.errCode === 0) {
                setCategoryList(res.data.data);

                
            }
        }).catch((error) => { console.log(error) });
    }
    useEffect(()=>{
        getArrSizesroduct()
        getDetailProduct()
        loadCategories()
    },
    [isFocused])

     price =(price)=>{
        if(price){
            let x = price;
            x = x.toLocaleString('it-IT', {style : 'currency', currency : 'VND'});
            return  x;
        }
        
        
}
    getCategory = (id)=>{
        let name = ""
        if(id&&categoryList){
            categoryList.map((item)=>{
                if(id == item.id){
                   name = item.name
                    
                }
            })
        }
        return name
    }
    orProduct = async(id)=>{
        
               
        await axios.get(`${GET_ONE_PRODUCT}?id=${id}`).then((res)=>{
            if(res.data.errCode === 0){
                setDetailProduct(res.data.getDetailProduct)
                setImages(JSON.parse(res.data.getDetailProduct.image))
                setOrtherProducrs(res.data.arProduct)
              
                
            }
        })
        if(id){
            await axios.get(`${LIST_SIZE_PRODUCTS}?id=${id}`).then((res)=>{
                console.log(res.data)
                if(res.data.errCode === 0){
                  
                   let arr = Object.entries(res.data.data).map(([key, value]) => ({ key, value }));
                    setArrSizes(arr)
                    console.log(res.data.data);
                    
                }
            })
        }
        console.log(arrSizes,"sdlf'sd")
        setSoLuong(0)
        setSize("")
    }
    const source = {
        html: `${detailProduct.mota}`
      };
     
    const listSanPhamKhac = ()=>{
        let arrSanPhamKhac = []
        if(ortherProducrs&&detailProduct){
            ortherProducrs.map((item)=>{
                if(item.id !== detailProduct.id){
                    arrSanPhamKhac.push(item)
                    
                }
            })
        }
        
        return arrSanPhamKhac.map((item)=>{
            return (
                <TouchableOpacity onPress={()=>{orProduct(item.id)}}  key={item.id}>
                        <View  style={{flexDirection:"row",margin:5, borderBottomColor:"#ccc",borderBottomWidth:.7}}>
                            <Image
                               source={{uri:showImage(item.image)}} 
                               style={{width:120,height:120}}
                            />
                            <View style={{}}>
                                <Text style={{width:"80%",padding:6,alignItems:"center",fontSize:16}}>{item.tenSp}</Text>
                                <View style={{width:310, flexDirection:"row", justifyContent:"space-between"}}>
                                {item.sale <=0?
                                     <Text style={{
                                        fontSize: 16,
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
                           
                                </View>
                              
                            </View>
                        </View>
                        
                    </TouchableOpacity>
            )
        })
    }
    const congSoLuong =()=>{
        let count = soLuong 
        count = count +1
        setSoLuong(count)
        
        

        
    }
    const truSoLuong =()=>{
        let count = soLuong 
        count = count -1
        setSoLuong(count)
       

        
    }
    onAddToCart= async()=>{
        
        let id =  info.id
        console.log(id,"ads;fkads;")
        if(arrSizes&&arrSizes.length >0){
            if(idProduct){
                if(soLuong > 0&& size !== ""){
                    let data = {
                        id_member: info.id,
                        id_product: idProduct,
                        size: size,
                        soLuong:soLuong
                    }
                    await axios.post(POST_CART_USER,data).then(res =>{
                        
                        if(res.data.errCode === 0 ){
                            
                            Alert.alert('Thông báo', 'Đơn hàng đã được thêm vào giỏ hàng', [
                                {text: 'OK', onPress: () => {
                                    navigation.navigate('Home',0);
                                }},
                              ]);
                        }else{
                            alert(res.data.errMessage)
                            return
                        }
                    }).catch((err) => {console.log(err)})
                }else{

                    return Alert.alert('Thông báo', 'bạn chưa chọn số lượng hoặc size', [
                        {text: 'OK', onPress: () => {
                           
                        }},
                      ]);
                
                }
               
            }
        }else{
            return Alert.alert('Thông báo', 'Xin lỗi quý khách vì sản phẩm đã không còn hàng, chúng tôi sẽ cố gắng nhập hàng sớm nhất có thể', [
                {text: 'OK', onPress: () => {
                   
                }},
              ]);
        }
        
    }
    return (
        <View style={{backgroundColor:"#fff"}} key={detailProduct.id}>
            <ScrollView>
                <SafeAreaView>
                    <View>
                        <View style={{
                            width:400,
                            height: 'auto',
                            borderRadius: 5,
                            
                            paddingTop:10,
                            paddingBottom:10,
                            
                            marginTop: 3,
                        }}>
                            <Text style={{
                                 textTransform: 'uppercase',
                                marginLeft: 2,
                                fontWeight: 'bold',
                                fontSize: 16,
                            }}>{detailProduct?detailProduct.tenSp:""}</Text>
                           
                        </View>
                        <ScrollView
                            onScroll={({ nativeEvent }) => onchange(nativeEvent)}
                            showsHorizontalScrollIndicator={false}
                            pagingEnabled
                            horizontal
                            style={styles.wrap}
                        >
                            {images.map((e, index) =>
                                <Image key={e}
                                    style={styles.wrap}
                                    source={{ uri: e }}
                                />
                            )}

                        </ScrollView>
                        <View style={styles.wrapDot}>
                            {
                                images.map((e, index) =>
                                    <Text
                                        key={e}
                                        style={imgActive == index ? styles.dotActive : styles.dot}
                                    >●</Text>
                                )
                            }
                        </View>
                    </View>
                    <View style={{justifyContent:'space-between',flexDirection:"row", alignItems:"center", padding:5}}>
                    {detailProduct&&detailProduct.sale>0?
                    <>
                        <View style={{ flexDirection: 'row', marginLeft:2,alignItems:"center" , paddingTop:10,paddingBottom:10}}>
                        
                        <Text style={{
                            
                            width: 'auto',
                            fontWeight: 'bold',
                            color: 'grey',
                            fontSize: 20,
                            textDecorationLine: 'line-through'
                        }}> {price(detailProduct.giaSanPham) }</Text>
                        <Text style={{fontSize:20, marginLeft:5, marginRight:5}}>-</Text>
                        <Text style={{
                           
                            width: 'auto',
                            fontWeight: 'bold',
                            color: 'red',
                            fontSize: 20,
                            marginRight: 10,
                        }}>{price(detailProduct.giaSanPham-(detailProduct.giaSanPham *(detailProduct. sale/100)) ) }</Text>
                    </View>
                    </>
                    :
                    <View style={{ flexDirection: 'row', marginLeft:2,marginTop:15 }}>
                        <Text style={{
                            
                            width: 'auto',
                            fontWeight: 'bold',
                            color: 'red',
                            fontSize: 20,
                            marginRight: 10,
                        }}>{price(detailProduct.giaSanPham)}</Text>
                        
                    </View>

                }
                    <View style={{marginRight:20}}>
                        <Text >(đã bán: {detailProduct.luotMua})</Text>
                    </View>
                    </View>

                    <View>
                        
                
                    <View>
                        <Text style={{
                            fontWeight: 'bold',
                            borderColor: 'grey',
                            backgroundColor: 'grey',
                            padding: 10,
                            fontSize:17
                           
                           
                        }}>Size </Text>

                        
                        <View style={{ flexDirection: 'row', paddingLeft:5,marginTop: 10}}>
                            {arrSizes.length >0 ? arrSizes.map((tiem, i) =>{
                                return (
                                    <>
                                    <TouchableOpacity key={i} onPress={()=>{setSize(tiem.key); setTotalSoLuongSize(tiem.value);setSoLuong(1)}} style={{   marginRight: 20,  }}>
                                        <Text  style={{ textAlign: 'center',borderWidth: 1, borderRadius: 5, padding: 7,backgroundColor:size==tiem.key?"#FF6633":"#fff" }}>Size: {tiem.key}</Text>
                                        <Text  style={{ textAlign: 'center', marginTop:2 }}> (SL: {tiem.value})</Text>
                                        
                                        
                                    </TouchableOpacity>
                                    </>
                                )
                            }):
                            <Text style={{ textAlign: 'center' }}>Xin lỗi sản phẩm đã hết hàng</Text> 
                            }
                            
                           
                        </View>
                        
                    </View>
                    <View >
                        <Text style={{
                            fontWeight: 'bold',
                            borderColor: 'grey',
                            backgroundColor: 'grey',
                            padding: 10,
                            fontSize:17,
                            marginTop:10
                           
                           
                        }}>Số lượng </Text>
                        <View style={{ flexDirection: 'row', paddingLeft:5,alignItems:"center",marginTop: 10}}>
                        {soLuong >0?
                    <TouchableOpacity onPress={()=>{truSoLuong()}}  style={{
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
                   <Text style={{fontSize:16}}>{soLuong}</Text>
                   
                    
                         {soLuong < totalSoLuongSize?
                             <TouchableOpacity onPress={()=>{congSoLuong()}} style={{
                               
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
                    </View>

                    <View style={{marginTop: 20, padding:10}}>
                        <View style={{ fontWeight: 'bold', borderWidth: 1,borderRadius:5, borderColor: '#b8a165', width: 'auto', height: 'auto',padding:8 ,position:"relative"}}>
                        <View style={{borderWidth: 1, borderColor: '#b8a165',borderRadius:5,width:"40%",padding:7,position:"absolute", top:-20,left:20, backgroundColor:"#fff",}}>
                            <Text style={{ fontWeight: 'bold',textAlign:"center"  }}>Chính sách bảo hành</Text>
                        </View>
                            <View style={{ flexDirection: 'row', marginTop: 15 }}>
                                <Text style={{ fontWeight: 'bold' }}>HOÀN TIỀN: </Text>
                                <Text><Text>Áp dụng cho sản phẩm lỗi và không lỗi.</Text></Text>
                            </View>

                            <View style={{ marginLeft: 10,}}>
                                <Text style={{ marginTop: 10,lineHeight:20}}>• Hoàn trả hàng trong vòng 7 ngày</Text>
                                <Text style={{lineHeight:20}}>• Tháng đầu tiên kể từ ngày mua: phí 20% giá trị hóa đơn.</Text>
                                <Text style={{lineHeight:20}}>•Tháng thứ 2 đến tháng thứ 12: phí 10% giá trị hóa đơn/tháng.</Text>
                            </View>
                        </View>
                    </View>
                   
                    <View style={{ flexDirection: 'row', alignSelf: 'center', marginTop: 10, marginBottom:20 }}>
                        <TouchableOpacity style={{ marginTop: 10, marginRight: 20, borderWidth: 1, borderRadius: 7, padding: 10, width: 150, flexDirection: "row", justifyContent: 'center', alignItems: 'center', backgroundColor: '#5d83db', borderColor:'#5d83db' }}>
                            <Text style={{ textAlign: 'center',fontSize:17, textTransform: 'uppercase', fontWeight: 'bold', color: 'white' }}>Liên Hệ</Text>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={()=>{onAddToCart()}} style={{ marginTop: 10, marginLeft: 20, borderColor:'orange', borderRadius: 7, padding: 10, width: 150, flexDirection: "row", justifyContent: 'center', alignItems: 'center', backgroundColor: 'orange', }}>
                            <Text style={{ textAlign: 'center',fontSize:17, textTransform: 'uppercase', fontWeight: 'bold', color: 'white' }}>Giỏ Hàng</Text>
                        </TouchableOpacity>
                    </View>
                   
                    </View>
                    <View>
                        <TouchableOpacity onPress={()=>{setXemChiTiet(!xemChiTiet)}}>
                            <Text style={{
                                fontWeight: 'bold',
                                borderWidth: 1,
                                textAlign: 'center',
                                backgroundColor: 'black',
                                color: 'white',
                                padding: 12,
                      
                              
                            }}>Xem chi tiết sản phẩm</Text>
                        </TouchableOpacity>
                        <View style={{
                        width: '100%',
                        padding:7,
                        paddingBottom:10,
                        height:xemChiTiet?"auto":200
                        
                        
                    }}>
                        <Text>
                            Tên mẫu áo: {detailProduct?detailProduct.tenSp:""}
                        </Text>
                        <Text>
                            Hãng sản xuất: {detailProduct?detailProduct.hangSx:""}
                        </Text>
                        <Text>
                            Danh mục: {getCategory(detailProduct?detailProduct.idDanhSach:"")}
                        </Text>
                        <Text>
                           Số lượng: {detailProduct.soLuong}
                        </Text>
                        <Text>
                           Giá gốc: {price(detailProduct.giaSanPham)}

                        </Text>
                        <Text>
                           Sale: {detailProduct.sale}%
                           
                        </Text>
                        <View style={{marginTop: 5}}>
                        <Text style={{fontSize:17, fontWeight:"700"}}>
                            Đánh giá sản phẩm:
                        </Text>
                        <RenderHtml
                            contentWidth={width}
                            source={source}
                           
                            />
                        </View>

                       
                    </View>
                    </View>
                    
                    <View style={{
                        width: '100%',
                        
                        borderRadius: 10,
                       
                        height: 'auto',
                    }}>
                        <Text style={{
                            fontWeight: 'bold',
                            borderWidth: 1,
                            textTransform: 'uppercase',
                            backgroundColor: 'black',
                            padding: 8,
                            borderColor: 'black',
                            color: 'white',
                          
                            
                        }}>Sản phẩm khác: </Text>
                        <ScrollView>
                            {
                               listSanPhamKhac()
                            }
                        </ScrollView>
                    </View>
                </SafeAreaView>
            </ScrollView>
        </View>
    )
};
const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    wrap: {
        marginTop:0,
        width: WIDTH,
        height: HEIGHT * 0.5,
        borderRadius: 5
    },
    wrapDot: {
      
        position: 'absolute',
        bottom: 0,
        flexDirection: 'row',
        alignSelf: 'center'
    }, dotActive: {
        margin: 3,
        color: 'grey',
    },
    dot: {
        margin: 3,
        color: 'white'
    }
});
export default DetailProduct;