import { useNavigation } from "@react-navigation/native";
import { useState,useEffect } from "react";
import { TextInput } from "react-native";
import { Image, Text, View,ToastAndroid,Pressable } from "react-native";
import CustomButton from "../common/CustomButton";
import CustomTextInput from "../common/CustomTextInput";
import {LOGIN} from "../../api";
import {updateEmail} from "../redux/action/Actions";
import {useDispatch, useSelector} from 'react-redux'
import { POST_KEY_CODE_EMAIL } from "../../api";
import axios from "axios";
import Icon from "react-native-vector-icons/MaterialCommunityIcons"
const QuenMatKhau = () => {
    const navigation = useNavigation();
    const [email, setEmail] = useState('');
    const [err, setErr] = useState(false);
    const info = useSelector((state)=> state.Reducers.arrUser)
    const [errMessage , setErrMessage] = useState('');
    const dispatch = useDispatch();
   
    useEffect(()=>{
        setErr(false)
      
    },[])
   
    const validate = async() => {
        const reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
        
       
        
         if(email){
            if(reg.test(email) === true){
               
            }else{
                setErrMessage("Email không đúng định dạng")
                setErr(true)
            }
            
         
         }else{
            setErrMessage("Email không được để trống")
            setErr(true)
         }  
         const data = {
            email: email,
           
         }
      
        await axios.post(POST_KEY_CODE_EMAIL,data).then((res)=>{
               if(res.data.errCode == 0){
                    navigation.navigate('Xác nhận Email',{email:email})
               }else{
                    alert(res.data.errMessage)
               }
        }).catch((err)=>{console.log(err);})
    }

    return (
        <View style={{ flex: 1 }}>
   
          
            <Text
                style={{ marginTop: 50, alignSelf: "center", fontSize: 24, fontWeight: 600 }}
            >Vui lòng nhập email của bạn</Text>
            <View style={{position:"relative"}}>
                <Icon name="email" size={25} color='#000' style={{position:"absolute",left:60,top:30}}/>
                <CustomTextInput
                
                placeholder={"Xin Nhập Tài Email"} 
                value={email}
                onChangeText = {text =>{setEmail(text);}}
                ></CustomTextInput>
            </View>
         

        {
            err==true && (<Text style={{marginTop:10,marginLeft:40,color:'red'}}>{errMessage}</Text>)
          }
          <CustomButton title={'Gửi mã'} bgColor={'#000'} textColor={'#fff'} 
          onPress={() => {validate()}}
          >
          </CustomButton>
          
        </View>
    )
}
export default QuenMatKhau;