import { View, Text, Image, TouchableOpacity, Pressable, StyleSheet, ToastAndroid, Alert } from 'react-native'
import React, { useEffect, useState } from 'react'
import { useNavigation, useIsFocused } from "@react-navigation/native";
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import Icon from "react-native-vector-icons/Foundation"
import { LIKE_PRODUCTS, DELETE_LIKE_PRODUCTS, GET_ONE_LIKE_PRODUCT, POST_CART_USER } from '../../api';

const ItemLike = (props) => {

    const item = props.item
    const navigation = useNavigation();
    const isFocused = useIsFocused();
    const [like, setLike] = useState(false);
    const info = useSelector(state => state.Reducers.arrUser);
    const id = props.item.id;

    showImage = (image) => {
        if (image) {
    
          let list = JSON.parse(image)
          let url = ""
          for (let i = 0; i < list.length; i++) {
            if (list[0]) {
              url = list[0]
            }
          }
          return url
    
        }
      }

      const xoaLike_product = async () => {
        // Hiển thị Alert để xác nhận việc xóa
        Alert.alert(
          'Xác nhận',
          'Bạn có chắc chắn muốn hủy yêu thích sản phẩm này không?',
          [
            {
              text: 'Hủy',
              style: 'cancel',
            },
            {
              text: 'Xóa',
              onPress: async () => {
                try {
                  const res = await axios.delete(`${DELETE_LIKE_PRODUCTS}?id_product=${id}&id_member=${info.id}`);
                
                  if (res && res.data.errCode === 0) {
                    ToastAndroid.showWithGravity(
                      'Xóa sản phẩm yêu thích thành công',
                      ToastAndroid.SHORT,
                      ToastAndroid.BOTTOM, 25, 50,
                    );
                    props.lodaData1()
                    // getOneLikeProd(idProduct, info.id)
                  }
                } catch (error) {
                  console.log(error);
                }
              },
            },
          ],
          { cancelable: false }
        );
      }
      handleDetailProduct = (id) => {
        navigation.navigate('Chi tiết sản phẩm', { id: id }, { handleDetailProduct: { handleDetailProduct } });
      }
      const onAddToCart = async (item) => {

        let id = info.id
        
       
        if (id && item.id) {
    
          let data = {
            id_member: info.id,
            id_product: item.id,
            soLuong: 1,
            size: ""
          }
          await axios.post(POST_CART_USER, data).then(res => {
    
            if (res.data.errCode === 0) {
              // navigation.navigate('Home')
              Alert.alert(
                'Thông báo',
                `Thêm thành công! Bạn có muốn xem giỏ hàng của mình không?`,
                [{ text: 'Cancel' },
                { text: 'OK', onPress: () => {navigation.navigate('Home')} }
                
            ],
                
                { cancelable: false }
            );
            } else {
              Alert.alert('Thông báo', res.data.errMessage, [
                {
                  text: 'OK', onPress: () => {
    
                  }
                },
              ]);
            }
          })
    
    
        } else {
          return Alert.alert(
            'Thông báo',
            'Bạn chưa đăng nhập',
            [
              {
                text: 'OK',
              },
            ],
            { cancelable: false }
          );
        }
      }

      const price = (price) => {
        let x = price;
        x = x.toLocaleString('it-IT', { style: 'currency', currency: 'VND' });
        return x;
      }
      useEffect(() => {
        props.lodaData1()
    
      }, [])

    return (
        <View style={{
            width: 350,
            height: "auto",
            borderRadius: 10,
            elevation: 5,
            backgroundColor: '#fff',
            marginLeft: 20,
            marginVertical: 10,
          }}
          >
            <TouchableOpacity
              onPress={() => { xoaLike_product() }}
              style={{
                alignSelf: "flex-end",
                marginHorizontal: 10,
                width: 40,
                height: 40,
                backgroundColor: '#fff',
                borderRadius: 20,
                elevation: 5,
                top: 10,
                alignItems: 'center',
              }}>
              <Icon name="heart" size={30} color="red" style={{ top: 6 }} />
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => { handleDetailProduct(item.id) }}
              style={{
                justifyContent: "center",
                alignItems: "center",
                marginTop: 10
              }} >
              <Image
                // source={require('../images/pants1.jpg')}
                source={{ uri: showImage(item.image) }}
                style={{
                  width: 200,
                  height: 200,
                  borderTopLeftRadius: 10,
                  borderTopRightRadius: 10,
                  justifyContent: "center",
                  alignItems: "center"
                }} />
              <Text style={{
                marginLeft: 10,
                marginTop: 8,
                fontSize: 16,
                fontWeight: '600',
              }}>
                {item.tenSp} </Text>
              <View style={{
                paddingLeft: 10,
                paddingRight: 10,
                marginTop: 5,
                marginBottom: 10,
      
              }}>
                {item.sale <= 0 ?
                  <Text style={{
                    fontSize: 18,
                    fontWeight: '600',
                    color: 'red'
                  }}>
      
                    {price(item.giaSanPham)}
                  </Text>
                  : <View style={{
                    flexDirection: 'row',
      
                    alignItems: "center"
                  }}>
                    <Text style={{
                      fontSize: 17,
                      fontWeight: '600',
                      color: 'red',
                      textAlign: 'left'
      
                    }}>
      
                      {price(item.giaSanPham - (item.giaSanPham * (item.sale / 100)))}
                    </Text>
                    <Text style={{
                      fontSize: 25,
                      marginLeft: 10,
                      marginRight: 10
                    }}>-</Text>
                    <Text style={{
                      fontSize: 15,
                      fontWeight: '600',
                      color: '#696969',
                      textDecorationLine: 'line-through'
                    }}>
      
                      {price(item.giaSanPham)}
                    </Text>
                  </View>
      
                }
                <View>
                  <Text style={{ fontSize: 14, fontWeight: "700" }}>
                    Đã bán: {item.luotMua}
                  </Text>
                </View>
                <TouchableOpacity
                  style={{
                    borderWidth: 1,
                    borderRadius: 10,
                    paddingLeft: 10,
                    paddingRight: 10,
                    marginTop: 10,
                    paddingBottom: 10,
                    paddingTop: 7,
                  }} onPress={() => {
                    onAddToCart(item);
                  }}>
                  <Text style={{ textAlign: "center" }}>Add to Cart</Text>
                </TouchableOpacity>
              </View>
      
              {item.sale > 0 &&
                <View
                  style={{
                    borderRadius: 20,
                    position: 'absolute',
                    top: -5,
                    right: 25,
                    flex: 1,
                    flexDirection: 'row',
                    alignItems: 'center',
                    justifyContent: 'flex-start'
                  }}>
                  <View style={{
                    position: 'relative',
                    flexDirection: 'row',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}>
      
                    <Icon name="burst" title="sadd" size={55} color={"#DD0000"} />
                    <Text style={{
                      color: "#fff",
                      position: 'absolute',
                      top: '50%',
                      transform: [{ translateY: -11 }],
                      marginLeft: 5,
                      fontSize: 14,
                      fontWeight: "700"
                    }}>-{item.sale}%
                    </Text>
                  </View>
      
                </View>
              }
            </TouchableOpacity>
          </View>
    )
}

export default ItemLike