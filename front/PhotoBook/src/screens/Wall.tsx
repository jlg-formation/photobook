import React from 'react';
import {Image, RefreshControl, ScrollView, StyleSheet} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {domain} from '../api';
import NewPost from '../posts/NewPost';
import PostList from '../posts/PostList';
import {
  fetchAllArticles,
  selectArticleStatus,
} from '../redux/slices/articles.slice';

const Wall = () => {
  const dispatch = useDispatch();
  const articleStatus = useSelector(selectArticleStatus);
  const onRefresh = () => {
    dispatch(fetchAllArticles());
  };
  return (
    <ScrollView
      refreshControl={
        <RefreshControl
          refreshing={articleStatus === 'loading'}
          onRefresh={onRefresh}
        />
      }>
      <Image
        source={{uri: `${domain}/images/user-background.jpg`}}
        style={styles.userBackground}
      />
      <NewPost />
      <PostList />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  text: {
    fontFamily: 'sans-serif',
    fontStyle: 'italic',
    width: '100%',
    padding: 10,
  },
  userBackground: {
    width: '100%',
    height: 200,
    resizeMode: 'cover',
  },
});

export default Wall;
