import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {useAppSelector} from '../redux/hooks';
import {selectAuthentication} from '../redux/slices/authentication.slice';

const NewPost = () => {
  const authentication = useAppSelector(selectAuthentication);
  return (
    <View style={styles.view}>
      <Text style={styles.text}>
        Hello {authentication.user?.displayName}, what's on your mind?
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  view: {
    backgroundColor: 'white',
    width: '95%',
    height: 200,
    margin: 10,
  },
  text: {
    fontFamily: 'sans-serif',
    fontStyle: 'italic',
  },
});

export default NewPost;
