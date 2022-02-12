import React, {useEffect, useState} from 'react';
import {Controller, useForm} from 'react-hook-form';
import {StyleSheet, Text, View} from 'react-native';
import {Button, Input} from 'react-native-elements';
import {api} from '../api';
import {ScreenProps} from '../navigation';
import {useAppDispatch, useAppSelector} from '../redux/hooks';
import {
  connect,
  selectAuthentication,
  User,
} from '../redux/slices/authentication.slice';

const Login = ({navigation}: ScreenProps<'Login'>) => {
  const authentication = useAppSelector(selectAuthentication);
  const dispatch = useAppDispatch();

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const {
    control,
    handleSubmit,
    formState: {errors},
  } = useForm({
    defaultValues: {
      email: 'jlg@jlg.com',
      password: 'xxx',
    },
  });

  useEffect(() => {
    if (authentication.user) {
      navigation.navigate('Home', {screen: 'Wall'});
    }
  });

  const onSubmit = handleSubmit(data => {
    console.log('data: ', data);
    (async () => {
      try {
        setIsLoading(true);
        const response = await api.connect(data.email, data.password);
        setIsLoading(false);
        if (response.status === 401) {
          throw new Error('Bad email/password');
        }
        if (response.status >= 400) {
          throw new Error('Technical issue');
        }
        try {
          const user: User = await response.json();
          dispatch(connect(user));
        } catch (err) {
          throw new Error('bad answer from back-end');
        }
      } catch (err) {
        if (err instanceof Error) {
          setError(err.message);
        }
      }
    })();
  });

  return (
    <View style={styles.view}>
      <View style={styles.viewLogo}>
        <Text style={styles.logo}>PhotoBook</Text>
      </View>
      <View style={styles.form}>
        <Text style={styles.title}>Sign in</Text>
        <Controller
          control={control}
          rules={{
            required: 'Email is required',
            pattern: {
              value: /\S+@\S+\.\S+/,
              message: 'Entered value does not match email format',
            },
          }}
          name="email"
          render={({field: {onChange, onBlur, value}}) => (
            <Input
              placeholder="Email"
              autoCompleteType={undefined}
              keyboardType="email-address"
              onBlur={onBlur}
              onChangeText={onChange}
              value={value}
              errorMessage={errors.email ? errors.email.message : ''}
            />
          )}
        />

        <Controller
          control={control}
          rules={{
            required: 'Password is required.',
          }}
          name="password"
          render={({field: {onChange, onBlur, value}}) => (
            <Input
              placeholder="Password"
              autoCompleteType={undefined}
              secureTextEntry={true}
              onBlur={onBlur}
              onChangeText={onChange}
              value={value}
              errorMessage={errors.password ? errors.password.message : ''}
            />
          )}
        />

        <Text style={styles.error}>{error} </Text>

        <Button
          loading={isLoading}
          containerStyle={styles.button}
          title="Connexion"
          onPress={onSubmit}
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
  fieldError: {
    color: 'red',
    alignSelf: 'stretch',
  },
});

export default Login;
