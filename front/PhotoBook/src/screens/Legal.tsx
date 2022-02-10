import React from 'react';
import {Button, StyleSheet, Text, View} from 'react-native';
import {ScreenProps} from '../navigation';

const Legal = ({navigation}: ScreenProps<'Legal'>) => {
  const name = 'Legal';
  return (
    <View style={styles.view}>
      <Text style={styles.text}>{name} works !</Text>
      <Button title="Go back" onPress={() => navigation.goBack()} />
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

export default Legal;
