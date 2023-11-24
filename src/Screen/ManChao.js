import { useEffect } from "react";
import { Image, View, Text } from "react-native";

const ManChao = (props) => {
    const navigation = props.navigation;
    useEffect(() => {
        setTimeout(() => {
            navigation.navigate('Login');
        },3000)
    },[]);
    return(
        <View style={{flex:1,justifyContent:"center",alignItems:"center"}}>
            {/* <Image
            source={require('../Screen/image/LogoChao.png')}
            style={{width:100, height:100, borderRadius:70}}>
            </Image> */}
            
        </View>
    );
};
export default ManChao;