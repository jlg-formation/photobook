import React, {useEffect} from 'react';
import {Button, StyleSheet, Text, View} from 'react-native';
import {useAppDispatch, useAppSelector} from '../redux/hooks';
import {
  connect,
  selectAuthentication,
} from '../redux/slices/authentication.slice';

const Login = ({navigation}: any) => {
  const authentication = useAppSelector(selectAuthentication);
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (authentication.isConnected) {
      navigation.navigate('Home');
    }
  });

  const name = 'Login';
  return (
    <View style={styles.view}>
      <Text style={styles.text}>{name} works !</Text>
      <Button
        title="Connexion"
        onPress={() => {
          console.log('about to connect');
          dispatch(connect());
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

export default Login;
