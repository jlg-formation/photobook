import React, {useEffect, useState} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {Button, Input} from 'react-native-elements';
import {useAppDispatch, useAppSelector} from '../redux/hooks';
import {
  connect,
  selectAuthentication,
  User,
} from '../redux/slices/authentication.slice';

const Login = ({navigation}: any) => {
  const authentication = useAppSelector(selectAuthentication);
  const dispatch = useAppDispatch();

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    if (authentication.user) {
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

        <Text style={styles.error}>{error} </Text>

        <Button
          loading={isLoading}
          containerStyle={styles.button}
          title="Connexion"
          onPress={() => {
            console.log('about to connect');
            (async () => {
              try {
                setIsLoading(true);
                const response = await fetch(
                  'http://10.0.2.2:3000/api/connect',
                  {
                    method: 'POST',
                    headers: {
                      'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({email: 'jlg@jlg.com'}),
                  },
                );
                if (response.status === 401) {
                  setError('Bad email/password');
                  throw new Error('bad credentials');
                }
                if (response.status >= 400) {
                  setError('Technical issue');
                  throw new Error('technical error');
                }
                console.log('response: ', response);
                const user: User = await response.json();
                console.log('user: ', user);
                dispatch(connect(user));
              } catch (err) {
              } finally {
                setIsLoading(false);
              }
            })();
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
  isLoading: {
    justifyContent: 'center',
    margin: 20,
    height: 38,
    alignSelf: 'stretch',
    backgroundColor: 'hsl(0, 0%, 80%)',
  },
  error: {
    color: 'red',
    fontWeight: 'bold',
    fontSize: 20,
  },
});

export default Login;
