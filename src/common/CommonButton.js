import { View, Text, TouchableOpacity } from 'react-native'
import React from 'react'

const CommonButton = ({ onPress, title, bgColor, textColor }) => {
    return (
        <View>
            <TouchableOpacity
                style={{
                    backgroundColor: bgColor,
                    justifyContent: 'center',
                    alignItems: 'center',
                    width: '85%',
                    height: 50,
                    borderRadius: 20,
                    alignSelf: 'center',
                    marginTop: 50,

                }} onPress={() => {
                    onPress();
                }} >
                    <Text style={{ color: textColor, fontSize:16 }}>{title}</Text>
            </TouchableOpacity>
        </View>
    );
};

export default CommonButton