import { View, Text,TouchableOpacity } from 'react-native'
import React, { useEffect } from 'react'
import { GET_ADDRESS_MEMBERS } from '../../api';
import ItemAddress from './ItemAddress';
import axios from 'axios';
import { useState } from 'react';
import { useSelector } from 'react-redux';
import { ScrollView } from 'react-native';

import { useIsFocused, useNavigation } from '@react-navigation/native';


const ListAddress = (props) => {
  const navigation = useNavigation();
  const [address, setAddress] = useState([]);
  const isFocused = useIsFocused();
  const info = useSelector(state => state.Reducers.arrUser);


  const getAddress = async () => {
    await axios.get(`${GET_ADDRESS_MEMBERS}?id_members=${info.id}`).then((res) => {
      if (res.data.errCode === 0) {

        setAddress(res.data.listAddress)

      }
    }).catch((err) => { console.log(err) })
  }
  useEffect(() => {
    getAddress()
  }, [isFocused])

  const lodaData = () => {
    
    getAddress()
  }
  return (
    <>
      <View  style={{justifyContent:"flex-end",flexDirection:"row", marginRight:10, marginBottom:5}}>
        <TouchableOpacity
            onPress={() => { navigation.navigate('Thêm mới địa chỉ') }}
            style={{
              backgroundColor: 'green',
              justifyContent: 'center',
              alignItems: 'center',
             
              padding:10,
              borderRadius: 10,
              alignSelf: 'center',
              marginTop: 10,
              
            }}>
            <Text style={{ fontSize: 16, color: '#fff', fontWeight: '600', }}>Thêm địa chỉ</Text>

          </TouchableOpacity>
      </View>
      <ScrollView
        showsHorizontalScrollIndicator={false}
        style={{ marginTop: 5 }}>
        {address && address.map((item) => {
          return (
            <ItemAddress
              key={item.id}
              item={item}
              loadData={lodaData}

            />
          )
        })}
        

      </ScrollView>
    </>
  );
};

export default ListAddress;