import React from 'react';
import {Button, StyleSheet, Text, View} from 'react-native';
import {useAppDispatch} from '../redux/hooks';
import {disconnect} from '../redux/slices/authentication.slice';

const Settings = ({navigation}: any) => {
  const dispatch = useAppDispatch();

  const name = 'Settings';
  return (
    <View style={styles.view}>
      <Text style={styles.text}>{name} works !</Text>
      <Button
        title="Disconnect"
        onPress={() => {
          console.log('disconnect');
          (async () => {
            try {
              const response = await fetch(
                'http://10.0.2.2:3000/api/disconnect',
                {
                  method: 'POST',
                },
              );
              console.log('response: ', response);
            } catch (err) {}
          })();
          dispatch(disconnect(undefined));
          navigation.navigate('Login');
        }}
      />
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

export default Settings;
