import React from 'react';
import { createDrawerNavigator, DrawerContentScrollView, DrawerItem } from '@react-navigation/drawer';
import { IconButton } from 'react-native-paper';

import SettingsScreen from '../../screens/AccountScreen';
import FollowingScreen from '../../screens/FollowingScreen';
import HomeScreen from '../../screens/HomeScreen';
import PodcastDetails from '../../screens/PodcastDetailsScreen/PodcastDetailsScreen';
import WriteReviewScreen from '../../screens/WriteReviewScreen';
import AccountScreen from '../../screens/AccountScreen';
import EditReviewScreen from '../../screens/EditReviewScreen';
import NewPasswordScreen from '../../screens/NewPasswordScreen';

const Drawer = createDrawerNavigator();

const CustomDrawerContent = ({ navigation, state}) => {
  const currentRouteName = state.routes[state.index].name;

  return (
    <DrawerContentScrollView>
      {state.routes.map((route)=> {
        // Check if the route name is not the same as the current screen name
        if (route.name !== currentRouteName && route.name !== 'Podcast Details' && route.name !== 'Write Review' && route.name !== 'Edit Review' && route.name !== 'Settings') {
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
        <Drawer.Screen name="Explore" component={HomeScreen} initialParams={{userId:userId}}/>
        <Drawer.Screen name="Friends" component={FollowingScreen} initialParams={{userId:userId}}/>
        <Drawer.Screen name="Account" component={AccountScreen} initialParams={{userId:userId}}/>
        <Drawer.Screen name="Podcast Details" component={PodcastDetails} initialParams={{userId:userId}}/>
        <Drawer.Screen name="Write Review" component={WriteReviewScreen} initialParams={{userId:userId}}/>
        <Drawer.Screen name="Edit Review" component={EditReviewScreen} initialParams={{userId:userId}}/>
        <Drawer.Screen name="Settings" component={NewPasswordScreen} initialParams={{userId:userId}} />

    </Drawer.Navigator>
  );
};

export default MenuDrawer;
