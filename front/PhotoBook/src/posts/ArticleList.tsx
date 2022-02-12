import React, {useEffect} from 'react';
import {
  ActivityIndicator,
  FlatList,
  StyleSheet,
  Text,
  View,
} from 'react-native';
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
      {articleStatus === 'loading' ? (
        <ActivityIndicator size="large" />
      ) : articles.length === 0 ? (
        <Text style={styles.text}>No article found...</Text>
      ) : (
        articles.map(article => (
          <Text style={styles.item} key={article.id}>
            {article.content}
          </Text>
        ))
      )}
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
    // height: 2000,
  },
  text: {
    fontFamily: 'sans-serif',
    fontStyle: 'italic',
  },
  item: {},
});

export default ArticleList;
