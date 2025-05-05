
import { ReactNode } from 'react';
import { Profesor } from '../../screens/Profile/types';

export type RootStackParamList = {
  Home: undefined;
  Profile: { profesor: Profesor };
  Subjects: undefined;
  Login: undefined;
  Mission: undefined;
  Tasks: undefined;
  AllTasks: undefined;  // Agrega esta línea para AllTasks
};

export interface CustomSidebarProps {
  isOpen: boolean;
  onClose: () => void;
  children?: ReactNode;
}

export interface MenuItem {
  title: string;
  screen: keyof RootStackParamList;
  icon: string;  
}
