import React, {useEffect} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {Button, Input} from 'react-native-elements';
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

  return (
    <View style={styles.view}>
      <View style={styles.viewLogo}>
        <Text style={styles.logo}>PhotoBook</Text>
      </View>
      <View style={styles.form}>
        <Text style={styles.title}>Sign in</Text>
        <Input
          placeholder="Email"
          autoCompleteType={undefined}
          keyboardType="email-address"
        />
        <Input
          placeholder="Password"
          autoCompleteType={undefined}
          secureTextEntry={true}
        />
        <Button
          containerStyle={styles.button}
          title="Connexion"
          onPress={() => {
            console.log('about to connect');
            dispatch(connect());
          }}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  view: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: 'white',
  },
  viewLogo: {
    height: 100,
    flex: 1,
    justifyContent: 'center',
  },
  form: {
    flex: 1,
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  logo: {
    height: 100,
    textAlign: 'center',
    fontSize: 50,
    fontWeight: 'bold',
  },
  title: {
    fontSize: 30,
  },
  button: {
    margin: 20,
    alignSelf: 'stretch',
  },
});

export default Login;
