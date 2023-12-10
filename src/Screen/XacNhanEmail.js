import { useNavigation } from "@react-navigation/native";
import { useState,useEffect } from "react";
import { TextInput } from "react-native";
import { Image, Text, View,ToastAndroid,Pressable } from "react-native";
import CustomButton from "../common/CustomButton";
import CustomTextInput from "../common/CustomTextInput";
import {LOGIN} from "../../api";
import {updateEmail} from "../redux/action/Actions";
import {useDispatch, useSelector} from 'react-redux'
import { POST_KEY_CODE_EMAIL,POST_MA_XAC_MINH } from "../../api";
import axios from "axios";
import Icon from "react-native-vector-icons/MaterialCommunityIcons"
const XacNhanEmail = (props) => {
    const route = props.route;
    const email = route.params.email;
    const navigation = useNavigation();
    const [err, setErr] = useState(false);
    const info = useSelector((state)=> state.Reducers.arrUser)
    const [errMessage , setErrMessage] = useState('');
    const dispatch = useDispatch();
    const [countdown, setCountdown] = useState(60);
    const [keyCode, setKeyCode] = useState('');

    const handleVerificationCodeChange = (text) => {
      // Xóa các ký tự không phải là số
      const cleanedText = text.replace(/[^0-9]/g, '');
  
      // Thêm dấu cách sau mỗi 3 ký tự
      const formattedCode = cleanedText.replace(/(.{3})/g, '$1 ');
  
      // Cập nhật giá trị mã xác minh
      setVerificationCode(formattedCode);
    };
    useEffect(()=>{
       if(countdown == 0){
        console.log("Đã hết");
       }
      
    },[countdown])
    useEffect(() => {
        // Nếu đếm ngược còn dương, thiết lập hẹn giờ để giảm thời gian đếm ngược
        if (countdown > 0) {
        const intervalId = setInterval(() => {
            setCountdown((prevCountdown) => prevCountdown - 1);
        }, 1000);

        // Làm sạch interval khi component bị unmount hoặc khi đếm ngược về 0
        return () => {
            clearInterval(intervalId);
        };
        }
    }, [countdown]);
    const guiLaiMa = async(email)=>{
        let data= {
            email:email
        }
        await axios.post(POST_KEY_CODE_EMAIL,data).then((res)=>{
           
            if(res.data.errCode == 0){
                setCountdown(60)
            }else{
                alert(res.data.errMessage)
            }
     }).catch((err)=>{console.log(err);})
        
    }
    const validate = async(email)=>{
        let data= {
            email: email,
            key_code: keyCode
        }
        if(email != "" && keyCode !=""){
            console.log(POST_MA_XAC_MINH);
            await axios.post(POST_MA_XAC_MINH,data).then((res)=>{
                if(res.data.errCode == 0){
                    navigation.navigate('Lấy lại mật khẩu của bạn',{email:email})
                    
                }else{
                    alert(res.data.errMessage)
                }
            }).catch((err)=>{console.log(err);})
        }else{
            alert("Bạn chưa nhập mã xác minh")
        }

    }
    return (
        <View style={{ flex: 1 }}>
           
          
            <Text
                style={{ marginTop: 50, alignSelf: "center", fontSize: 24, fontWeight: 600 }}
                >Nhập mã xác minh email ({countdown})</Text>
                {countdown > 0 &&
                <View style={{ width: '80%', height: 50, borderWidth: 0.5, 
                borderRadius: 10, alignSelf: "center", marginTop: 20,
                flexDirection: "row", alignItems: "center",paddingLeft:20,paddingRight:20}}>
            
           
                 <TextInput 
                 value={keyCode}
                 onChangeText={text => {
                     setKeyCode(text);
                 }}
                 
                 placeholder={"Nhập mã xác minh"}
                 maxLength={6}
                 keyboardType="number-pad"
                 style={{marginLeft:10}}></TextInput>
            
        </View>
        }
        {
            err==true && (<Text style={{marginTop:10,marginLeft:40,color:'red'}}>{errMessage}</Text>)
          }
          {
            countdown == 0 &&
            <CustomButton title={'Gửi lại mã'} bgColor={'#000'} textColor={'#fff'} 
            onPress={() => {guiLaiMa(email)}}
            >
            </CustomButton>
          } 
          {
            countdown > 0 &&
            <CustomButton title={'Gửi mã xác nhận'} bgColor={'green'} textColor={'#fff'} 
            onPress={() => {validate(email)}}
            >
            </CustomButton>
          }
        
          
        </View>
    )
}
export default XacNhanEmail;