import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import React, {useEffect} from 'react';
import {ScreenProps} from '../navigation';
import {useAppSelector} from '../redux/hooks';
import {selectAuthentication} from '../redux/slices/authentication.slice';
import Legal from './Legal';
import Settings from './Settings';
import Wall from './Wall';

const Tab = createBottomTabNavigator();

const Home = ({navigation}: ScreenProps<'Home'>) => {
  const authentication = useAppSelector(selectAuthentication);
  useEffect(() => {
    if (authentication.user === undefined) {
      navigation.navigate('Login');
    }
  }, [navigation, authentication]);
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
      }}>
      <Tab.Screen name="Wall" component={Wall} />
      <Tab.Screen name="Legal" component={Legal} />
      <Tab.Screen name="Settings" component={Settings} />
    </Tab.Navigator>
  );
};

export default Home;
