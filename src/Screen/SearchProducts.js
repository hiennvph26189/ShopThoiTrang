import { Text, View ,ScrollView,TouchableOpacity,Image, TextInput} from "react-native";
import React, {useEffect,useState} from "react";
import { SEARCH_PRODUCT_APP,GETALLPRODUCTS } from "../../api"
import { useNavigation,useIsFocused } from "@react-navigation/native";
import axios from "axios";
const SearchProducts = () => {
    const navigation = useNavigation();
    const [arrProducts, setArrProducts]= useState([])
    const [arrSearch, setArrSearch]= useState([])
   const [search,setSearch] =  useState("")
   
    useEffect(()=>{
       
    },[])
    const price =(price)=>{
        let x = price;
        x = x.toLocaleString('it-IT', {style : 'currency', currency : 'VND'});
        return  x;
}

    const searchFilter =async (key_search)=>{
        setSearch(key_search)
        if(key_search !=""){
           
            await axios.get(`${SEARCH_PRODUCT_APP}?key_search=${key_search}`).then((res)=>{
               if(res.data.errCode == 0){
                    setArrProducts(res.data.data)
                    
               }else{
                    setArrProducts([])
               }
            }).catch((err)=>{console.log(err);})
        }
    }
    handleDetailProduct = (id)=>{
        navigation.navigate('Chi tiết sản phẩm',{id: id});
    }
    return (
        <View>
            <View style={{width:"100%",padding:10, borderColor:"#000", borderWidth:1, backgroundColor:"#fff", marginBottom:10, marginTop:10, borderRadius:5}}>
                <TextInput
                    placeholder="NHập tên sản phẩm "
                    value={search}
                    onChangeText={(text)=>searchFilter(text)}
                />
            </View>
            
            <ScrollView>
                {arrProducts&&
                    arrProducts.map((item,index)=>{
                        return(
                            <TouchableOpacity onPress={()=>{handleDetailProduct(item.id)}} key={item.id}>
                                
                                <View  style={{flexDirection:"row",marginTop:10,padding:5, borderBottomColor:"#ccc",borderBottomWidth:.7}}>
                            <Image
                               source={{uri:showImage(item.image)}} 
                               style={{width:100,height:100}}
                            />
                            <View style={{padding:10}}>
                                <Text style={{width:"80%",alignItems:"center",fontSize:17}}>{item.tenSp}</Text>
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
                              <View style={{marginLeft:5,}}>
                                    <Text>Đã bán: {item.luotMua}</Text>
                              </View>
                            </View>
                        </View>
                            </TouchableOpacity>
                        )
                    })
                }
                
            </ScrollView>
            
        </View>
    )
}
export default SearchProducts;