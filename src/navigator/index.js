import React from 'react';
import {useSelector} from 'react-redux';
import {
  CardStyleInterpolators,
  createStackNavigator,
} from '@react-navigation/stack';
import {NavigationContainer} from '@react-navigation/native';

import {commonSelectors, userSelectors} from 'reducers';
import RootNavigator from './rootNavigator';

import {darkTheme, lightTheme} from 'theme';

import {
  ForgotPassword,
  Onboarding,
  OTPVerification,
  ResetPassword,
  ResetPasswordViaMail,
  SignIn,
  SignInOptions,
  SignInViaPhone,
  SignUpOTPVerification,
  SignUpViaPhone,
  SimpleWebView,
  Stores,
  StoryBoard,
  Chat,
  UserProfile,
  Welcome,
  AddStory,
  AddStore,
} from 'screens';

import BottomTabs from './bottomTab';

const Stack = createStackNavigator();

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
      <Stack.Screen name="Stores" component={Stores} />
      <Stack.Screen name="StoryBoard" component={StoryBoard} />
      <Stack.Screen name="Chat" component={Chat} />
      <Stack.Screen name="UserProfile" component={UserProfile} />
      <Stack.Screen name="AddStory" component={AddStory} />
      <Stack.Screen name="AddStore" component={AddStore} />
    </Stack.Navigator>
  );
}

function SignedOut() {
  const initialRouteName = useSelector((state) =>
    commonSelectors.getInitialRouteName(state),
  );
  return (
    <Stack.Navigator
      screenOptions={{
        gestureEnabled: false,
        gestureDirection: 'horizontal',
        cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
      }}
      initialRouteName={initialRouteName}
      mode="card"
      headerMode="none"
      animation="fade">
      <Stack.Screen name="SignInOptions" component={SignInOptions} />
      <Stack.Screen name="SignIn" component={SignIn} />
      <Stack.Screen name="SignUpViaPhone" component={SignUpViaPhone} />
      <Stack.Screen name="SignInViaPhone" component={SignInViaPhone} />
      <Stack.Screen name="Welcome" component={Welcome} />
      <Stack.Screen name="Onboarding" component={Onboarding} />
      <Stack.Screen name="OTPVerification" component={OTPVerification} />
      <Stack.Screen
        name="SignUpOTPVerification"
        component={SignUpOTPVerification}
      />
      <Stack.Screen name="ForgotPassword" component={ForgotPassword} />
      <Stack.Screen name="ResetPassword" component={ResetPassword} />
      <Stack.Screen name="SimpleWebView" component={SimpleWebView} />
      <Stack.Screen
        name="ResetPasswordViaMail"
        component={ResetPasswordViaMail}
      />
    </Stack.Navigator>
  );
}

const App = React.forwardRef(() => {
  const userToken = useSelector((state) => userSelectors.getUserToken(state));
  const themeMode = useSelector((state) => commonSelectors.getThemeMode(state));
  console.log('userToken -----' + userToken);

  return (
    <NavigationContainer
      ref={(navigationRef) => {
        RootNavigator.setTopLevelNavigator(navigationRef);
      }}
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
        {!userToken ? (
          <Stack.Screen name="SignedOut" component={SignedOut} />
        ) : (
          <Stack.Screen name="SignedIn" component={SignedIn} />
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
});

export default App;
