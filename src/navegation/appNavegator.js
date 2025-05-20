import * as React from 'react';
import { View, Text } from 'react-native';
import { createStaticNavigation, NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Home from "../screens/Home";
import Question from "../screens/Questions"
import Score from "../screens/Score"
import { SafeAreaView } from 'react-native-safe-area-context';


const Stack = createNativeStackNavigator()



function AppNavigator() {
    return (

       
        <NavigationContainer>
            <Stack.Navigator screenOptions={{contentStyle:{padding:8}}}>
                <Stack.Screen options={{
                        headerShown: false
                    }} name="Home" component={Home} />
                <Stack.Screen name="Question" component={Question} />
                <Stack.Screen 
                    options={{
                        headerShown: false
                    }}
                name="Score" component={Score} />
            </Stack.Navigator>
        </NavigationContainer>

    );


}

export default AppNavigator