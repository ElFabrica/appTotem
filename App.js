import { useEffect } from 'react';
import AppNavigator from './src/navegation/appNavegator';

export default function App( {navigation} ) {
/*
  useEffect(() => {
    navigation.navigate("Home"); // Ao gerar o app, o apk lança o usuário para essa tela em branca. Remova esses comentários antes de gerar o biuld.
  }, []);
*/
  return <AppNavigator />;
}
