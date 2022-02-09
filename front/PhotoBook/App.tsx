import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import React, {useEffect, useState} from 'react';
import {
  SafeAreaView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
} from 'react-native';
import {ThemeProvider} from 'react-native-elements';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import {Colors} from 'react-native/Libraries/NewAppScreen';
import {Provider} from 'react-redux';
import {useAppDispatch, useAppSelector} from './src/redux/hooks';
import {
  connect,
  disconnect,
  selectAuthentication,
  User,
} from './src/redux/slices/authentication.slice';
import {store} from './src/redux/store';
import Home from './src/screens/Home';
import Legal from './src/screens/Legal';
import Login from './src/screens/Login';

const Stack = createNativeStackNavigator();

const App = () => {
  return (
    <Provider store={store}>
      <ReduxApp />
    </Provider>
  );
};

const ReduxApp = () => {
  const authentication = useAppSelector(selectAuthentication);
  const dispatch = useAppDispatch();
  const [initializing, setInitializing] = useState(true);
  const isDarkMode = useColorScheme() === 'dark';
  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  };

  useEffect(() => {
    (async () => {
      try {
        console.log('test if connected');
        const response = await fetch('http://10.0.2.2:3000/api/isConnected');
        console.log('response: ', response);
        if (response.status === 401) {
          dispatch(disconnect(undefined));
          return;
        }
        const user: User = await response.json();
        console.log('user: ', user);
        dispatch(connect(user));
      } finally {
        setInitializing(false);
      }
    })();
  }, [dispatch]);
  return (
    <ThemeProvider>
      <SafeAreaProvider>
        <SafeAreaView style={[styles.safeAreaView, backgroundStyle]}>
          <StatusBar barStyle={isDarkMode ? 'light-content' : 'dark-content'} />
          {initializing ? (
            <View style={styles.initilizing}>
              <Text>Initializing...</Text>
            </View>
          ) : (
            <NavigationContainer>
              <Stack.Navigator
                initialRouteName={authentication.user ? 'Home' : 'Login'}
                screenOptions={{
                  headerShown: false,
                }}>
                <Stack.Screen name="Home" component={Home} />
                <Stack.Screen name="Login" component={Login} />
                <Stack.Screen
                  name="Legal"
                  component={Legal}
                  options={{
                    title: 'Mentions Légales',
                    headerStyle: {
                      backgroundColor: 'hsl(30, 100%, 50%)',
                    },
                  }}
                />
              </Stack.Navigator>
            </NavigationContainer>
          )}
        </SafeAreaView>
      </SafeAreaProvider>
    </ThemeProvider>
  );
};

const styles = StyleSheet.create({
  safeAreaView: {flex: 1},
  initilizing: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default App;
