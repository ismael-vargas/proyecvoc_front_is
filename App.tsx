import { ProfesorProvider } from './src/context/ProfesorContext'; // ⬅️ importa el Provider
import { NavigationContainer } from '@react-navigation/native';
import Navigator from './src/navigation/Navigator'; 

export default function App() {
  return (
    <ProfesorProvider>
      <NavigationContainer>
        <Navigator /> 
      </NavigationContainer>
    </ProfesorProvider>
  );
}
