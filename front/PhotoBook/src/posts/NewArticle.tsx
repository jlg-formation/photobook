import React, {useState} from 'react';
import {StyleSheet, TextInput, View} from 'react-native';
import {Button} from 'react-native-elements';
import {useAppDispatch, useAppSelector} from '../redux/hooks';
import {addNewArticle, fetchAllArticles} from '../redux/slices/articles.slice';
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
      setIsLoading(false);
      setText('');
      dispatch(fetchAllArticles());
    } catch (err) {
      setIsLoading(false);
      console.log('err: ', err);
    }
  };

  const addPhotos = () => {
    console.log('adding photos');
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
        placeholderTextColor="#000"
      />
      <View style={styles.command}>
        <Button
          buttonStyle={[styles.commandButtons, styles.photoButton]}
          icon={{
            name: 'camera',
            type: 'font-awesome-5',
            size: 20,
            color: 'white',
          }}
          onPress={addPhotos}
        />
        <Button
          buttonStyle={styles.commandButtons}
          title="Post"
          loading={isLoading}
          onPress={onSubmit}
        />
      </View>
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
    paddingTop: 0,
    paddingBottom: 0,
    textAlignVertical: 'top',
    backgroundColor: 'white',
    padding: 10,
    fontFamily: 'sans-serif',
    fontStyle: 'italic',
  },
  command: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'stretch',
  },
  commandButtons: {
    height: 40,
    paddingLeft: 20,
    paddingRight: 20,
  },
  photoButton: {
    backgroundColor: 'hsl(0, 0%, 80%)',
  },
});

export default NewArticle;
