import React from 'react';
import { TouchableOpacity, View, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

const Star = ({ selected, onPress ,sizeStar, checkView}) => {
  return (
    <>
      {
        checkView == "View"?
      
          <View >
            <Icon name={selected ? 'star' : 'star'} size={sizeStar} style={{margin:2}} color={selected ? '#FFA500' : 'black'} />
          </View>
      
        : 
        <TouchableOpacity onPress={onPress}>
          <View style={styles.starContainer}>
            <Icon name={selected ? 'star' : 'star'} size={sizeStar} color={selected ? '#FFA500' : 'black'} />
          </View>
        </TouchableOpacity>
      }
    </>
   
  );
};

const styles = StyleSheet.create({
  starContainer: {
    margin: 5,
  },
});

export default Star;