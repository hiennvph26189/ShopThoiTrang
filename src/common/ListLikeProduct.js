import { View, Text, ScrollView } from 'react-native'
import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { GET_ALL_LIKE_PRODUCTS_MEMBER } from '../../api'
import { useIsFocused } from '@react-navigation/native'
import ItemLike from './ItemLike'
import { useSelector } from 'react-redux'

const ListLikeProduct = (props) => {
  const info = useSelector(state => state.Reducers.arrUser);
  const [listLike, setListLikeProduct] = useState([]);
  const isFocused = useIsFocused();

  const getAllLikeProduct = async () => {
    await axios.get(`${GET_ALL_LIKE_PRODUCTS_MEMBER}?id_members=${info.id}`).then((res) => {
      
      if (res && res.data.errCode === 0) {
        setListLikeProduct(res.data.listLikePrd);
      }
    }).catch((error) => { console.log(error) });
  }

  const addCart = () => {

    props.addCart()
}

  useEffect(() => {
    getAllLikeProduct()

  }, [isFocused])
  const lodaData1 = () => {
    
    getAllLikeProduct()
  }

  return (
    <>
    <ScrollView>
        {listLike && listLike.map((item) => {
          return (
            <ItemLike key={item.id}
              item={item}
              addCart={addCart}
              lodaData1={lodaData1}
            />
          )
        })}
      </ScrollView>
    </>
  )
}

export default ListLikeProduct;