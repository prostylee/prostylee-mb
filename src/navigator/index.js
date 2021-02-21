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
  SignUp,
  LoginOptions,
  Stores,
  StoryBoard,
  Chat,
} from 'screens';
import BottomTabs from './bottomTab';

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
      <Stack.Screen name="Home" component={BottomTabs} />
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
      <Stack.Screen name="SignUp" component={SignUp} />
      <Stack.Screen name="Welcome" component={Welcome} />
      <Stack.Screen name="Onboarding" component={Onboarding} />
    </Stack.Navigator>
  );
}

function MainStack() {
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
      <Stack.Screen name="Home" component={BottomTabs} />
      <Stack.Screen name="Stores" component={Stores} />
      <Stack.Screen name="StoryBoard" component={StoryBoard} />
      <Stack.Screen name="Chat" component={Chat} />
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
          <Stack.Screen name="SignedOut" component={MainStack} />
        ) : (
          <Stack.Screen name="SignedIn" component={SignedIn} />
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
});

export default App;
