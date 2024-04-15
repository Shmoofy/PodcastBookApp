import React from 'react';
import { createDrawerNavigator, DrawerContentScrollView, DrawerItem } from '@react-navigation/drawer';
import { IconButton } from 'react-native-paper';

import SettingsScreen from '../../screens/SettingsScreen';
import AboutScreen from '../../screens/AboutScreen';
import HomeScreen from '../../screens/HomeScreen';
import PodcastDetails from '../../screens/PodcastDetailsScreen/PodcastDetailsScreen';
import WriteReviewScreen from '../../screens/WriteReviewScreen';

const Drawer = createDrawerNavigator();

const CustomDrawerContent = ({ navigation, state}) => {
  const currentRouteName = state.routes[state.index].name;

  return (
    <DrawerContentScrollView>
      {state.routes.map((route)=> {
        // Check if the route name is not the same as the current screen name
        if (route.name !== currentRouteName && route.name !== 'PodcastDetails' && route.name !== 'WriteReview') {
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

const MenuDrawer = ({route}) => {
  const userId = route.params?.userId;
  return (
    <Drawer.Navigator drawerContent={({ navigation, state}) => <CustomDrawerContent navigation={navigation} state={state}  />}>
        <Drawer.Screen name="Home" component={HomeScreen} initialParams={{userId:userId}}/>
        <Drawer.Screen name="About" component={AboutScreen} initialParams={{userId:userId}}/>
        <Drawer.Screen name="Settings" component={SettingsScreen} initialParams={{userId:userId}}/>
        <Drawer.Screen name="PodcastDetails" component={PodcastDetails} initialParams={{userId:userId}}/>
        <Drawer.Screen name="WriteReview" component={WriteReviewScreen} initialParams={{userId:userId}}/>
    </Drawer.Navigator>
  );
};

export default MenuDrawer;
