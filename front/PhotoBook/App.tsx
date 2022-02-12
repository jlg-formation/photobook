import {NavigationContainer} from '@react-navigation/native';
import React, {useEffect, useState} from 'react';
import {
  ActivityIndicator,
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
import {api} from './src/api';
import {Stack} from './src/navigation';
import {useAppDispatch, useAppSelector} from './src/redux/hooks';
import {
  connect,
  disconnect,
  selectAuthentication,
  User,
} from './src/redux/slices/authentication.slice';
import {store} from './src/redux/store';
import Home from './src/screens/Home';
import Login from './src/screens/Login';

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
        const response = await api.isConnected();
        if (response.status === 401) {
          dispatch(disconnect(undefined));
          return;
        }
        const user: User = await response.json();
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
              <Text style={styles.logo}>PhotoBook</Text>
              <ActivityIndicator size="large" />
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
  logo: {
    height: 100,
    textAlign: 'center',
    fontSize: 50,
    fontWeight: 'bold',
  },
});

export default App;
