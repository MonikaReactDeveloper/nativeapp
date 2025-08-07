// App.js
import 'react-native-gesture-handler';
import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import HomeScreen from './Components/Screens/HomeScreen';
import SettingsScreen from './Components/Screens/SettingScreen';
import MapScreen from './Components/Screens/MapScreen';

import CustomDrawerContent from './Components/Screens/CustomDrawerContent';
import { MapProvider } from './Components/Context/MapContext';
import Know from './Components/Screens/Know';
import Play from './Components/Screens/Play';
import AppSetting from './Components/Screens/AppSetting';
import { AppSettingProvider } from './Components/Context/AppSettingContext';
import LoginScreen from './Components/Screens/LoginScreen';


const Drawer = createDrawerNavigator();


export default function App() {
  const webviewRef=React.useRef();
const viewShotRef=React.useRef();
  return (

    <AppSettingProvider>
    <MapProvider>
        <NavigationContainer>
      <Drawer.Navigator drawerContent={(props) => <CustomDrawerContent {...props} webviewRef={webviewRef} viewShotRef={viewShotRef}
       />}>
        <Drawer.Screen name="Home" component={HomeScreen}  options={{ headerShown: false }}   />
        <Drawer.Screen name="Settings" component={SettingsScreen}  options={{ 
    drawerItemStyle: { display: 'none' }, // hides it from drawer
    // optional, if you want to hide header
  }}  />
             <Drawer.Screen name="AppSettings" component={AppSetting} options={{ 
    drawerItemStyle: { display: 'none' }, // hides it from drawer
// optional, if you want to hide header
  }}/>
                {/* <Drawer.Screen
          name="Login"
          component={LoginScreen}
          options={{ headerShown: false }}  // ✅ Hide default header with hamburger
        /> */}
         {/* <Drawer.Screen name="AppSettings" component={AppSetting} /> */}
       <Drawer.Screen
  name="Mark"
  options={{ headerShown: false }}
>
  {(props) => (
    <MapScreen
      {...props}
      webviewRef={webviewRef}
      viewShotRef={viewShotRef}
    />
  )}
</Drawer.Screen>

          <Drawer.Screen
          name="Know"
          component={Know}
          options={{ headerShown: false }}  // ✅ Hide default header with hamburger
        />
          <Drawer.Screen
          name="Play"
          component={Play}
          options={{ headerShown: false }}  // ✅ Hide default header with hamburger
        />
        </Drawer.Navigator>
         </NavigationContainer>
          </MapProvider> 
          </AppSettingProvider>
  );
}
