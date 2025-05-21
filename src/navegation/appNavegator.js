import * as React from "react";
import { View, Text } from "react-native";
import {
  createStaticNavigation,
  NavigationContainer,
} from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Home from "../screens/Home";
import Question from "../screens/Questions";
import Score from "../screens/Score";
import { SafeAreaView } from "react-native-safe-area-context";
import Form from "../screens/Form";
import Users from "../screens/Users";
import { Provider as TinybaseProvider } from "tinybase/ui-react"

const Stack = createNativeStackNavigator();

function AppNavigator() {
  return (
    <TinybaseProvider>
      <NavigationContainer>
      <Stack.Navigator screenOptions={{ contentStyle: { padding: 8 } }}>
        <Stack.Screen
          options={{
            headerShown: false,
          }}
          name="Home"
          component={Home}
        />
        <Stack.Screen
          options={{
            headerShown: false,
          }}
          name="Form"
          component={Form}
        />
        <Stack.Screen name="Question" component={Question} />
        <Stack.Screen
          options={{
            headerShown: false,
          }}
          name="Score"
          component={Score}
        />
        <Stack.Screen
          name="Users"
          component={Users}
        />
      </Stack.Navigator>
    </NavigationContainer>
    </TinybaseProvider>
  );
}

export default AppNavigator;
