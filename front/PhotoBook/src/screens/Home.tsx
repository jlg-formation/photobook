import React from 'react';
import {Button, StyleSheet, Text, View} from 'react-native';

const Home = ({navigation}: any) => {
  const name = 'Home';
  return (
    <View style={styles.view}>
      <Text style={styles.text}>{name} works !</Text>
      <Button
        title="Go to Details"
        onPress={() => navigation.navigate('Legal')}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  view: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'space-around',
  },
  text: {
    fontFamily: 'sans-serif',
    fontStyle: 'italic',
  },
});

export default Home;
