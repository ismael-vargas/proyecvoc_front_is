import { NativeStackNavigationProp } from '@react-navigation/native-stack';

export type RootStackParamList = {
  Login: undefined;
  Register: undefined;
  Home: { profesor: any };

};

export type LoginScreenNavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  'Login'
>;

export interface LoginScreenProps {
  navigation: LoginScreenNavigationProp;
}
