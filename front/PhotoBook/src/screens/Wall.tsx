import React from 'react';
import {StyleSheet, Text, View} from 'react-native';

const Wall = () => {
  const name = 'Legal';
  return (
    <View style={styles.view}>
      <Text style={styles.text}>{name} works !</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  view: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    fontFamily: 'sans-serif',
    fontStyle: 'italic',
  },
});

export default Wall;
