import { Text, View, Image, FlatList, RefreshControl, TouchableOpacity, ScrollView, StyleSheet, Animated,Dimensions } from "react-native";
import React, { useEffect, useState } from "react";
import Header from "../common/Header";

import MyProductItem from "../common/MyProductItem";
import ItemLuotMua from "../common/ItemLuotMua";
import { useDispatch, useSelector } from "react-redux";

import { useNavigation, useIsFocused } from "@react-navigation/native";
import axios from "axios";
import { GET_CATEGORIES, GETALLPRODUCTS, LIST_HOST_SALES_PRODUCTS, LIST_HOST_ODERS_PRODUCTS, LIST_PRODUCTS_IN_CATEGORIES, GET_NEW_PRODUCTS } from "../../api"
import { LinearGradient } from 'expo-linear-gradient';


const width = Dimensions.get("window").width;
const height = Dimensions.get("window").height;

const HeghtW = width * 0.6;
const WidthW = (width - HeghtW) / 2;
const ESPACIO = 7;
const ALTURA_BACKDROP = height * 0.4;
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
    const [listNewProduct, setNewProduct] = useState([]);
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
    const getNewProduct = async () => {
        await axios.get(GET_NEW_PRODUCTS).then((res) => {

            if (res.data.errCode === 0) {
                
                setNewProduct(res.data.newProduct)

            }
        }).catch((err) => { console.log(err) })
    }

    const loadCategories = async () => {
        await axios.get(`${GET_CATEGORIES}?page=1`).then((res) => {
       
            if (res && res.data.errCode === 0) {
                setCategoryList(res.data.categories);
                
                setRefreshing(false)
            }
        }).catch((error) => { console.log(error) });
    }

    const showImage = (image) => {
        return image
        
    }
    const price = (price) => {
        let x = price;
        x = x.toLocaleString('it-IT', { style: 'currency', currency: 'VND' });
        return x;
    }
    handleDetailProduct = (id) => {
        navigation.navigate('Chi tiết sản phẩm', { id: id }, { handleDetailProduct: { handleDetailProduct } });
    }

    function Backdrop({ scrollX }) {
        return (
            <View
                style={[
                    {
                        position: "absolute",
                        height: ALTURA_BACKDROP,
                        top: 0,
                        width: width,
                    },
                    StyleSheet.absoluteFillObject,
                ]}
            >
                {listNewProduct.map((imagen, index) => {
                    const inputRange = [
                        (index - 1) * HeghtW,
                        index * HeghtW,
                        (index + 1) * HeghtW,
                    ];

                    const opacity = scrollX.interpolate({
                        inputRange,
                        outputRange: [0, 1, 0],
                    });
                    return (
                        <View key={index}>
                        <Animated.Image
                            
                            source={{ uri: showImage(imagen.image) }}
                            style={[
                                { width: width, height: ALTURA_BACKDROP, opacity },
                                StyleSheet.absoluteFillObject,
                            ]}
                        />
                        </View>
                    );
                })}
                <LinearGradient
                    colors={["transparent", "white"]}
                    style={{
                        width,
                        height: ALTURA_BACKDROP,
                        position: "absolute",
                        bottom: 0,
                    }}
                />
            </View>
        );
    }

    useEffect(() => {
        getNewProduct()
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
    const scrollX = React.useRef(new Animated.Value(0)).current;
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
                    <Backdrop scrollX={scrollX} />
                    <Animated.FlatList
                        onScroll={Animated.event(
                            [{ nativeEvent: { contentOffset: { x: scrollX } } }],
                            { useNativeDriver: true }
                        )}
                        showsHorizontalScrollIndicator={false}
                        horizontal={true}
                        snapToAlignment="start"
                        contentContainerStyle={{
                            paddingTop: 200,
                            paddingHorizontal: WidthW,
                        }}
                        snapToInterval={HeghtW}
                        decelerationRate={0}
                        scrollEventThrottle={16}
                        data={listNewProduct}
                        keyExtractor={(item) => item.id}
                        renderItem={({ item, index }) => {
                            const inputRange = [
                                (index - 1) * HeghtW,
                                index * HeghtW,
                                (index + 1) * HeghtW,
                            ];

                            const scrollY = scrollX.interpolate({
                                inputRange,
                                outputRange: [0, -50, 0],
                            });
                            return (
                                <TouchableOpacity
                                    onPress={() => { handleDetailProduct(item.id) }}
                                >
                                    <View style={{ width: HeghtW }}>
                                        <Animated.View
                                            style={{
                                                marginHorizontal: ESPACIO,
                                                padding: ESPACIO,
                                                borderRadius: 34,
                                                backgroundColor: "#fff",
                                                alignItems: "center",
                                                transform: [{ translateY: scrollY }],
                                            }}
                                        >
                                            <Image source={{ uri: showImage(item.image) }} style={styles.posterImage} />
                                            <Text style={{ fontWeight: "bold", fontSize: 20, color: 'red' }}>

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

                                                            {item.giaBanSale}
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

                                            </Text>
                                        </Animated.View>
                                    </View>
                                </TouchableOpacity>
                            );
                        }}
                    />
                    {/* <Image source={require('../imgs/banner.png')}
                        style={{
                            width: '94%',
                            height: 200,
                            borderRadius: 10,
                            alignSelf: 'center',
                            marginTop: 10,
                        }}
                    /> */}
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
                                {hotSale && hotSale.map((item, index) => {
                                    return (
                                        <View key={index}>
                                            <ItemLuotMua

                                                item={item}
                                                addCart={addCart}
                                            />
                                        </View>

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
                                {luotMuaNhieu && luotMuaNhieu.map((item, index) => {
                                    return (
                                        <View key={index}>
                                            <ItemLuotMua

                                                item={item}
                                                addCart={addCart}
                                            />
                                        </View>

                                    )
                                })}
                            </ScrollView>
                        </View>
                    }

                    <View style={{ marginTop: 20 }}>
                        {productsInCategory && productsInCategory.map((item, index) => {
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
                                        {item.products && item.products.map((item2, index2) => {

                                            return (
                                                <View key={index2}>
                                                    <ItemLuotMua
                                                        item={item2}
                                                        addCart={addCart}
                                                    />
                                                </View>

                                            )
                                        })}
                                    </ScrollView>
                                </View>
                            )

                        })}


                    </View>

                </View>
            </ScrollView>
        </>

    )
}
export default Main;
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#fff",
        justifyContent: "center",
    },
    posterImage: {
        width: "100%",
        height: HeghtW * 1.2,
        resizeMode: "cover",
        borderRadius: 24,
        margin: 0,
        marginBottom: 10,
    },
});