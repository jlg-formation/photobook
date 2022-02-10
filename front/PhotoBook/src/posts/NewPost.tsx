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
        multiline
        numberOfLines={5}
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
    backgroundColor: 'gray',
    width: '95%',

    margin: 10,
  },
  input: {
    paddingTop: 0,
    paddingBottom: 0,
    textAlignVertical: 'top',
    backgroundColor: 'white',
    padding: 10,
    fontFamily: 'sans-serif',
    fontStyle: 'italic',
    borderBottomColor: '#000000',
    borderWidth: 1,
  },
});

export default NewPost;
