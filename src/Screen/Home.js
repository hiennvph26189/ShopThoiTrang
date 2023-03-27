import React, { useState,useEffect } from "react";
import { Image, Text, TouchableOpacity, View } from "react-native";
import Cart from "../bottom/Cart";
import Contact from "../bottom/Contact";
import Main from "../bottom/Main";
import NewPaper from "../bottom/NewPaper";
import Profile from "../bottom/Profile";
import {useDispatch, useSelector} from 'react-redux'
const Home = (props) => {
    const navigation = props.navigation;
    const [selectTab, setSelectetab] = useState(0);
    const info = useSelector((state)=> state.personalInfo

    )
    useEffect(()=>{
        console.log(info.email,"ìno")
    },[])
    return(
        <View style={{flex:1}}>
            {selectTab==0?(<Main/>):selectTab==1?(<NewPaper/>):selectTab==2?(<Cart/>):selectTab==3?(<Contact/>):(<Profile/>)}  
            <View
            style={{
                width:'100%',
                height:70,
                backgroundColor: '#fff',
                position: "absolute",
                bottom: 0,
                flexDirection: "row",
                alignItems:"center",
            }}
            >
                <TouchableOpacity style={{width:'20%',height:'100%',justifyContent:"center",alignItems:"center",}}
                onPress={() => {setSelectetab(0);}}
                >
                <Image source={require('../Screen/image/home.png')} style={{width:24,height:24,tintColor: selectTab == 0 ? '#000' : '#8e8e8e'}}/>
                </TouchableOpacity>
                <TouchableOpacity style={{width:'20%',height:'100%',justifyContent:"center",alignItems:"center",}}
                onPress={() => {setSelectetab(1);}}>
                <Image source={require('../Screen/image/newspaper.png')} style={{width:24,height:24,tintColor: selectTab == 1 ? '#000' : '#8e8e8e'}}/>
                </TouchableOpacity>
                <View style={{width:'20%',height:'100%',justifyContent:"center",alignItems:"center"}}>
                    <TouchableOpacity style={{width:44,height:44,backgroundColor: selectTab == 2 ? '#7CFC00' : '#000',borderRadius:22}}
                    onPress={() => {setSelectetab(2);}}>
                        <Image source={require('../Screen/image/bag.png')} style={{width:24,height:24,tintColor:'#fff',justifyContent:"center",alignSelf:"center",marginTop:10}}></Image>
                    </TouchableOpacity>
                </View>
                <TouchableOpacity style={{width:'20%',height:'100%',justifyContent:"center",alignItems:"center",}}
                onPress={() => {setSelectetab(3);}}>
                <Image source={require('../Screen/image/contact.png')} style={{width:24,height:24,tintColor: selectTab == 3 ? '#000' : '#8e8e8e'}}/>
                </TouchableOpacity>
                <TouchableOpacity style={{width:'20%',height:'100%',justifyContent:"center",alignItems:"center",}}
                onPress={() => {setSelectetab(4);}}>
                <Image source={require('../Screen/image/user-menu.png')} style={{width:24,height:24,tintColor: selectTab == 4 ? '#000' : '#8e8e8e'}}/>
                </TouchableOpacity>
            </View>
        </View>

    )
}
export default Home;