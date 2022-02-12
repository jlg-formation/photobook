import {
  createNativeStackNavigator,
  NativeStackScreenProps,
} from '@react-navigation/native-stack';

export type RootStackParamList = {
  Home: {screen: keyof TabStackParamList};
  Login: undefined;
};

export type TabStackParamList = {
  Wall: undefined;
  Legal: undefined;
  Settings: undefined;
};

export type ScreenProps<T extends keyof RootStackParamList> =
  NativeStackScreenProps<RootStackParamList, T>;

export const Stack = createNativeStackNavigator<RootStackParamList>();
