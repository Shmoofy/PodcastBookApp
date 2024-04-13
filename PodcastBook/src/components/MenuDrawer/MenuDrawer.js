import React, {useEffect} from 'react';
import { createDrawerNavigator, DrawerContentScrollView, DrawerItem } from '@react-navigation/drawer';
import { IconButton } from 'react-native-paper';


import SettingsScreen from '../../screens/SettingsScreen';
import AboutScreen from '../../screens/AboutScreen';
import HomeScreen from '../../screens/HomeScreen';
import { useNavigation } from '@react-navigation/native';

const Drawer = createDrawerNavigator();

const CustomDrawerContent = ({ navigation, state }) => {
  return (
    <DrawerContentScrollView>
      {state.routes.map((route) => (
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
      ))}
    </DrawerContentScrollView>
  );
};

const MenuDrawer = () => {
    const navigation = useNavigation();
    useEffect(()=>{
        navigation.navigate("Home")
    },[]);

  return (
    <Drawer.Navigator drawerContent={({ navigation, state }) => <CustomDrawerContent navigation={navigation} state={state} />}>
        <Drawer.Screen name="Home" component={HomeScreen} />
        <Drawer.Screen name="About" component={AboutScreen} />
        <Drawer.Screen name="Settings" component={SettingsScreen} />
    </Drawer.Navigator>
  );
};

export default MenuDrawer;