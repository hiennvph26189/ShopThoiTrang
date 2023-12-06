import React, { useState,useEffect } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Star from './Star';

const VoteStar = (props) => {
  const [rating, setRating] = useState(5);

  const handleStarPress = (index) => {
    setRating(index + 1);
    props.getVoteStar(index + 1)
  };
useEffect(()=>{
    props.getVoteStar(rating)
   
    },[rating])
  return (
    <View style={styles.container}>
      
      <View style={styles.starContainer}>
        {[...Array(5).keys()].map((index) => (
          <Star key={index} selected={index < rating} sizeStar={30} checkView={"Button"} onPress={() => handleStarPress(index)} />
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    marginTop: 20,
  },
  ratingText: {
    fontSize: 18,
    marginBottom: 10,
  },
  starContainer: {
    flexDirection: 'row',
  },
});

export default VoteStar;