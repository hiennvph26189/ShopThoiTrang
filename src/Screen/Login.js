import { useNavigation } from "@react-navigation/native";
import { useState,useEffect } from "react";
import { TextInput } from "react-native";
import { Image, Text, View,ToastAndroid,Pressable } from "react-native";
import CustomButton from "../common/CustomButton";
import CustomTextInput from "../common/CustomTextInput";
import {LOGIN} from "../../api";
import {updateEmail} from "../redux/action/Actions";
import {useDispatch, useSelector} from 'react-redux'
import axios from "axios";

const Login = () => {
    const navigation = useNavigation();
    const [email, setEmail] = useState('Nva@gmail.com');
    const [password, setPassWord] = useState('123456');
    const [err, setErr] = useState(false);
    const info = useSelector((state)=> state.Reducers.arrUser)
    const [showPassWord1,setShowPass1] = useState(true);
    const [errMessage , setErrMessage] = useState('');
    const dispatch = useDispatch();
    useEffect(()=>{
        setErr(false)
      
    },[])
    showPass1 = ()=>{
            setShowPass1(!showPassWord1)
            
        }
    const validate = () => {
        const reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
        
        const data = {
            email: email,
            password:password
         }
        
         if(email||password){
            if(reg.test(email) === true){
                axios.post(LOGIN,data).then(res=> {
           
                    if(res.data.errCode ===0){
                        if(res.data.user.status !==2){
                            
                        setErr(false)
                        ToastAndroid.showWithGravity(
                            'Chào mừng: ' + res.data.user.tenThanhVien,
                            ToastAndroid.SHORT,
                            ToastAndroid.BOTTOM,  10,100,
                          );
                          
                          dispatch(updateEmail(res.data.user,true))
                          navigation.navigate('Home',0)
                        }else{
                            alert("Tài khoản của bạn đã bị khóa")
                            return;
                        }
                        
                       
                     }else{
                         setErrMessage(res.data.message)
                        
                         setErr(true)
                         
                        
                     }
                
                
                
             }).catch(err=> console.log(err))
            }else{
                setErrMessage("Email không đúng định dạng")
                setErr(true)
            }
            
         
         }else{
            setErrMessage("Email và password không được để trống")
            setErr(true)
         }
        
             
         
        
    }

    return (
        <View style={{ flex: 1 }}>
            {/* <Image
                source={require('../Screen/image/LogoChao.png')}
                style={{ width: 60, height: 60, alignSelf: "center", marginTop: 100, borderRadius: 70 }}>
            </Image> */}
            <Text
                style={{ marginTop: 50, alignSelf: "center", fontSize: 24, fontWeight: 600 }}
            >Login</Text>
         <CustomTextInput
            
          placeholder={"Xin Nhập Tài Email"} 
          value={email}
          onChangeText = {text =>{setEmail(text);}}
          ></CustomTextInput>
         

         

          <View style={{position:'relative'}}>
            <CustomTextInput
            value={password}
            onChangeText= {text => {setPassWord(text);}} 
                type={showPassWord1?'password':'texxt'}
            placeholder={"Xin Nhập Mật Khẩu"} icon={require('../Screen/image/pass.png')}>
            </CustomTextInput>

            <Pressable style={{position:'absolute',right:50,top:31}} onPress={()=>showPass1()}>
            {showPassWord1?
                <Image
                    style={{width:25,height:25}}
                    source={require('../Screen/image/eye.png')}
                />
            :
            <Image
                    style={{width:25,height:25}}
                    source={require('../Screen/image/hidden.png')}
                />}
            </Pressable>
      </View>

        {
            err==true && (<Text style={{marginTop:10,marginLeft:40,color:'red'}}>{errMessage}</Text>)
          }
          <CustomButton title={'Login'} bgColor={'#000'} textColor={'#fff'} 
          onPress={() => {validate()}}
          >
          </CustomButton>

          
          <Text style={{fontSize:18,fontWeight:'800',alignSelf:"center",marginTop:20,textDecorationLine:"underline"}}
           onPress={() => { navigation.navigate('NewAccount')}} > Create New Account</Text>
        </View>
    )
}
export default Login;