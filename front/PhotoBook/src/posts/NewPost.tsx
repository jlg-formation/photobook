import React, {useState} from 'react';
import {Button, StyleSheet, TextInput, View} from 'react-native';
import {useAppSelector} from '../redux/hooks';
import {selectAuthentication} from '../redux/slices/authentication.slice';

const NewPost = () => {
  const authentication = useAppSelector(selectAuthentication);
  const [text, onChangeText] = useState('');

  return (
    <View style={styles.view}>
      <TextInput
        style={styles.input}
        onChangeText={onChangeText}
        value={text}
        placeholder={`Hello ${authentication.user?.displayName}, what's on your mind?`}
      />
      <Button title="Post" />
    </View>
  );
};

const styles = StyleSheet.create({
  view: {
    backgroundColor: 'white',
    width: '95%',

    margin: 10,
  },
  input: {
    height: 200,
    fontFamily: 'sans-serif',
    fontStyle: 'italic',
  },
});

export default NewPost;
