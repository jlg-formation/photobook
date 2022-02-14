import React, {useState} from 'react';
import {StyleSheet, TextInput, View} from 'react-native';
import {Button} from 'react-native-elements';
import {Image} from 'react-native-elements/dist/image/Image';
import {launchImageLibrary} from 'react-native-image-picker';
import {api, apiUrl} from '../api';
import {useAppDispatch, useAppSelector} from '../redux/hooks';
import {addNewArticle, fetchAllArticles} from '../redux/slices/articles.slice';
import {selectAuthentication} from '../redux/slices/authentication.slice';

const NewArticle = () => {
  const authentication = useAppSelector(selectAuthentication);
  const [isLoading, setIsLoading] = useState(false);
  const [text, setText] = useState('');
  const [images, setImages] = useState([] as string[]);
  const dispatch = useAppDispatch();

  const onSubmit = async () => {
    try {
      setIsLoading(true);
      await dispatch(addNewArticle({content: text, images: images})).unwrap();
      setIsLoading(false);
      setText('');
      setImages([]);
      dispatch(fetchAllArticles());
    } catch (err) {
      setIsLoading(false);
      console.log('err: ', err);
    }
  };

  const addPhotos = async () => {
    console.log('adding photos');
    const result = await launchImageLibrary({
      mediaType: 'photo',
    });
    console.log('result: ', result);
    if (result.assets === undefined) {
      return;
    }

    for (const asset of result.assets) {
      try {
        // for the time being support only jpg
        const imageName =
          Date.now() + '_' + Math.floor(1e6 * Math.random()) + '.jpg';
        console.log('imageName: ', imageName);
        const formData = new FormData();
        formData.append('file', {
          uri: asset.uri,
          name: imageName,
          type: asset.type,
        });
        const response = await api.upload(formData);
        console.log('response: ', response);
        const imageUri = apiUrl + '/upload/' + imageName;
        console.log('imageUri: ', imageUri);
        setImages([...images, imageUri]);
      } catch (err) {
        console.log('err: ', err);
      }
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
        placeholderTextColor="#000"
      />
      <View style={styles.imageView}>
        {images.map(imageUri => (
          <Image
            key={imageUri}
            style={styles.image}
            source={{
              uri: imageUri,
            }}
          />
        ))}
      </View>

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
  imageView: {
    flex: 1,
    alignItems: 'stretch',
    justifyContent: 'center',
    backgroundColor: 'transparent',
    width: '100%',
  },
  image: {
    height: 200,
    resizeMode: 'cover',
  },
});

export default NewArticle;
