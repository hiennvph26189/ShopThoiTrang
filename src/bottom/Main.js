import { Text, View, Image, FlatList, RefreshControl, TouchableOpacity, ScrollView } from "react-native";
import React, { useEffect, useState } from "react";
import Header from "../common/Header";

import MyProductItem from "../common/MyProductItem";
import ItemLuotMua from "../common/ItemLuotMua";
import { useDispatch, useSelector } from "react-redux";

import { useNavigation, useIsFocused } from "@react-navigation/native";
import axios from "axios";
import { GET_CATEGORIES, GETALLPRODUCTS, LIST_HOST_SALES_PRODUCTS, LIST_HOST_ODERS_PRODUCTS, LIST_PRODUCTS_IN_CATEGORIES } from "../../api"
const Main = (props) => {
    const navigation = useNavigation();
    const isFocused = useIsFocused();
    const [refreshing, setRefreshing] = useState(false);
    const dispatch = useDispatch();
    const [categoryList, setCategoryList] = useState([]);
    const [arrProducts, setArrProducts] = useState([]);
    const [luotMuaNhieu, setArrLuotMuaNhieu] = useState([]);
    const [productsInCategory, setProductsInCategory] = useState([]);
    const [hotSale, setHotSale] = useState([]);
    //const arrCategories = useSelector(state => state.Reducers.categoties);
    const listHotSaleProducts = async () => {
        await axios.get(LIST_HOST_SALES_PRODUCTS).then((res) => {

            if (res && res.data.errCode === 0) {

                setHotSale(res.data.saleProduct)
                setRefreshing(false)

            }
        }).catch((error) => { console.log(error) });
    }
    const listProductsInCategory = async () => {
        
        await axios.get(LIST_PRODUCTS_IN_CATEGORIES).then((res) => {
      
            if (res && res.data.errCode === 0) {

                setProductsInCategory(res.data.dataProducts)
                setRefreshing(false)

            }
        }).catch((error) => { console.log(error) });
    }
    const listHotOrdersProducts = async () => {
        await axios.get(LIST_HOST_ODERS_PRODUCTS).then((res) => {
            
            if (res && res.data.errCode === 0) {

                setArrLuotMuaNhieu(res.data.hotOrdersProducts)
                setRefreshing(false)

            }
        }).catch((error) => { console.log(error) });
    }
    const loadAllProducts = async () => {
        await axios.get(GETALLPRODUCTS).then((res) => {
            if (res && res.data.errCode === 0) {
                setArrProducts(res.data.totalProducts)
                

                setRefreshing(false)

            }
        }).catch((error) => { console.log(error) });
    }

    const loadCategories = async () => {
        await axios.get(GET_CATEGORIES).then((res) => {

            if (res && res.data.errCode === 0) {
                setCategoryList(res.data.data);

                setRefreshing(false)
            }
        }).catch((error) => { console.log(error) });
    }

    useEffect(() => {
        listHotSaleProducts()
        listProductsInCategory()
        listHotOrdersProducts()
        loadAllProducts()
        loadCategories()

    }, [isFocused]);

    onRefresh = () => {
        setRefreshing(true)
        listProductsInCategory()
        loadCategories()
        loadAllProducts()
        listHotSaleProducts()
        listHotOrdersProducts()
    }

    const addCart = () => {

        props.addCart()
    }

    listDanhSach = (id) => {
        return (
            <>
                <FlatList
                    data={arrProducts.filter((p) => p.idDanhSach === id)}
                    horizontal
                    showsHorizontalScrollIndicator={false}
                    keyExtractor={(item, index) => index.toString()}
                    extraData={id}

                    renderItem={({ item }) => {
                        return (
                            <MyProductItem
                                item={item}

                                addCart={addCart}
                            />
                        );
                    }
                    }

                />

            </>
        )
    }
    danhSachSabPham = (id, name) => {

        navigation.navigate('Danh Sách sản phẩm', { id: id, name: name });
    }
    const litProducts = () => {
        return (
            categoryList.map((item, i) => {
                return (
                    <TouchableOpacity onPress={() => { danhSachSabPham(item.id, item.name) }} key={item.id} style={{
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
        <>
            <Header
                title={'Home'} />

            <ScrollView
                refreshControl={
                    <RefreshControl
                        refreshing={refreshing}
                        onRefresh={() => { onRefresh() }}
                    />
                }
                nestedScrollEnabled={true}
                style={{ flex: 1, marginBottom: 10 }}>
                <View style={{ flex: 1, marginBottom: 40 }}>

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
                    {hotSale &&

                        <View style={{ marginTop: 20 }}>
                            <View style={{
                                flexDirection: "row", justifyContent: "space-between", alignItems: "center", borderBottomColor: "#ccc", borderBottomWidth: 1, marginRight: 15, paddingBottom: 5,
                                marginLeft: 20,
                            }}>
                                <Text style={{
                                    color: '#000',
                                    fontSize: 16,
                                    fontWeight: '600',

                                }}>
                                    Hot Sale
                                </Text>


                                <TouchableOpacity onPress={() => { danhSachSabPham("hotSale", "Hot Sale") }} >
                                    <Text style={{ fontSize: 16, fontWeight: "600", textDecorationLine: "underline", fontStyle: "italic", color: "#3399FF" }}>Xem tất cả</Text>
                                </TouchableOpacity>
                            </View>

                            <ScrollView ScrollView horizontal={true} showsHorizontalScrollIndicator={false} style={{ marginTop: 20 }}>
                                {hotSale && hotSale.map((item) => {
                                    return (
                                        <ItemLuotMua key={item.id}
                                            item={item}
                                            addCart={addCart}
                                        />
                                    )
                                })}
                            </ScrollView>
                        </View>
                    }

                    {luotMuaNhieu &&


                        <View style={{ marginTop: 20 }}>
                            <View style={{
                                flexDirection: "row", justifyContent: "space-between", alignItems: "center", borderBottomColor: "#ccc", borderBottomWidth: 1, marginRight: 15, paddingBottom: 5,
                                marginLeft: 20,
                            }}>
                                <Text style={{
                                    color: '#000',
                                    fontSize: 16,
                                    fontWeight: '600',

                                }}>
                                    Lượt mua nhiều nhất
                                </Text>


                                <TouchableOpacity onPress={() => { danhSachSabPham("luotMuaNhieu", "Lượt mua nhiều nhất") }} >
                                    <Text style={{ fontSize: 16, fontWeight: "600", textDecorationLine: "underline", fontStyle: "italic", color: "#3399FF" }}>Xem tất cả</Text>
                                </TouchableOpacity>
                            </View>

                            <ScrollView ScrollView horizontal={true} showsHorizontalScrollIndicator={false} style={{ marginTop: 20 }}>
                                {luotMuaNhieu && luotMuaNhieu.map((item) => {
                                    return (
                                        <ItemLuotMua key={item.id}
                                            item={item}
                                            addCart={addCart}
                                        />
                                    )
                                })}
                            </ScrollView>
                        </View>
                    }

                    <ScrollView style={{ marginTop: 20 }}>
                        {productsInCategory&&productsInCategory.map((item, index) => {
                            return (
                                <View key={index}>
                                    <View style={{
                                        flexDirection: "row", justifyContent: "space-between", alignItems: "center", borderBottomColor: "#ccc", borderBottomWidth: 1, marginRight: 15, paddingBottom: 5,
                                        marginLeft: 20,
                                    }}>
                                        <Text style={{
                                            color: '#000',
                                            fontSize: 16,
                                            fontWeight: '600',

                                        }}>
                                            {item.name}
                                        </Text>


                                        <TouchableOpacity onPress={() => { danhSachSabPham(item.id, item.name) }} >
                                            <Text style={{ fontSize: 16, fontWeight: "600", textDecorationLine: "underline", fontStyle: "italic", color: "#3399FF" }}>Xem tất cả</Text>
                                        </TouchableOpacity>
                                    </View>

                                    <ScrollView ScrollView horizontal={true} showsHorizontalScrollIndicator={false} style={{ marginTop: 20 }}>
                                        {item.products && item.products.map((item2) => {
                                           
                                            return (
                                                <ItemLuotMua key={item2.id}
                                                    item={item2}
                                                    addCart={addCart}
                                                />
                                            )
                                        })}
                                    </ScrollView>
                                </View>
                            )

                        })}


                    </ScrollView>

                </View>
            </ScrollView>
        </>

    )
}
export default Main;