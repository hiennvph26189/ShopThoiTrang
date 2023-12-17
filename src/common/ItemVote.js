import { Text, View ,ScrollView,TouchableOpacity,StyleSheet ,Image,TextInput,Alert} from "react-native";
import React, { useState,useEffect } from 'react';
import {GET_ONE_PRODUCT_IN_CART_VOTE_START,POST_VOTE_START} from "../../api";
import axios from "axios";
import {useDispatch, useSelector} from 'react-redux'
import { useNavigation,useIsFocused } from "@react-navigation/native";
import VoteStar from './VoteStar';
const ItemVote = (props) => {
    const navigation = useNavigation();
    const route = props.route;
    let id_member = route.params.id_member
    let id_sp = route.params.id_sp
    let id_donhang = route.params.id_donhang
    let id_cart = route.params.id_cart
    const [numberStar, setNumberStar] = useState(0);
    const [itemProduct, setItemProduct] = useState({});
    const [text, setText] = useState('');
    const info = useSelector(state => state.Reducers.arrUser);
    const handleInputChange = (inputText) => {
        setText(inputText);
      };
    const getDetailProduct = async() =>{
       
        if(id_sp){
            await axios.get(`${GET_ONE_PRODUCT_IN_CART_VOTE_START}?id_product=${id_sp}&id_cart=${id_cart}`).then((res)=>{
               
                if(res.data.errCode === 0){
                    setItemProduct(res.data.dataProduct);
                  
                }
            }).catch((err)=>{console.log(err);})
        }
    }
    useEffect(()=>{
        getDetailProduct()
       
        },[])
    const getVoteStar = (numberStar)=>{
        setNumberStar(numberStar);
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
postDnahGia = async()=>{
    let data = {
        id_sp:id_sp,
        id_cart:id_cart,
        id_member:id_member,
        id_donhang:id_donhang,
        numberStar:numberStar,
        hoTen: info.tenThanhVien,
        comment: text

    }
    if(id_sp){
        await axios.post(POST_VOTE_START,data).then((res)=>{
           
            if(res.data.errCode === 0){
                Alert.alert('Thông báo',res.data.errMessage , [
                    {text: 'OK', onPress: () => {
                        navigation.navigate('Home',0);
                    }},
                  ]);
                
            }else{
                alert(res.data.errMessage)
            }
        }).catch((err)=>{console.log(err);})
    }
}
    return (
        <>
            {itemProduct&&
            <ScrollView >
                 <View style={{borderBottomColor:"#ccc",borderBottomWidth:.7}}>
                    <View style={{flexDirection:"row",margin:5, }}>
                        <Image
                        source={{uri:showImage(itemProduct.image)}} 
                        style={{width:50,height:50}}
                        />
                        <View style={{marginLeft:5}}>
                            <Text style={{width:"80%",padding:0,alignItems:"center"}}>{itemProduct.tenSp}</Text>
                            <View style={{width:300, flexDirection:"row", justifyContent:"space-between", alignItems:"center"}}>
                            {itemProduct.sale <=0?
                                <Text style={{
                                    fontSize: 15,
                                    fontWeight: '600',
                                    color: 'red'
                                }}>
                                    
                                    {price(itemProduct.giaSanPham) }
                                </Text>
                                :
                                <View style={{flexDirection:'row',  alignItems:"center"
                            
                            
                            }}>
                                <Text style={{
                                    fontSize: 13,
                                    fontWeight: '600',
                                    color: '#B22222',
                                }}>
                                 {price(itemProduct.giaSanPham-(itemProduct.giaSanPham *(itemProduct. sale/100)) ) }
                               
                            </Text>
                            
                            <Text style={{
                                fontSize:18,
                                marginLeft:5,
                                marginRight:5
                            }}>-</Text>
                            <Text style={{
                                    fontSize: 13,
                                    fontWeight: '600',
                              
                                    color: '#696969',
                                    textDecorationLine:'line-through'
                                
                                }}>
                                
                                {price(itemProduct.giaSanPham?itemProduct.giaSanPham:0 ) }
                            </Text>
                            </View>
                        }
                        <Text>Size: {itemProduct.size}</Text>
                        <Text >x {itemProduct.soLuong}</Text>
                            </View>
                        
                        </View>
                    </View>
                   
                            
                 </View>
                
                 <VoteStar getVoteStar={getVoteStar}/>
                 <View style={{margin:3,padding:8}}>
                    <Text style={{fontWeight:500}}>Viết đánh giá của bạn:</Text>
                    <TextInput
                        style={styles.textInput}
                        multiline={true}  // Cho phép nhập nhiều dòng
                        numberOfLines={13} // Số lượng dòng xuất hiện mặc định
                        textAlignVertical="top" 
                        placeholder="Nhập nội dung đánh giá..."
                        value={text}
                        onChangeText={handleInputChange}
                    />
                 </View>
                 <View style={{width:"100%", flexDirection:"row", justifyContent:"center", alignItems:"center", marginTop:10}}>
                    <TouchableOpacity onPress={()=>{postDnahGia()}} style={{width:"50%", padding:10, borderRadius:20, backgroundColor:"red"}}>
                        <Text style={{textAlign:"center",fontSize:16, fontWeight:"600", color:"#fff"}}>Đánh giá</Text>
                    </TouchableOpacity>
                 </View>
             </ScrollView>
            }
        </>
       
    )
}
const styles = StyleSheet.create({
    container: {
      padding: 20,
    },
    textInput: {
      borderColor: 'gray',
      borderWidth: 1,
      marginTop:10,
      marginBottom: 10,
      padding: 10,
    },
  });
export default ItemVote;