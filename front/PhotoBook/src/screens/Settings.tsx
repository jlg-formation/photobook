import React from 'react';
import {Button, StyleSheet, Text, View} from 'react-native';
import {api} from '../api';
import {ScreenProps} from '../navigation';
import {useAppDispatch} from '../redux/hooks';
import {disconnect} from '../redux/slices/authentication.slice';

const Settings = ({navigation}: ScreenProps<'Settings'>) => {
  const dispatch = useAppDispatch();

  const name = 'Settings';
  return (
    <View style={styles.view}>
      <Text style={styles.text}>{name} works !</Text>
      <Button
        title="Disconnect"
        onPress={() => {
          (async () => {
            try {
              await api.disconnect();
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
