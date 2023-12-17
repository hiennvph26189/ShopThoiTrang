import {  View,SafeAreaView,TextInput,ScrollView,FlatList,Text,ImageBackground,StyleSheet,Button,Pressable,ImputText, Platform, Image } from "react-native";
import {React,useState,useEffect} from "react";
import {useDispatch, useSelector} from 'react-redux'
import { useNavigation,useIsFocused } from "@react-navigation/native";
import { LIST_ALL_THONG_KE_START } from "../../api";
import Icon from 'react-native-vector-icons/FontAwesome';
import axios from "axios";
import Moment from 'moment';
import vi from "moment/locale/vi";
import fr from "moment/locale/fr";
import StarRating from 'react-native-star-rating';
const ChiTietDanhGia = (props) => {
    const navigation = props.navigation;
    const route = props.route;
  
    let id_sp = route.params.id_product
    const isFocused = useIsFocused()
    const [image, setImage] = useState('');
    
    const [arrVoteStar, setArrVoteStar] = useState([]);
    const [totalStar, setTotalStar] = useState(0);
    const info = useSelector((state)=> state.Reducers.arrUser)
    const [selectTab, setSelectetab] = useState(0);
    const [refreshing, setRefreshing] = useState(false);
    onRefresh = () => {
        getProfile()
        setRefreshing(true)
        
    }
    const data = {
        id: info.id  
     }
   
     const getTotalStarProduct = async(id_product,star) =>{
        if(id_product){
            await axios.get(`${LIST_ALL_THONG_KE_START}?id_product=${id_product}&star=${star}`).then((res)=>{
                
                if(res.data.errCode === 0){
                    setArrVoteStar(res.data.data)
                    
                   
                    setTotalStar(res.data.totalStar)
                }
            })
        }
    }
    useEffect(()=>{
        let id_product = id_sp
        getTotalStarProduct(id_product,selectTab)
   
    },[isFocused,selectTab])
    const orderDetails = (id)=>{
       
    }
    const formatDate= (date)=>{
        const newFr = Moment(date).locale("vi", vi).format("DD/MM/YYYY  HH:mm:ss");
        return newFr
    }
    return (
        <View style={[styles.container,{flex:1, backgroundColor:'#DCDCDC'}]} showsVerticalScrollIndicator={false}>
            <ScrollView  horizontal={true} showsHorizontalScrollIndicator={false} style={{flexDirection:"row",backgroundColor:'blue',padding:2, borderRadius:5,maxHeight:55 }}>
                <Pressable style={[styles.tab,{
                    backgroundColor: selectTab == 0 ? "green" : "#fff"
                }]} onPress={()=>{setSelectetab(0)}}>
                    <Text style={{fontWeight:"600"}}>Xem Tất cả</Text>
                </Pressable>
                <Pressable style={[styles.tab,{
                    backgroundColor: selectTab == 5 ? "green" : "#fff"
                }]} onPress={()=>{setSelectetab(5)}}>
                    <Text style={{fontWeight:"600"}}> 
                    {[...Array(5).keys()].map((index) => (
                    <Icon name={ 'star' } size={15} style={{margin:2}} color={ '#FFA500' } /> 
                    ))}
                        
                    </Text>
                </Pressable>
                <Pressable style={[styles.tab,{
                    backgroundColor: selectTab == 4 ? "green" : "#fff"
                }]} onPress={()=>{setSelectetab(4)}}>
                    <Text style={{fontWeight:"600"}}> 
                    {[...Array(4).keys()].map((index) => (
                    <Icon name={ 'star' } size={15} style={{margin:2}} color={ '#FFA500' } /> 
                    ))}
                        
                    </Text>
                </Pressable>
                <Pressable style={[styles.tab,{
                    backgroundColor: selectTab == 3 ? "green" : "#fff"
                }]} onPress={()=>{setSelectetab(3)}}>
                    <Text style={{fontWeight:"600"}}>
                    <Text style={{fontWeight:"600"}}> 
                    {[...Array(3).keys()].map((index) => (
                    <Icon name={ 'star' } size={15} style={{margin:2}} color={ '#FFA500' } /> 
                    ))}
                        
                    </Text>
                    </Text>
                </Pressable>
                <Pressable style={[styles.tab,{
                    backgroundColor: selectTab == 2 ? "green" : "#fff"
                }]} onPress={()=>{setSelectetab(2)}}>
                    <Text style={{fontWeight:"600"}}> 
                    <Text style={{fontWeight:"600"}}> 
                    {[...Array(2).keys()].map((index) => (
                    <Icon name={ 'star' } size={15} style={{margin:2}} color={ '#FFA500' } /> 
                    ))}
                        
                    </Text>
                    </Text>
                </Pressable>
                <Pressable style={[styles.tab,{
                    backgroundColor: selectTab == 1 ? "green" : "#fff"
                }]} onPress={()=>{setSelectetab(1)}}>
                    <Text style={{fontWeight:"600"}}> <Icon name={ 'star' } size={15} style={{margin:2}} color={ '#FFA500' } /> </Text>
                </Pressable>
            </ScrollView>
            <View style={{padding:5}}>
                <Text>Tổng: ({totalStar} Đánh giá)</Text>
            </View>
            <ScrollView style={{marginTop:10, borderTopWidth:1, borderColor:"#fff"}}>
                    {arrVoteStar.length >0 && arrVoteStar.map((item,index)=>{
                        return(
                            <View key={item.id} style={{borderBottomWidth:.25, marginBottom:5, paddingBottom:10, borderBottomColor:"#fff", backgroundColor:"#fff",padding:10}}>
                                <View  style={{flexDirection:"row", marginTop:10, marginBottom:10, alignItems:"center"}}>
                                    <View >
                                    <Image
                                        source={{uri:item.anhDaiDien}} 
                                        style={{width:35,height:35, borderRadius:50}}
                                        />
                                    </View>
                                    <View style={{marginLeft:6}}>
                                        <Text>{item.hoten}</Text>
                                        <View style={{width:"35%", marginTop:5}}>
                                            <StarRating
                                                    disabled={false}
                                                    maxStars={5}
                                                    rating={item.vote}
                                                    fullStarColor="#FFA500"
                                                    emptyStarColor="#FFA500"
                                                    halfStarColor="#FFA500"
                                                    starSize={15}
                                                
                                                
                                            />
                                        </View>
                                        <Text>Size: {item.size}</Text>
                                        
                                    </View>
                                    
                                </View>
                                {item.comment !=""&&
                                    <View style={{paddingLeft:40}}>
                                    <Text>
                                        {item.comment}
                                    </Text>
                                </View>
                                }
                                
                                <View style={{paddingLeft:40, marginTop:5}}>
                                    <Text style={{ color:"#A9A9A9", textAlign:"right",fontSize:12}}>{formatDate(item.createdAt)}</Text>    
                                </View>  
                            </View>
                        )
                    })}
                </ScrollView>
       
           
               

              
        </View>
    )
}
export default ChiTietDanhGia;
const styles = StyleSheet.create({
    listView:{
        padding:10
    },
    listView_Text:{
        flexDirection:'row',
        alignItems: 'center',
        justifyContent:"space-between",
        borderBottomColor:'#ccc',
        borderBottomWidth:1,
        paddingBottom:10
    },
    tab:{
        margin:5,
        borderColor:'#000',
        borderWidth:1,
        padding:5,
        justifyContent: 'center',
        alignItems: 'center',
        textAlign: 'center',
        height:40,
        borderRadius:5,
    }
   
})