import React from 'react';
import { createDrawerNavigator, DrawerContentScrollView, DrawerItem } from '@react-navigation/drawer';
import { IconButton } from 'react-native-paper';

import SettingsScreen from '../../screens/SettingsScreen';
import AboutScreen from '../../screens/AboutScreen';
import HomeScreen from '../../screens/HomeScreen';
import PodcastDetails from '../../screens/PodcastDetailsScreen/PodcastDetailsScreen';

const Drawer = createDrawerNavigator();

const CustomDrawerContent = ({ navigation, state }) => {
  const currentRouteName = state.routes[state.index].name;

  return (
    <DrawerContentScrollView>
      {state.routes.map((route) => {
        // Check if the route name is not the same as the current screen name
        if (route.name !== currentRouteName && route.name !== 'PodcastDetails') {
          return (
            <DrawerItem
              key={route.key}
              label={route.name}
              onPress={() => navigation.navigate(route.name)}
              icon={({ color, size }) => (
                <IconButton
                  icon="arrow-left"
                  color={color}
                  size={size}
                  onPress={() => {}}
                />
              )}
            />
          );
        }
        return null; // Skip rendering the current screen in the drawer
      })}
    </DrawerContentScrollView>
  );
};

const MenuDrawer = () => {
  return (
    <Drawer.Navigator drawerContent={({ navigation, state }) => <CustomDrawerContent navigation={navigation} state={state} />}>
        <Drawer.Screen name="Home" component={HomeScreen} />
        <Drawer.Screen name="About" component={AboutScreen} />
        <Drawer.Screen name="Settings" component={SettingsScreen} />
        <Drawer.Screen name="PodcastDetails" component={PodcastDetails} />
    </Drawer.Navigator>
  );
};

export default MenuDrawer;
