import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import React, {useEffect} from 'react';
import {ScreenProps} from '../navigation';
import {useAppSelector} from '../redux/hooks';
import {selectAuthentication} from '../redux/slices/authentication.slice';
import Legal from './Legal';
import Settings from './Settings';
import Wall from './Wall';

import {Icon} from 'react-native-elements';

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
      screenOptions={({route}) => ({
        headerShown: false,
        tabBarIcon: ({focused, color, size}) => {
          console.log('focused: ', focused, route.name);
          const icon = {
            name: 'home',
          };

          switch (route.name) {
            case 'Wall':
              icon.name = 'home';
              if (focused) {
                icon.name = 'cat';
              }
              break;
            case 'Legal':
              icon.name = 'balance-scale';
              break;
            case 'Settings':
              icon.name = 'cog';
              break;
            default:
          }

          // You can return any component that you like here!
          return (
            <Icon
              name={icon.name}
              type="font-awesome-5"
              size={size}
              color={color}
              tvParallaxProperties={undefined}
            />
          );
        },
        tabBarActiveTintColor: 'tomato',
        tabBarInactiveTintColor: 'gray',
      })}>
      <Tab.Screen name="Wall" component={Wall} />
      <Tab.Screen name="Legal" component={Legal} />
      <Tab.Screen name="Settings" component={Settings} />
    </Tab.Navigator>
  );
};

export default Home;
