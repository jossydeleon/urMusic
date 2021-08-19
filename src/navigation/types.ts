import { NavigatorScreenParams } from '@react-navigation/native';

export type MainStackParamList = {
  HomeBottomNavigator: NavigatorScreenParams<BottomStackParamList>;
  SearchMusic: undefined;
  MediaPlayer: { name: string };
  Settings: undefined;
  Demo: undefined;
};

//Bottom Navigation Stack Param
export type BottomStackParamList = {
  HomeWelcome: undefined;
  Catcher: undefined;
  Library: undefined;
};
