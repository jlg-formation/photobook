import React from 'react';
import {StyleSheet, Text, View} from 'react-native';

const PostList = () => {
  const name = 'PostList';
  return (
    <View style={styles.view}>
      <Text style={styles.text}>{name} works !</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  view: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'white',
    width: '95%',
    margin: 10,
    height: 2000,
  },
  text: {
    fontFamily: 'sans-serif',
    fontStyle: 'italic',
  },
});

export default PostList;
