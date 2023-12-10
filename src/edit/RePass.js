import { View, Text, Pressable, Image, StyleSheet, ToastAndroid, Alert } from 'react-native'
import React, { useState } from 'react'
import Header from '../common/Header';
import CustomTextInput from '../common/CustomTextInput';
import CommonButton from '../common/CommonButton';
import { Avatar, Title } from 'react-native-paper';
import Icon from "react-native-vector-icons/MaterialCommunityIcons"
import {useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { useIsFocused, useNavigation } from '@react-navigation/native';
import axios from 'axios';
import { PROFILE_MEMBER, CHANGE_PASSWD } from '../../api';
import { updateEmail } from '../redux/action/Actions';


const RePass = () => {
    const dispatch = useDispatch();
    //show password
    const [showPassWord, setShowPass] = useState(true)
    const [showPassWord2, setShowPass2] = useState(true);
    const [showPassWord1, setShowPass1] = useState(true);
    //nhập và ktra mk
    const [password, setPassWord] = useState('');
    const [badPasswd, setBadPasswd] = useState(false);
    const [passwordNew, setPassWordNew] = useState('');
    const [badrepasswd, setBadRePasswd] = useState('');
    const [re_password, setRePassWord] = useState('');
    const [BadPasswd1, setBadPasswd1] = useState(false);
    const [badConfirmPassword, setBadConfirmPassword] = useState(false);
    //
    const info = useSelector(state => state.Reducers.arrUser);
    const isFocused = useIsFocused();
    const [refreshing, setRefeshing] = useState(false);
    const [err, setError] = useState(false);
    const [errMessage, setErrorMessage] = useState('');
    const [profile, setProfile] = useState({});
    const navigation = useNavigation();

    const singOut = ()=>{
     
        dispatch(updateEmail({},false))
        navigation.navigate('Login')
    }
    showPass = () => {
        setShowPass(!showPassWord)

    }

    const showPass1 = () => {
        setShowPass1(!showPassWord1)

    }
    const showPass2 = () => {
        setShowPass2(!showPassWord2)

    }

    const changePasswd = async() => {
        if (password) {
            setBadPasswd(false)
        } else {
            setBadPasswd(true)
            setErrorMessage("Vui lòng nhập mật khẩu của bạn")
            return
        }
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
        const data1 = {
            id: info.id,
            password: password, 
            passwordNew: passwordNew,
            re_password:re_password,
        }
        console.log(CHANGE_PASSWD);
      await  axios.put(CHANGE_PASSWD, data1).then(res=>{
       
            if (res.data.errCode==1) {
                Alert.alert(
                    'Thông báo',
                    `Bạn đã đổi mật khẩu thành công`,
                    [{ text: 'OK', onPress: () =>  singOut() }],
                    { cancelable: false }
                  );
            }else{
                Alert.alert(
                    'Thông báo',
                    `${res.data.errMessage}`,
                    [{ text: 'OK', onPress: () => console.log(res.data.errMessage) }],
                    { cancelable: false }
                  );
            }
        }).catch((err) => {console.log(err);})
    }


    /// get dữ liệu người dùng
    const getProfile = async() => {
        const data = {
            id: info.id,
        }
    
      await axios.post(PROFILE_MEMBER, data).then((response) => {
            console.log(response.data,"kdsa;dk");
            if (response.data.errCode === 0) {

                setProfile({ ...response.data.userMember })
                setRefeshing(false)
            }
        }).catch((err) => {console.log(err);})
    }
    useEffect(() => {
        setError(false);
        getProfile();
    }, [isFocused])


    return (
        <>
          
            <View style={{ justifyContent: 'center', alignSelf: 'center' , marginTop:20}}>
                <Image
                        source={{uri:info.anhDaiDien}} 
                        style={{width:100,height:100, borderRadius:50}}
                        />
               

            </View>
            <View style={{ marginLeft: 20 }}>
                <View style={[styles.row, {
                    justifyContent: 'center',
                    alignItems: 'center',
                }]}>
                    <Title style={[styles.title, {
                        marginTop: 15,
                        marginBottom: 5

                    }]}>
                        {profile.tenThanhVien ? profile.tenThanhVien : ''}
                    </Title>

                </View>
            </View>
            <View>
                <View style={{ position: 'relative' }} >
                    <CustomTextInput
                        placeholder={'Xin Nhập Mật Khẩu'}
                        value={password}
                        onChangeText={text => { setPassWord(text); }}
                        type={showPassWord1 ? 'password' : 'texxt'}
                        icon={require('../images/pass.png')}
                    />
                    <Pressable style={{ position: 'absolute', right: 50, top: "50%" }} onPress={() => showPass1()}>
                        {showPassWord1 ?
                             <Icon name="eye" size={25} color='#000'/>
                             :
                             <Icon name="eye-off" size={25} color='#000'/>}
                    </Pressable>
                    {
                        badPasswd == true && (<Text style={{ marginTop: 10, marginLeft: 40, color: 'red' }}>{errMessage}</Text>)
                    }
                </View>
            </View>
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
            <CommonButton
                title={'Đổi mật khẩu'}
                bgColor={'#000'}
                textColor={'#fff'}
                onPress={() => { changePasswd() }} 
                />

        </>
    );
};

export default RePass

const styles = StyleSheet.create({
    container: {
        backgroundColor: "#FFFFF",
        flex: 1
    },
    userInfoSectiom: {

        paddingHorizontal: 25,

        marginTop: 5
    },
    title: {
        fontSize: 22,
        fontWeight: 'bold',
    },
    caption: {
        fontSize: 14,
        lineHeight: 14,
        fontWeight: '500'
    },
    row: {
        flexDirection: 'row',
        marginBottom: 10
    },
    infoBoxWrapper: {
        borderBottomColor: '#dddddd',
        borderBottomWidth: 1,
        borderTopColor: '#dddddd',
        borderTopWidth: 1,
        flexDirection: 'row',
        height: 100
    },
    infoBox: {
        width: '50%',
        alignItems: 'center',
        justifyContent: 'center',
    },
    menuWrapper: {
        marginTop: 10
    },
    menuItem: {
        flexDirection: 'row',
        paddingHorizontal: 15,
        paddingVertical: 15,
        fontWeight: '600',
        lineHeight: 26,
        fontSize: 16
    },
    menuItemText: {
        color: '#777777',
        marginLeft: 20,
        fontWeight: '600',
        fontSize: 16,
        lineHeight: 26
    }

});