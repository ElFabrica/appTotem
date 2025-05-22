import { useEffect } from 'react';
import AppNavigator from './src/navegation/appNavegator';

export default function App() {

  useEffect(() => {
    navigate("Home"); // Isso agora funciona
  }, []);

  return <AppNavigator />;
}
