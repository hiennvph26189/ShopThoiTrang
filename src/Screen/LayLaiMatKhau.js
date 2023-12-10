import { useNavigation } from "@react-navigation/native";
import { useState,useEffect } from "react";
import { TextInput } from "react-native";
import { Image, Text, View,Alert,Pressable } from "react-native";
import CustomButton from "../common/CustomButton";
import CustomTextInput from "../common/CustomTextInput";
import Icon from "react-native-vector-icons/MaterialCommunityIcons"
import {updateEmail} from "../redux/action/Actions";
import {useDispatch, useSelector} from 'react-redux'
import { POST_KEY_CODE_EMAIL,POST_PASSWORD_MEMBER } from "../../api";
import axios from "axios";

const LayLaiMatKhau = (props) => {
    const route = props.route;
    const email = route.params.email;
    const navigation = useNavigation();
    const [BadPasswd1, setBadPasswd1] = useState(false);
    const [badConfirmPassword, setBadConfirmPassword] = useState(false);
    const [err, setErr] = useState(false);
    const info = useSelector((state)=> state.Reducers.arrUser)
    
    const dispatch = useDispatch();
    const [showPassWord2, setShowPass2] = useState(true);
    const [errMessage, setErrorMessage] = useState('');
    const [passwordNew, setPassWordNew] = useState('');
    const [showPassWord, setShowPass] = useState(true)
    const [re_password, setRePassWord] = useState('');
    useEffect(()=>{
        setErr(false)
      
    },[])
   
 
    const showPass2 = () => {
        setShowPass2(!showPassWord2)

    }
    const showPass = () => {
        setShowPass(!showPassWord)

    }
    const validate = ()=>{
        if (passwordNew) {
            setBadPasswd1(false)
        } else {
            setBadPasswd1(true)
            setErrorMessage("Vui lòng nhập mật khẩu muốn đổi")
            return
        }
        if (re_password) {

            if (re_password !== passwordNew) {
                setBadConfirmPassword(true)
                setErrorMessage("Mật khẩu không trùng khớp. Vui lòng nhập lại mật khẩu")
            } else {
                setBadConfirmPassword(false)
            }
        } else {
            setBadConfirmPassword(true)
            setErrorMessage("Vui lòng nhập lại mật khẩu của bạn")
            return
        }
        let data = {
            email:email,
            password:passwordNew
        }
        axios.put(POST_PASSWORD_MEMBER,data).then((res)=>{
            if(res.data.errCode == 0){
                Alert.alert(
                    'Thông báo',
                    res.data.errMessage,
                    [{ text: 'OK', onPress: () => navigation.navigate('Login') },
                        
                    ],
                    { cancelable: false }
                  );
            }else{
                Alert.alert(
                    'Thông báo',
                    res.data.errMessage,
                    [{ text: 'OK' }],
                    { cancelable: false }
                  );
            }
        }).catch((err)=>{console.log(err);})
    }
    return (
        <View style={{ flex: 1 }}>
   
          
            <Text
                style={{ marginTop: 50, alignSelf: "left",marginLeft:42, fontSize: 20, fontWeight: 600 }}
            >Vui lòng nhập mật khẩu mới:</Text>
         <View>
                <View style={{ position: 'relative' }} >
                    <CustomTextInput
                        placeholder={'Nhập mật khẩu muốn đổi'}
                        value={passwordNew}
                        onChangeText={text => { setPassWordNew(text); }}
                        type={showPassWord2 ? 'password' : 'texxt'}
                        icon={require('../images/pass.png')}
                    />
                    <Pressable style={{ position: 'absolute', right: 50, top: "50%" }} onPress={() => showPass2()}>
                        {showPassWord2 ?
                            <Icon name="eye" size={25} color='#000'/>
                            :
                            <Icon name="eye-off" size={25} color='#000'/>}
                    </Pressable>
                    {
                        BadPasswd1 == true && (<Text style={{ marginTop: 10, marginLeft: 40, color: 'red' }}>{errMessage}</Text>)
                    }
                </View>
            </View>
            <Text
                style={{ marginTop: 10, alignSelf: "left",marginLeft:40, fontSize: 20, fontWeight: 600 }}
            > Xác nhận mật khẩu:</Text>
            <View>
                <View style={{ position: 'relative' }}>
                    <CustomTextInput
                        value={re_password}
                        onChangeText={text => { setRePassWord(text); }}
                        type={showPassWord ? 'password' : 'text'}
                        placeholder={"Nhập Lại Mật Khẩu"} icon={require('../images/pass.png')}

                    >

                    </CustomTextInput>
                    <Pressable style={{ position: 'absolute', right: 50, top: "50%" }} onPress={() => showPass()}>
                        {showPassWord ?
                            <Icon name="eye" size={25} color='#000'/>
                            :
                            <Icon name="eye-off" size={25} color='#000'/>
                            
                            }
                    </Pressable>
                </View>
                {
                    badConfirmPassword == true && (<Text style={{ marginTop: 10, marginLeft: 40, color: 'red' }}>{errMessage}</Text>)
                }
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
export default LayLaiMatKhau;