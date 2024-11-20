import * as React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import Login from "./componente/Login";
import Pagina from "./componente/Pagina";
import Usuario from "./componente/Usuario";

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Login">
        <Stack.Screen
          name="Login"
          component={Login}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Usuario"
          component={Usuario}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Pagina"
          component={Pagina}
          options={{ headerShown: false }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
