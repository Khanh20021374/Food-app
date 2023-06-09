import { Ionicons } from '@expo/vector-icons';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import * as React from 'react';
import { Platform } from 'react-native';

import Colors from '../constants/Colors';
import useColorScheme from '../hooks/useColorScheme';
import HomeScreen from '../screens/HomeScreen';
import DataScreen from '../screens/DataScreen';
import { BottomTabParamList, HomeParamList, DataParamList } from '../types';

const BottomTab = createBottomTabNavigator<BottomTabParamList>();

export default function BottomTabNavigator() {
  const colorScheme = useColorScheme();

  return (
    <BottomTab.Navigator
      initialRouteName="Home"
      tabBarOptions={{ activeTintColor: Colors[colorScheme].tint }}>
      <BottomTab.Screen
        name="Home"
        component={HomeNavigator}
        options={{
          tabBarIcon: ({ color }) => <TabBarIcon color={color} name={Platform.OS === 'ios' ? 'ios-home' : 'md-home'} />,
        }}
      />
      <BottomTab.Screen
        name="Mục lục"
        component={TabDataNavigator}
        options={{
          tabBarIcon: ({ color }) => <TabBarIcon color={color} name={Platform.OS === 'ios' ? 'ios-library-outline' : 'md-library-outline'} />,
        }}
      />
    </BottomTab.Navigator>
  );
}

// You can explore the built-in icon families and icons on the web at:
// https://icons.expo.fyi/
function TabBarIcon(props: { name: string; color: string }) {
  return <Ionicons size={30} style={{ marginBottom: -3 }} {...props} />;
}

// Each tab has its own navigation stack, you can read more about this pattern here:
// https://reactnavigation.org/docs/tab-based-navigation#a-stack-navigator-for-each-tab
const HomeStack = createStackNavigator<HomeParamList>();

function HomeNavigator() {
  return (
    <HomeStack.Navigator>
      <HomeStack.Screen
        name="HomeScreen"
        component={HomeScreen}
        options={{ headerTitle: 'Home' }}
      />
    </HomeStack.Navigator>
  );
}

const DataTabStack = createStackNavigator<DataParamList>();

function TabDataNavigator() {
  return (
    <DataTabStack.Navigator>
      <DataTabStack.Screen
        name="DataScreen"
        component={DataScreen}
        options={{ headerTitle: 'Danh sách món ăn' }}
      />
    </DataTabStack.Navigator>
  );
}