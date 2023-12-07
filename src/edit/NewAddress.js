import { View, Text, TextInput, TouchableOpacity, FlatList, ActivityIndicator, Alert, ToastAndroid,ScrollView } from 'react-native'
import React, { useEffect, useState } from 'react'
import Icon from "react-native-vector-icons/MaterialCommunityIcons"
import Header from '../common/Header'
import CommonButton from '../common/CommonButton'
import { useNavigation } from '@react-navigation/native'
import SelectDropdown from 'react-native-select-dropdown'
import { GET_TINH_THANH, GET_QUAN, GET_XA, POST_ADDRESS_MEMBERS } from '../../api'
import axios from 'axios'
import { useSelector } from 'react-redux'


const NewAddress = () => {
    const info = useSelector(state => state.Reducers.arrUser);
    const navigation = useNavigation();
    const [hoten, setHoTen] = useState('');
    const [badHoTen, setBadHoTen] = useState(false);
    const [phone, setPhone] = useState('')
    const [badphone, setBadPhone] = useState(false);
    const [tinhThanh, setTinhThanh] = useState([]);
    const [tenTinh, setTenTinh] = useState('');
    const [badTinh, setBadTinh] = useState(false);
    const [quanHuyen, setQuanHuyen] = useState([]);
    const [tenQuan, setTenQuan] = useState('')
    const [badQuan, setBadQuan] = useState(false);
    const [ten, setTen] = useState('Chọn Quận/huyện')
    const [IdTinh, setIdTinh] = useState(0);
    const [checkQuan, setCheckQuan] = useState(false);
    const [IdQuan, setIdQuan] = useState(0)
    const [xaPhuong, setXaPhuong] = useState([]);
    const [tenXa, setTenXa] = useState('')
    const [badXa, setBadXa] = useState(false);
    const [name, setName] = useState('Chọn Xã/Phường/Thị trấn')
    const [checkXa, setCheckXa] = useState(false)
    const [address, setAddress] = useState('');
    const [badAddress, setBadAddress] = useState(false)
    const [error, setError] = useState('')

    const choiceTinh = async () => {
        await axios.get(GET_TINH_THANH).then((res) => {
            if (res.data.errCode == 0) {
                res.data.listTinhThanh.map((item, index) => {
                })
                setTinhThanh(res.data.listTinhThanh)
            }
        }).catch((err) => { console.log(err); })
    }
    const choiceQuanHuyen = async (IdTinh) => {
        await axios.get(`${GET_QUAN}?tinh=${IdTinh}`).then((res) => {
            if (res.data.errCode == 0) {
                console.log(res.data.listQuan + ' quan');
                setQuanHuyen(res.data.listQuan)

            }
        }).catch((err) => { console.log(err); })
    }
    const choiceXa = async (IdTinh, IdQuan) => {
        await axios.get(`${GET_XA}?tinh=${IdTinh}&quan=${IdQuan}`).then((res) => {
            if (res.data.errCode == 0) {
                console.log(res.data.listXa + ' quan');
                setXaPhuong(res.data.listXa)

            }
        }).catch((err) => { console.log(err); })
    }
    useEffect(() => {
        choiceTinh()

    }, [])

    const newAddress = async () => {
        const phoneNumber = /^(0?)(3[2-9]|5[6|8|9]|7[0|6-9]|8[0-6|8|9]|9[0-4|6-9])[0-9]{7}$/;
        if (hoten == '') {
            setBadHoTen(true);
            setError('Vui lòng nhập đầy dủ thông tin');
            return
        } else {
            setBadHoTen(false)
        }
        if (phone) {

            if (phoneNumber.test(phone) === true) {
                setBadPhone(false)

            } else {
                setBadPhone(true)
                setError("Số điện thoại không đúng định dạng")
                return
            }
        } else {
            setBadPhone(true)
            setError("Vui lòng nhập số điện thoại")
            return
        }
        if (tenTinh == '') {
            setBadTinh(true)
            setError('Vui lòng chọn Tỉnh/Thành phố')
            return
        } else {
            setBadTinh(false)
        }
        if (tenQuan == '') {
            setBadQuan(true)
            setError('Vui lòng chọn Quận/Huyện')
            return
        } else {
            setBadQuan(false)
        }
        if (tenXa == '') {
            setBadQuan(true)
            setError('Vui lòng chọn Xã/Phường/Thị trấn')
            return
        } else {
            setBadXa(false)
        }
        if (address == '') {
            setBadAddress(true)
            setError('vui lòng nhập Tên đường, số nhà hoặc địa chỉ cụ thể')
            return
        } else {
            setBadAddress(false)
        }
        const data = {
            id_member: info.id,
            hoTen: hoten,
            soDienThoai: phone,
            diaChi: address + ', ' + tenXa + ', ' + tenQuan + ', ' + tenTinh
        }
        
        await axios.post(POST_ADDRESS_MEMBERS, data).then((res) => {
            console.log(res.data + 'Ssss');
            if (res.data.errCode == 0) {
                ToastAndroid.showWithGravity(
                    'Thêm địa chỉ thành công',
                    ToastAndroid.SHORT,
                    ToastAndroid.BOTTOM, 25, 50,
                );
                navigation.goBack();
            }
        })

    }
    const defaultIndex = tinhThanh.findIndex((item) => item === "Tỉnh,Thành Phố");


    return (
        <ScrollView style={{padding:10, marginTop:20}}>
           
            <View style={{ marginHorizontal: 20, backgroundColor: '#e6e6e6', marginTop: 10, borderRadius: 20 }}>


                <TextInput
                    placeholder="Họ và tên"
                    multiline={true} style={{
                        height: 60,
                        fontSize: 18,
                        padding: 10,
                        flexDirection: 'row',
                        borderBottomWidth: 1,
                        backgroundColor: '#e6e6e6',
                        borderRadius: 20,
                    }}
                    value={hoten}
                    onChangeText={(text) => setHoTen(text)}
                />

            </View>
            {
                badHoTen == true && (<Text style={{ marginTop: 10, marginLeft: 40, color: 'red' }}>{error}</Text>)
            }
            <View style={{ marginHorizontal: 20, backgroundColor: '#e6e6e6', marginTop: 10, borderRadius: 20 }}>
                <TextInput
                    placeholder="Phone Number"
                    keyboardType='number-pad'
                    multiline={true} style={{
                        height: 60,
                        fontSize: 18,
                        padding: 10,
                        flexDirection: 'row',
                        borderBottomWidth: 1,
                        backgroundColor: '#e6e6e6',
                        borderRadius: 20,
                    }}
                    value={phone}
                    onChangeText={(text) => setPhone(text)}
                />

            </View>
            {
                badphone == true && (<Text style={{ marginTop: 10, marginLeft: 40, color: 'red' }}>{error}</Text>)
            }
            <View style={{
                flexDirection: 'row', marginTop: 15,
                padding: 8,
                borderRadius: 20,
                flexDirection: 'row',
                alignItems: 'center',
                marginVertical: 4,
                borderBottomWidth: 1,
                backgroundColor: '#e6e6e6',
                marginHorizontal: 15,

            }}>
                <View style={{ alignItems: 'center', justifyContent: 'center', padding: 12, borderRadius: 100, marginRight: 10, backgroundColor: '#66a182' }}>
                    <Icon name="map-search-outline" size={25} color='#fff' />
                </View>
                <SelectDropdown
                    buttonStyle={{ width: 250, fontSize: 16, height: 30, marginLeft: 10, flexDirection: 'row', alignItems: 'flex-start', justifyContent: 'flex-start', padding: 1, backgroundColor: '#e6e6e6' }}
                    data={tinhThanh}
                    dropdownStyle={{ width: 300, fontSize: 16, marginRight: 20, }}
                    defaultButtonText={'Tỉnh/Thành Phố'}
                    defaultIndex={defaultIndex}
                    onSelect={(selectedItem, index) => {

                        setTenTinh(selectedItem._name)
                        setIdTinh(selectedItem.id)
                        choiceQuanHuyen(selectedItem.id)
                        setTenQuan('')
                        setTenXa('')
                        console.log(selectedItem._name);
                        setCheckQuan(true)
                        setCheckXa(true)

                    }}
                    buttonTextAfterSelection={(selectedItem, index) => {

                        return selectedItem._name
                    }}
                    rowTextForSelection={(item, index) => {

                        return item._name

                    }}
                />

            </View>
            {
                badTinh == true && (<Text style={{ marginTop: 10, marginLeft: 40, color: 'red' }}>{error}</Text>)
            }
            {tenTinh && tenTinh != '' &&
                <View style={{
                    flexDirection: 'row', marginTop: 15,
                    padding: 8,
                    borderRadius: 20,
                    flexDirection: 'row',
                    alignItems: 'center',
                    marginVertical: 4,
                    borderBottomWidth: 1,
                    backgroundColor: '#e6e6e6',
                    marginHorizontal: 15,

                }}>
                    <View style={{ alignItems: 'center', justifyContent: 'center', padding: 12, borderRadius: 100, marginRight: 10, backgroundColor: '#66a182' }}>
                        <Icon name="map-search-outline" size={25} color='#fff' />
                    </View>
                    <SelectDropdown
                        buttonStyle={{ width: 250, fontSize: 16, height: 30, marginLeft: 10, flexDirection: 'row', alignItems: 'flex-start', justifyContent: 'flex-start', padding: 1, backgroundColor: '#e6e6e6' }}
                        data={quanHuyen}
                        dropdownStyle={{ width: 300, fontSize: 16, marginRight: 20, }}
                        defaultButtonText={'Quận/Huyện'}
                        defaultIndex={defaultIndex}
                        onSelect={(selectedItem, index) => {

                            console.log(selectedItem._name);
                            setTenQuan(selectedItem._prefix + ' ' + selectedItem._name)
                            choiceQuanHuyen(IdTinh)
                            setCheckQuan(false)
                            setCheckXa(true)
                            setTenXa('')
                            setIdQuan(selectedItem.id)
                            choiceXa(IdTinh, selectedItem.id)

                        }}
                        buttonTextAfterSelection={(selectedItem, index) => {
                            console.log(tenQuan + 'aaaaa');

                            if (checkQuan == true) {

                                console.log(tenQuan + ' sad');
                                return ten
                            } else {
                                return selectedItem._prefix + ' ' + selectedItem._name
                            }

                        }}
                        rowTextForSelection={(item, index) => {

                            return item._prefix + ' ' + item._name

                        }}
                    />

                </View>

            }
            {
                badQuan == true && (<Text style={{ marginTop: 10, marginLeft: 40, color: 'red' }}>{error}</Text>)
            }
            {tenTinh != '' && tenQuan != '' &&
                <View style={{
                    flexDirection: 'row',
                    marginTop: 15,
                    padding: 8,
                    borderRadius: 20,
                    flexDirection: 'row',
                    alignItems: 'center',
                    marginVertical: 4,
                    borderBottomWidth: 1,
                    backgroundColor: '#e6e6e6',
                    marginHorizontal: 15,

                }}>
                    <View style={{ alignItems: 'center', justifyContent: 'center', padding: 12, borderRadius: 100, marginRight: 10, backgroundColor: '#66a182' }}>
                        <Icon name="map-search-outline" size={25} color='#fff' />
                    </View>
                    <SelectDropdown
                        buttonStyle={{ width: 250, fontSize: 16, height: 30, marginLeft: 10, flexDirection: 'row', alignItems: 'flex-start', justifyContent: 'flex-start', padding: 1, backgroundColor: '#e6e6e6' }}
                        data={xaPhuong}
                        dropdownStyle={{ width: 300, fontSize: 16, marginRight: 20, }}
                        defaultButtonText={'Xã/Phường/Thị trấn'}
                        defaultIndex={defaultIndex}
                        onSelect={(selectedItem, index) => {

                            choiceXa(IdTinh, IdQuan)
                            setTenXa(selectedItem._prefix +" "+selectedItem._name)
                            console.log(selectedItem._name);
                            setCheckXa(false)


                        }}
                        buttonTextAfterSelection={(selectedItem, index) => {

                            if (checkXa == true) {

                                return name
                            } else {
                                return selectedItem._prefix + ' ' + selectedItem._name
                            }

                        }}
                        rowTextForSelection={(item, index) => {

                            return item._prefix + ' ' + item._name

                        }}
                    />

                </View>

            }
            {
                badXa == true && (<Text style={{ marginTop: 10, marginLeft: 40, color: 'red' }}>{error}</Text>)
            }

            <View style={{ marginHorizontal: 20, backgroundColor: '#e6e6e6', marginTop: 10, borderBottomLeftRadius: 20, borderBottomRightRadius: 20 }}>
                <TextInput
                    placeholder="Tên đường, Tòa nhà, Số nhà "
                    multiline={true} style={{
                        height: 60,
                        fontSize: 18,
                        padding: 10,
                        flexDirection: 'row',
                        borderBottomWidth: 1,
                        backgroundColor: '#e6e6e6',
                        borderRadius: 20,
                    }}
                    value={address}
                    onChangeText={(text) => setAddress(text)}
                />
                {
                    badAddress == true && (<Text style={{ marginTop: 10, marginLeft: 40, color: 'red' }}>{error}</Text>)
                }
            </View>
            <View style={{
                marginTop: 20,
                padding: 10,
                flexDirection: 'row',
                backgroundColor: '#e6e6e6',
                marginHorizontal: 20,
                borderRadius: 20,
            }}>
                <Text style={{
                    fontSize: 16
                }}>{address != '' ? address + ', ' : null}{tenXa != '' ? tenXa + ', ' : null} {tenQuan != '' ? tenQuan + ', ' : null} {tenTinh != '' ? tenTinh : null}</Text>
            </View>

            <TouchableOpacity
                onPress={() => { newAddress() }}
                style={{
                    backgroundColor: '#000',
                    justifyContent: 'center',
                    alignItems: 'center',
                    width: '85%',
                    height: 50,
                    borderRadius: 20,
                    alignSelf: 'center',
                    marginTop: 50,
                }}>
                <Text style={{ fontSize: 16, color: '#fff', fontWeight: '600' }}>Thêm địa chỉ</Text>
            </TouchableOpacity>
        </ScrollView>
    )
}

export default NewAddress;