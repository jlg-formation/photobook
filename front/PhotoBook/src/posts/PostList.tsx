import React, {useEffect} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {
  fetchAllArticles,
  selectAllArticles,
  selectArticleStatus,
} from '../redux/slices/articles.slice';

const PostList = () => {
  const dispatch = useDispatch();
  const articles = useSelector(selectAllArticles);

  const articleStatus = useSelector(selectArticleStatus);

  useEffect(() => {
    if (articleStatus === 'idle') {
      dispatch(fetchAllArticles());
    }
  }, [articleStatus, dispatch]);

  return (
    <View style={styles.view}>
      <Text style={styles.text}>{articleStatus}</Text>

      <Text style={styles.text}>{articles.length} articles found!</Text>
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
});

export default PostList;
