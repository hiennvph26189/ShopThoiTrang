import {  View,SafeAreaView,TextInput,ScrollView,Text,Linking,StyleSheet,Button,ImputText, Platform, Image } from "react-native";
import {Avatar, Title,Caption,TouchableRipple} from "react-native-paper"
import {React,useState,useEffect} from "react";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import {useDispatch, useSelector} from 'react-redux'
import * as ImagePicker from 'expo-image-picker';
import { useNavigation,useIsFocused } from "@react-navigation/native";
import axios from "axios";
import {PROFILE_MEMBER,NAP_TIEN_MEMBER,IP,CONVERT_CODE_SHA} from "../../api";
import { el } from "date-fns/locale";
const PriceProfile = () => {
    const navigation = useNavigation()
    const isFocused = useIsFocused()
    const [image, setImage] = useState('');
   
    const [price, setPrice] = useState(0);
    
    const info = useSelector((state)=> state.Reducers.arrUser)
   
    const [errImage, setErrImage] = useState(false);
    const [errPrice, setErrPrice] = useState(false);
   
    const [errMessage , setErrMessage] = useState('')
   
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
      useEffect(()=>{
        const data = {
            id: info.id,  
         }
       
   
    },[isFocused])
    
   
  
    const post9Pay = (price,IP) =>{
        let formdata = new FormData();

        formdata.append("name", 'Nạp tiền vào tài khoản')
        formdata.append("price", `${price}`)
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

  
   const submit = async(IP)=>{
        if(price <= 0){
            setErrPrice(true) 
            setErrMessage("Vui lòng nhập số tiền")
            return
        }else{
            if(parseInt(price) <= 20000){
                setErrPrice(true) 
                setErrMessage("Số tiền phải lớn hơn 20.000 VNĐ")
                return
            }else{
                setErrPrice(false)
            }   
        }
        post9Pay(parseInt(price),IP)
        
   }
    const tien =(price)=>{
        if(price){
            let x = price;
            x = x.toLocaleString('it-IT', {style : 'currency', currency : 'VND'});
            return  x;

        }else{
            return  null;
        }
       
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
     
            navigation.navigate('Thông báo nạp tiền', {data_price:utf8String})
           

        }else{
            console.log("Thất bại");
        }
    };
    return (
        <ScrollView style={[styles.container,{flex:1}]} showsVerticalScrollIndicator={false}>
            <View style={{marginTop:40}}>
                <View style={{alignItems:"center"}}>
                    <Text style={{fontSize: 17, fontWeight:'600'}}>
                        Bạn hãy chuyển khoản số tiền cần nạp vào tài khoản ngân hàng dưới đây

                    </Text>
                   
                </View>
                <View style={{marginLeft:10,marginTop:10}}>
                    <Text style={{fontSize:17, fontWeight:"600"}}>
                        Số tiền nạp: <Text style={{color:"red"}}>  {tien(parseInt(price))}</Text>
                    </Text>
                </View>
                <View style={[styles.action,{
                    justifyContent: 'center',
                    alignItems: 'center',
                    padding:10
                }]}>
                   
                    <FontAwesome 
                        name="dollar" size={21}  style={{
                            
                        }}
                    />
                        <TextInput
                        placeholder="Nhập số tiền vừa chuyển khoản"
                        placeholderTextColor="#666666"
                        autoCorrect={false}
                        keyboardType='number-pad'
                        value={price.toString()}
                        onChangeText={(text)=>setPrice(text)}
                        style={styles.textInput}/>
                </View>
                {
                    errPrice==true && (<Text style={{marginTop:10,marginLeft:40,color:'red'}}>{errMessage}</Text>)
                }
                
                
                
                
                
                <TouchableRipple style={styles.commandButton} onPress={()=>{submit(IP)}}>
                        <Text style={styles.panelButtonTitle}>Submit</Text>
                </TouchableRipple>
            </View>
        </ScrollView>
    )
}
export default PriceProfile;
const styles = StyleSheet.create({
    container:{
        flex: 1,
        backgroundColor:'#FFF',
    },
    commandButton:{
        margin:15,
        padding: 15,
        borderRadius: 10,
        backgroundColor: '#FF6347',
        alignItem: 10
    },
    panel:{
        padding:20,
        backgroundColor: '#FFFFFF',
        padingTop:20
    },
    header:{
        backgroundColor:'#FFFFFF',
        shadowColor: '#333333',
        shadowOffset: {width:-1,height:-1},
        shadowRadius:2,
        shadowOpacity: 0.4,
        paddingTop: 20,
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,

    },
    panelHeader:{
        alignItems: 'center',

    },
    panelHandle:{
        width:40,
        heightl: 8,
        borderRadius: 4,
        backgroundColor: '#00000040',
        marginBottom: 10,
    },
    panelTitle:{
        fontSize:27,
        height:35,
    },
    panelSubtitle:{
        fontSize:14,
        corlor: 'gray',
        height: 30,
        marginBottom:10
    },
    panelButtom:{

        padding:15,
        borderRadius:10,
        backgroundColor: '#FF6347',
        alignItems:'center',
        marrginVertical:7
    },
    panelButtonTitle:{
        fontSize: 17,
        fontWeight:'bold',
        color:'#fff',
        textAlign: 'center',
    },
    action:{
        
        flexDirection: 'row',
        marginTop:15,
        marginBottom:10,
        borderBottomWidth: 1,
        borderBottomColor:'#f2f2f2',
        paddingBottom:5
    },
    actionError:{
        flexDirection:'row',
        marginTop:10,
        borderBottomColor:'#FF0000',
        paddingBottom:5
    },
    textInput:{
        flex:1,
        marginTop: Platform.OS === 'android' ? 0 : -12,
        paddingLeft:15,
        color: '#05375a',
        backgroundColor:'#FFFFFF'
    },
    gioiTinh:{
        flexDirection: 'row',
       
        paddingRight:20,
      
        marginLeft:20,
        width: '80%',
        justifyContentc: 'center',
        alignItems: 'center'
    },
    text_GioiTinh:{
        fontSize:16,
        marginRight: 15,
        fontWeight: 'bold'
    }
})