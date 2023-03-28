import { Text, View, Image, FlatList, RefreshControl, TouchableOpacity, ScrollView } from "react-native";
import React, { useEffect, useState } from "react";
import Header from "../common/Header";
import { products } from "../Screen/Product";
import MyProductItem from "../common/MyProductItem";
import { useDispatch, useSelector } from "react-redux";
import { addItemToCart, addToWishlist, fetchCategoriesStart } from "../redux/action/Actions";
import { useNavigation, useIsFocused } from "@react-navigation/native";
import axios from "axios";
import { GETCATEGORIES, GETALLPRODUCTS } from "../../api"
const Main = () => {
    const isFocused = useIsFocused();
    const [refreshing, setRefreshing] = useState(false);
    const dispatch = useDispatch();
    const [categoryList, setCategoryList] = useState([]);
    const [tshirtList, setTshirtList] = useState([]);
    //const arrCategories = useSelector(state => state.Reducers.categoties);

    const loadAllProducts = async () => {
        await axios.get(GETALLPRODUCTS).then((res) => {

            if (res && res.data.errCode === 0) {
                //console.log(res.data.products,"OK")
                setTshirtList(res.data.products)

                setRefreshing(false)

            }
        }).catch((error) => { console.log(error) });
    }
    const [selectedCategory, setSelectedCategory] = useState(0);
    const loadCategories = async () => {
        await axios.get(GETCATEGORIES).then((res) => {

            if (res && res.data.errCode === 0) {
                setCategoryList(res.data.data);

                setRefreshing(false)
            }
        }).catch((error) => { console.log(error) });
    }

    useEffect(() => {
        loadCategories()
        loadAllProducts()
    }, [isFocused]);

    onRefresh = () => {
        setRefreshing(true)
        loadCategories()
        loadAllProducts()
    }


    listDanhSach = (id) => {
        return (
            <>
                <FlatList
                    data={tshirtList.filter((p) => p.idDanhSach === id)}
                    horizontal
                    showsHorizontalScrollIndicator={false}
                    keyExtractor={(item, index) => index.toString()}
                    extraData={id}

                    renderItem={({ item }) => {
                        return (
                            <MyProductItem item={item}
                                onAddWishlist={x => {
                                    dispatch(addToWishlist(x));
                                }}
                                onAddToCart={x => {
                                    
                                    dispatch(addItemToCart(item));
                                }}
                            />
                        );
                    }
                    }

                />

            </>
        )
    }
    const litProducts = () => {
        return (
            categoryList.map((item, i) => {
                return (
                    <TouchableOpacity key={i} style={{
                        padding: 10,
                        borderWidth: 1,
                        marginLeft: 20,
                        borderRadius: 20,
                    }}>
                        <Text style={{ color: '#000' }}>{item.name}</Text>
                    </TouchableOpacity>
                )
            })
        )

    }
    return (
        <ScrollView
            refreshControl={
                <RefreshControl
                    refreshing={refreshing}
                    onRefresh={() => { onRefresh() }}
                />
            }
            nestedScrollEnabled={true}
            style={{ flex: 1 }}>
            <View style={{ flex: 1, marginBottom: 30 }}>
                <Header
                    title={'Home'} />
                <Image source={require('../imgs/banner.png')}
                    style={{
                        width: '94%',
                        height: 200,
                        borderRadius: 10,
                        alignSelf: 'center',
                        marginTop: 10,
                    }}
                />
                <ScrollView horizontal={true} showsHorizontalScrollIndicator={false} style={{ marginTop: 20 }}>
                    {litProducts()}
                </ScrollView>
                <>
                    <ScrollView  style={{ marginTop: 20 }}>
                        {categoryList.map((item, index) =>{
                            return(
                                <View key={index}>
                                <Text style={{
                                    marginTop: 20,
                                    marginLeft: 20,
                                    color: '#000',
                                    fontSize: 16,
                                    fontWeight: '600',
                                }}>
                                    {item.name}
                                </Text>
                                <View style={{ marginTop: 20 }}>
                                    {listDanhSach(item.id)}
                                </View>
                            </View>
                            )
                            
                        })}
                        

                    </ScrollView>
                </>
            </View>
        </ScrollView>
    )
}
export default Main;