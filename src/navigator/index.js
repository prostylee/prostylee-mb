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
  Comment,
  UserProfile,
  Welcome,
  AddStory,
  AddStore,
  CropPicture,
  AddStatus,
  AddStoreForStatus,
  Categories,
  ProductDetail,
  Products,
  Search,
  FilterProduct,
  SearchProducts,
  PromoNotification,
  MainNotification,
  ReviewRating,
  ChooseRateProduct,
  RateProduct,
  Cart,
  CartAddressSelect,
  CartSelectShippingMethod,
  StoreProfileMain,
  StoreVouchers,
  PaymentMethodCart,
  VoucherCart,
  CheckoutCart,
  //-------- Post Product --------
  AddProductsCategories,
  BrandFashions,
  GeneralInformation,
  ProductInformations,
  PaymentShipping,
  AddressRecent,
  AddressTyping,
  Maps,
  //-------- Post Product --------
  Setting,
  SettingMyAccount,
  SettingAddress,
  SettingChat,
  SettingNotification,
  SettingLanguage,
  Orders,
  OrdersDetail,
  SettingAddAddress,
  BestSeller,
  PersonalSalers,
  SearchProductFilter,
  Vouchers,
  FlashSale,
  NearbyStore,
  StoreAddress,
  StoreHighlight,
  MyPage,
  //-------- Chat Box --------
  ChatBox,
  ChatList,
  //-------- Chat Box --------
  WishList,
  SoldList,
  SaveList,
  CropPostProductImage,
  Brand,
  PostList,
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
      <Stack.Screen name="ReviewRating" component={ReviewRating} />
      <Stack.Screen name="ChooseRateProduct" component={ChooseRateProduct} />
      <Stack.Screen name="RateProduct" component={RateProduct} />
      <Stack.Screen name="Cart" component={Cart} />
      <Stack.Screen name="CartAddressSelect" component={CartAddressSelect} />
      <Stack.Screen
        name="CartSelectShippingMethod"
        component={CartSelectShippingMethod}
      />
      <Stack.Screen name="MyPage" component={MyPage} />
      {/******** Chat & Message ********/}
      <Stack.Screen name="ChatBox" component={ChatBox} />
      <Stack.Screen name="ChatList" component={ChatList} />
      {/******** Chat & Message ********/}
      <Stack.Screen name="WishList" component={WishList} />
      <Stack.Screen name="SaveList" component={SaveList} />
      <Stack.Screen name="SoldList" component={SoldList} />
      <Stack.Screen name="Orders" component={Orders} />
      <Stack.Screen name="OrdersDetail" component={OrdersDetail} />
      <Stack.Screen name="PaymentMethodCart" component={PaymentMethodCart} />
      <Stack.Screen name="VoucherCart" component={VoucherCart} />
      <Stack.Screen name="CheckoutCart" component={CheckoutCart} />
      <Stack.Screen name="Categories" component={Categories} />
      <Stack.Screen name="Products" component={Products} />
      <Stack.Screen name="FilterProduct" component={FilterProduct} />
      <Stack.Screen name="ProductDetail" component={ProductDetail} />
      <Stack.Screen name="Stores" component={Stores} />
      <Stack.Screen name="StoryBoard" component={StoryBoard} />
      <Stack.Screen name="Comment" component={Comment} />
      <Stack.Screen name="BestSeller" component={BestSeller} />
      <Stack.Screen name="PersonalSalers" component={PersonalSalers} />
      <Stack.Screen name="UserProfile" component={UserProfile} />
      <Stack.Screen name="Vouchers" component={Vouchers} />
      <Stack.Screen name="NearbyStore" component={NearbyStore} />
      <Stack.Screen name="FlashSale" component={FlashSale} />
      <Stack.Screen
        name="SearchProductFilter"
        component={SearchProductFilter}
        options={{
          gestureEnabled: false,
        }}
      />
      <Stack.Screen name="StoreAddress" component={StoreAddress} />
      <Stack.Screen name="StoreHighlight" component={StoreHighlight} />
      <Stack.Screen name="AddStory" component={AddStory} />
      <Stack.Screen name="AddStore" component={AddStore} />
      <Stack.Screen name="CropPicture" component={CropPicture} />
      <Stack.Screen name="AddStatus" component={AddStatus} />
      <Stack.Screen name="AddStoreForStatus" component={AddStoreForStatus} />
      {/******** Post Product ********/}
      <Stack.Screen
        name="AddProductsCategories"
        component={AddProductsCategories}
      />
      <Stack.Screen name="Maps" component={Maps} />
      <Stack.Screen name="AddressTyping" component={AddressTyping} />
      <Stack.Screen name="AddressRecent" component={AddressRecent} />
      <Stack.Screen name="BrandFashions" component={BrandFashions} />
      <Stack.Screen name="PaymentShipping" component={PaymentShipping} />
      <Stack.Screen name="GeneralInformation" component={GeneralInformation} />
      <Stack.Screen
        name="ProductInformations"
        component={ProductInformations}
      />
      <Stack.Screen
        name="CropPostProductImage"
        component={CropPostProductImage}
      />
      {/******** Post Product ********/}
      <Stack.Screen name="Setting" component={Setting} />
      <Stack.Screen name="SettingMyAccount" component={SettingMyAccount} />
      <Stack.Screen name="SettingAddress" component={SettingAddress} />
      <Stack.Screen name="SettingAddAddress" component={SettingAddAddress} />
      <Stack.Screen name="SettingChat" component={SettingChat} />
      <Stack.Screen
        name="SettingNotification"
        component={SettingNotification}
      />
      <Stack.Screen name="SettingLanguage" component={SettingLanguage} />
      <Stack.Screen name="Search" component={Search} />
      <Stack.Screen name="SearchProducts" component={SearchProducts} />
      <Stack.Screen name="MainNotification" component={MainNotification} />
      <Stack.Screen name="PromoNotification" component={PromoNotification} />
      <Stack.Screen name="SimpleWebView" component={SimpleWebView} />
      <Stack.Screen name="StoreProfileMain" component={StoreProfileMain} />
      <Stack.Screen name="StoreVouchers" component={StoreVouchers} />
      <Stack.Screen name="Brand" component={Brand} />
      <Stack.Screen name="PostList" component={PostList} />
      <Stack.Screen name="ForgotPassword" component={ForgotPassword} />
      <Stack.Screen name="ResetPassword" component={ResetPassword} />
      <Stack.Screen
        name="ResetPasswordViaMail"
        component={ResetPasswordViaMail}
      />
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
