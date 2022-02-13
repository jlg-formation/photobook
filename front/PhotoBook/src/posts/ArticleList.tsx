import React, {useEffect} from 'react';
import {ActivityIndicator, StyleSheet, Text, View} from 'react-native';
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
});

export default ArticleList;
