import React from 'react';
import {Image, StyleSheet, ScrollView} from 'react-native';
import {domain} from '../api';
import NewPost from '../posts/NewPost';
import PostList from '../posts/PostList';

const Wall = () => {
  return (
    <ScrollView>
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
