import { Button, Dimensions, Image, ScrollView, Text, TextInput, TouchableOpacity, View, Alert } from "react-native";
import React, { useEffect, useState } from "react";
import MapView, { Marker } from "react-native-maps";
import CustomTextInput from "../common/CustomTextInput";
import CommonButton from "../common/CommonButton";
import { useDispatch, useSelector } from 'react-redux'
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import axios from "axios";
import { FEED_BACK } from "../../api";
import Header from "../common/Header";

const Contact = () => {
  const WIDTH = Dimensions.get('window').width;
  const [feedBack, setFeedBack] = useState('');

  const info = useSelector(state => state.Reducers.arrUser);

  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [contact, setContact] = useState('');

  const onFeedBack = async() => {

    const data = {
      name: name,
      email: email,
      contact: contact
    }
    
   await axios.post(FEED_BACK, data).then((res) => {

      if (res.data.errCode === 1) {
        Alert.alert(
          'Thông báo',
          `${res.data.errMessage}`,
          [{ text: 'OK', onPress: () => console.log(res.data.errMessage) }],
          { cancelable: false }
        );
        setName('');
        setEmail('');
        setContact('');
      }else{
        alert(res.data.errMessage);
      }
    }).catch((err) => { console.log(err) })
  }
  useEffect(() => {
    if (info) {
      setEmail(info.email);
      setName(info.tenThanhVien);
    }
   
  }, [])

  return (
    <>
    <Header 
    title={'Contact'}
    />
    <ScrollView style={{ flexGrow: 1, flex: 1, marginBottom: 10 }}>
      <View style={{ height: 300, padding: 6, WIDTH }}>
        <MapView style={{ flex: 1, height: 200 }}
          initialRegion={{
            latitude: 20.9999531,
            longitude: 105.8046858,
            latitudeDelta: 0.03,
            longitudeDelta: 0.03,
          }}>
          <Marker
            coordinate={{ latitude: 20.9999531, longitude: 105.8046858 }}
            title="Marker Title"
            description="Marker Description"
          />
        </MapView>
      </View>
      <View style={{ marginBottom: 50, marginTop: 10, marginHorizontal: 8 }}>
        <Image
          source={require('../images/logo.png')}
          style={{ width: 150, height: 100 }}
        />
        <Text style={{
          alignContent: 'center',
          fontSize: 17,
          marginTop: 10,
          marginBottom: 10,
          alignSelf: 'center'
        }}>
          Sapo được thành lập với niềm đam mê và khát vọng thành công trong lĩnh vực Thương mại điện tử. Chúng tôi đã và đang khẳng định được vị trí hàng đầu bằng những sản phẩm.
        </Text>
        <View style={{
          padding: 8,
          borderRadius: 20,
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-between',
          marginVertical: 4,
          borderBottomWidth: 1,
          backgroundColor: '#e6e6e6',
          marginHorizontal: 2,
        }}>
          <View style={{
            flexDirection: 'row',
            width: '80%',
            alignItems: 'center'
          }}>
            <View style={{ alignItems: 'center', justifyContent: 'center', padding: 12, borderRadius: 100, marginRight: 10, backgroundColor: '#66a182' }}>
              <Icon name="map-marker" size={25} color='#fff' />
            </View>
            <Text>Tầng 6 266 Đội Cấn - Ba Đình - Hà Nội, Hà Nội</Text>

          </View>
        </View>
        <View style={{
          padding: 8,
          borderRadius: 20,
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-between',
          marginVertical: 4,
          borderBottomWidth: 1,
          backgroundColor: '#e6e6e6',
          marginHorizontal: 2,
        }}>
          <View style={{
            flexDirection: 'row',
            width: '80%',
            alignItems: 'center'
          }}>
            <View style={{ alignItems: 'center', justifyContent: 'center', padding: 12, borderRadius: 100, marginRight: 10, backgroundColor: '#66a182' }}>
              <Icon name="phone-classic" size={25} color='#fff' />
            </View>
            <Text>1900 6750</Text>
          </View>
        </View>
        <View style={{
          padding: 8,
          borderRadius: 20,
          flexDirection: 'row',
          alignItems: 'center',
          marginVertical: 4,
          justifyContent: 'space-between',
          borderBottomWidth: 1,
          backgroundColor: '#e6e6e6',
          marginHorizontal: 2,
        }}>
          <View style={{
            flexDirection: 'row',
            width: '80%',
            alignItems: 'center'
          }}>
            <View style={{ alignItems: 'center', justifyContent: 'center', padding: 12, borderRadius: 100, marginRight: 10, backgroundColor: '#66a182' }}>
              <Icon name="email-outline" size={25} color='#fff' />
            </View>
            <Text>Hellocafein@gmail.com</Text>
          </View>
        </View>
        <View>
          <Text style={{ fontSize: 25, fontWeight: '700', marginTop: 10 }}>
            LIÊN HỆ
          </Text>
          <View style={{ marginHorizontal: 4, backgroundColor: '#e6e6e6', marginTop: 10 }}>
            <TextInput
              multiline={true}
              placeholder="Họ và tên"
               style={{
                height: 60,
                fontSize: 18,
                padding: 8,
                flexDirection: 'row',
                borderBottomWidth: 1,
                backgroundColor: '#e6e6e6',
                borderRadius: 20,
              }}
              value={name}
              onChangeText={(text) => setName(text)}
            />
          </View>
          <View style={{ marginHorizontal: 4, backgroundColor: '#e6e6e6', marginTop: 10 }}>
            <TextInput
            placeholder="Email"
              multiline={true} style={{
                height: 60,
                fontSize: 18,
                padding: 8,
                flexDirection: 'row',
                borderBottomWidth: 1,
                backgroundColor: '#e6e6e6',
                borderRadius: 20,
              }}
              value={email}
              onChangeText={(text) => setEmail(text)} />
          </View>
          <View style={{ marginHorizontal: 4, backgroundColor: '#e6e6e6', marginTop: 10 }}>
        
            <TextInput
                placeholder="Nhập nội dung cần gửi..."
                numberOfLines={10} // Số lượng dòng xuất hiện mặc định
                textAlignVertical="top" 
              multiline={true} 
              style={{
                padding:5,
                fontSize: 16,
                flexDirection: 'row',
                borderBottomWidth: 1,
                backgroundColor: '#e6e6e6',
                borderRadius: 20,
              }}
              value={contact}
              onChangeText={(text) => setContact(text)}
            />
          </View>
          <TouchableOpacity
            onPress={() => { onFeedBack() }}
            style={{
              backgroundColor: 'black',
              justifyContent: 'center',
              alignItems: 'center',
              width: '85%',
              height: 50,
              borderRadius: 20,
              alignSelf: 'center',
              marginTop: 10,
              marginBottom:30
            }}>
            <Text style={{
              color: 'white',
              fontWeight: '700'
            }}>Gửi phản hồi</Text>
          </TouchableOpacity>
        </View>
      </View>

    </ScrollView>
    </>
  );
};
export default Contact;