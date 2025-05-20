import * as React from 'react';
import { View, Text } from 'react-native';
import { createStaticNavigation, NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Splash from "../screens/Splash";
import Question from "../screens/Questions"
import { SafeAreaView } from 'react-native-safe-area-context';


const Stack = createNativeStackNavigator()

function AppNavigator() {
    return (
        <NavigationContainer>
            <Stack.Navigator screenOptions={{contentStyle:{padding:8}}}>
                <Stack.Screen name="Splash" component={Splash} />
                <Stack.Screen name="Question" component={Question} />
            </Stack.Navigator>
        </NavigationContainer>
    );


}

export default AppNavigator