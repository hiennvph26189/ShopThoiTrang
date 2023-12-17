import { View, Text, TouchableOpacity, Alert, ToastAndroid } from 'react-native'
import React, { useEffect, useState } from 'react'
import { useNavigation } from '@react-navigation/native';
import { DELETE_ADDRESS_MEMBERS, UPDATE_STATUS_ADDRESS_MEMBERS } from '../../api'
import { useSelector } from 'react-redux';
import SelectDropdown from 'react-native-select-dropdown'
import axios from 'axios';
import { RadioButton } from 'react-native-paper';

const ItemAddress = (props) => {
    const navigation = useNavigation();
    const item = props.item
    const id = props.item.id;
    const [trangThai, setTrangThai] = useState('')
    const info = useSelector(state => state.Reducers.arrUser);

    const [checked, setChecked] = useState('');
    const setChecked1 = async () => {
        const data = {
            id: id,
            id_member: info.id,
        }
        await axios.put(UPDATE_STATUS_ADDRESS_MEMBERS, data).then((res) => {
            if (res.data.errCode === 0) {

                setTrangThai(res.data.listAddress)
                props.loadData()
            }
        }).catch((err) => { console.log(err) })
    }

    const EditAddress = () => {
        navigation.navigate('Sửa địa chỉ', { item: item });
    }

    const deleteItem = async () => {
        await axios.put(`${DELETE_ADDRESS_MEMBERS}?id=${id}&id_member=${info.id}`).then((res) => {
            if (res.data.errCode == 0) {
                ToastAndroid.showWithGravity(
                    'Xóa địa chỉ thành công',
                    ToastAndroid.SHORT,
                    ToastAndroid.BOTTOM, 25, 50,
                );
                props.loadData()
            }

        }).catch((err) => { console.log(err); })
    }
    const deleteAddress = () => {
        Alert.alert(
            'Thông báo',
            `Bạn có chắc chắn muốn xóa địa chỉ này không?`,
            [{ text: 'OK', onPress: () => deleteItem() },
            { text: 'Cancel', onPress: () => console.log("OK") },
        
            ],
            {    cancelable: false }
        );
       
    }
   

    const formatPhoneNumber = (phoneNumber) => {
        // Định dạng số điện thoại thành 'XXXX XXX XXX'
        return phoneNumber.replace(/(\d{4})(\d{3})(\d{3})/, '$1 $2 $3');
    };

    return (
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <RadioButton
                value={item.status}
                status={item.status === 'MAC-DINH' ? 'checked' : 'unchecked'}
                onPress={() => setChecked1()}

            />

            <View style={{
                flex: 1,
                flexDirection: 'row',
                padding: 20,
                borderRadius: 20,
                justifyContent: 'space-between',
                marginVertical: 5,
                borderBottomWidth: 1,
                backgroundColor: '#e6e6e6'
            }}>
                <View
                    style={{
                        flex: 1,
                    }}
                    key={item.id}>

                    <View style={{ flexDirection: 'row' }}>
                        <Text style={{ fontSize: 16, fontWeight: '500' }}>{item.hoTen + ' '}</Text>
                        <Text style={{ fontSize: 15 }}>|{formatPhoneNumber(' ' + item.soDienThoai)}</Text>
                    </View>
                    <Text style={{ fontSize: 15, maxWidth: 320, marginBottom: 5 }}>{item.diaChi}</Text>
                    {item.status=='MAC-DINH' && 
                        <View style={{
                        borderWidth: 1,
                        borderRadius: 10,
                        padding: 4, // Giảm khoảng trắng thừa bằng cách thay đổi giá trị padding
                        width: 140,
                        borderColor: '#AA0000'
                    }}>
                        <TouchableOpacity>
                            <Text style={{
                                color: '#AA0000',
                                textAlign: 'center'
                            }}>Mặc định</Text>
                        </TouchableOpacity>
                    </View>
                    }
                    
                </View>
                <View style={{ flexDirection: 'column' }}>
                    <TouchableOpacity
                        onPress={() => { EditAddress(item) }}>
                        <Text style={{ color: '#AA0000' }}>Sửa</Text>
                    </TouchableOpacity>
                {item.status != "MAC-DINH" &&
                    <TouchableOpacity
                        style={{ marginTop: 30 }}
                        onPress={() => { deleteAddress() }}
                    >
                        <Text style={{ color: '#AA0000' }}>Xóa</Text>
                    </TouchableOpacity>}
                    
                </View>

            </View>
        </View>
    );
};
export default ItemAddress;