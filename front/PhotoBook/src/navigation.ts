import {
  createNativeStackNavigator,
  NativeStackScreenProps,
} from '@react-navigation/native-stack';

export type RootStackParamList = {
  Home: undefined;
  Legal: undefined;
  Login: undefined;
  Settings: undefined;
  Wall: undefined;
};

export type ScreenProps<T extends keyof RootStackParamList> =
  NativeStackScreenProps<RootStackParamList, T>;

export const Stack = createNativeStackNavigator<RootStackParamList>();
