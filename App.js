import "react-native-gesture-handler";
import React, { Component } from "react";
import LoadCards from "./src/screens/LoadCards";
import ViewCards from "./src/screens/ViewCards";
import Menu from "./src/screens/Menu";
import About from "./src/screens/About";
import Recycle from "./src/screens/Recycle";
import Filter from "./src/screens/Filter";
import { StatusBar } from "react-native"
import { NavigationContainer, StackActions } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
const Stack = createStackNavigator();
export default class App extends Component {
  constructor() {
    super();
    this.state = {};
  }

  render() {
    return (
      <NavigationContainer>
        <StatusBar backgroundColor="black"/>
        <Stack.Navigator screenOptions={{
          headerStyle: {
            backgroundColor: 'black',
          },
          headerTitleStyle: {
            color: 'white'
          },
          headerTintColor: 'white'
        }}>
          <Stack.Screen name='Menu' component={Menu} />
          <Stack.Screen name='Load Cards' component={LoadCards} options={{ title: 'Import Cards' }}/>
          <Stack.Screen name='View Cards' component={ViewCards} initialParams={{list: '@userList'}}/>
          <Stack.Screen name='About' component={About} />
          <Stack.Screen name='Recycle' component={Recycle} initialParams={{list:'@recycleList'}} options={{ title: 'Recycle Bin' }}/>
          <Stack.Screen name='Filter' component={Filter} />
        </Stack.Navigator>
      </NavigationContainer>
    );
  }
}
