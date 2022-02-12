import React, {useState} from 'react';
import {StyleSheet, TextInput, View} from 'react-native';
import {Button} from 'react-native-elements';
import {useAppDispatch, useAppSelector} from '../redux/hooks';
import {addNewArticle} from '../redux/slices/articles.slice';
import {selectAuthentication} from '../redux/slices/authentication.slice';

const NewArticle = () => {
  const authentication = useAppSelector(selectAuthentication);
  const [isLoading, setIsLoading] = useState(false);
  const [text, setText] = useState('');
  const dispatch = useAppDispatch();

  const onSubmit = async () => {
    try {
      setIsLoading(true);
      await dispatch(addNewArticle({content: text, images: []})).unwrap();
      setText('');
    } catch (err) {
      console.log('err: ', err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <View style={styles.view}>
      <TextInput
        multiline
        numberOfLines={5}
        style={styles.input}
        onChangeText={setText}
        value={text}
        placeholder={`Hello ${authentication.user?.displayName}, what's on your mind?`}
      />
      <Button title="Post" loading={isLoading} onPress={onSubmit} />
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

export default NewArticle;
