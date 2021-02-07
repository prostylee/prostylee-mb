import React from 'react';
import {useSelector} from 'react-redux';
import {
  createStackNavigator,
  CardStyleInterpolators,
} from '@react-navigation/stack';
import {NavigationContainer} from '@react-navigation/native';

import {userSelectors, commonSelectors} from 'reducers';
import {navigationRef} from './rootNavigator';

import {lightTheme, darkTheme} from 'theme';

const Stack = createStackNavigator();

import {
  Welcome,
  Onboarding,
  Login,
  SignUpViaPhone,
  LoginViaPhone,
  Home,
  LoginOptions,
  OTPVerification,
} from 'screens';

function SignedIn() {
  return (
    <Stack.Navigator
      screenOptions={{
        gestureEnabled: true,
        gestureDirection: 'horizontal',
        cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
      }}
      initialRouteName="Home"
      mode="card"
      headerMode="none"
      animation="fade">
      <Stack.Screen name="Home" component={Home} />
    </Stack.Navigator>
  );
}

function SignedOut() {
  return (
    <Stack.Navigator
      screenOptions={{
        gestureEnabled: false,
        gestureDirection: 'horizontal',
        cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
      }}
      initialRouteName="Welcome"
      mode="card"
      headerMode="none"
      animation="fade">
      <Stack.Screen name="LoginOptions" component={LoginOptions} />
      <Stack.Screen name="Login" component={Login} />
      <Stack.Screen name="SignUpViaPhone" component={SignUpViaPhone} />
      <Stack.Screen name="LoginViaPhone" component={LoginViaPhone} />
      <Stack.Screen name="Welcome" component={Welcome} />
      <Stack.Screen name="Onboarding" component={Onboarding} />
      <Stack.Screen name="OTPVerification" component={OTPVerification} />
    </Stack.Navigator>
  );
}

const App = React.forwardRef(() => {
  const user = useSelector((state) => userSelectors.getUser(state));
  const themeMode = useSelector((state) => commonSelectors.getThemeMode(state));

  return (
    <NavigationContainer
      ref={navigationRef}
      theme={themeMode === 'dark' ? darkTheme : lightTheme}>
      <Stack.Navigator
        screenOptions={{
          gestureEnabled: true,
          gestureDirection: 'horizontal',
          cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
        }}
        mode="card"
        headerMode="none"
        animation="fade">
        {user === null ? (
          <Stack.Screen name="SignedOut" component={SignedOut} />
        ) : (
          <Stack.Screen name="SignedIn" component={SignedIn} />
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
});

export default App;
