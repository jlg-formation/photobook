import React, {useEffect} from 'react';
import {ActivityIndicator, Image, StyleSheet, Text, View} from 'react-native';
import {useAppDispatch, useAppSelector} from '../redux/hooks';
import {
  fetchAllArticles,
  selectAllArticles,
  selectArticleStatus,
} from '../redux/slices/articles.slice';

const ArticleList = () => {
  const dispatch = useAppDispatch();
  const articles = useAppSelector(selectAllArticles);

  const articleStatus = useAppSelector(selectArticleStatus);

  useEffect(() => {
    if (articleStatus === 'idle') {
      dispatch(fetchAllArticles());
    }
  }, [articleStatus, dispatch]);

  return (
    <View style={styles.view}>
      {articleStatus === 'loading' && <ActivityIndicator size="large" />}
      {articles.length === 0 ? (
        <Text style={styles.text}>No article found...</Text>
      ) : (
        articles.map(article => (
          <View style={styles.article} key={article.id}>
            <Text style={styles.text}>{article.content}</Text>
            <View style={styles.imageView}>
              {article.images.map(imageUri => (
                <Image
                  key={imageUri}
                  style={styles.image}
                  source={{
                    uri: imageUri,
                  }}
                />
              ))}
            </View>
          </View>
        ))
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  view: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'transparent',
    width: '95%',
    margin: 10,
  },
  article: {
    width: '100%',
    backgroundColor: 'white',
    padding: 10,
    marginBottom: 10,
  },
  text: {
    fontFamily: 'sans-serif',
    color: 'black',
  },
  item: {},
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

export default ArticleList;
