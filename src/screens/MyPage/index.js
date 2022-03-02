import React, {useRef, useState} from 'react';

import styles from './styles';

import {View, Text, TextInput, Clipboard, TouchableOpacity} from 'react-native';

import {LIMIT_DEFAULT, PAGE_DEFAULT} from 'constants';
import isEmpty from 'lodash/isEmpty';
import {ThemeView, Header, ButtonRounded, ChatIcon, Colors} from 'components';
import {Setting} from 'svg/common';
import I18n from 'i18n';
import {useIsFocused, useNavigation} from '@react-navigation/native';
import {useDispatch, useSelector} from 'react-redux';
import {
  commonActions,
  myPageActions,
  userActions,
  userSelectors,
} from 'reducers';
import {Auth} from 'aws-amplify';

import TabViewContainer from './TabView';
import InfoView from './InfoView';
import {ScrollView} from 'react-native';
import {showMessage} from 'react-native-flash-message';

const Index = () => {
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const isFocused = useIsFocused();

  const scrollViewRef = useRef();

  const [userToken, setUserToken] = useState('');

  const userProfile = useSelector((state) =>
    userSelectors.getUserProfile(state),
  );

  const userStatistics = useSelector((state) =>
    userSelectors.getUserStatistics(state),
  );
  const statisticsData = !isEmpty(userStatistics) ? userStatistics : {};

  React.useEffect(() => {
    // TODO remove
    Auth.currentAuthenticatedUser()
      .then((user) => {
        dispatch(userActions.getProfile(user.attributes['custom:userId']));
        setUserToken(user?.signInUserSession?.idToken?.jwtToken);
      })
      .catch((_) => {
        showMessage({
          message: I18n.t('unknownMessage'),
          type: 'danger',
          position: 'top',
        });
      });
    dispatch(commonActions.toggleLoading(false));
  }, []);

  React.useEffect(() => {
    if (isFocused) {
      dispatch(userActions.getStatistics(userProfile?.id));
      getData();
    }
  }, [isFocused]);

  React.useEffect(() => {
    dispatch(myPageActions.getUserOrdersStatusList());
  }, []);

  React.useEffect(() => {
    if (userProfile?.id) {
      getData();
    }
  }, [userProfile]);

  const getData = () => {
    dispatch(
      myPageActions.getListUserPost({
        userId: userProfile?.id,
        page: PAGE_DEFAULT,
        limit: LIMIT_DEFAULT,
        sorts: '-createdAt&+name',
      }),
    );
    dispatch(
      myPageActions.getListProductSale({
        page: PAGE_DEFAULT,
        limit: LIMIT_DEFAULT,
        userId: userProfile?.id,
        sorts: '-createdAt&+name',
      }),
    );
    dispatch(
      myPageActions.getListProductLiked({
        userId: userProfile?.id,
        page: PAGE_DEFAULT,
        limit: LIMIT_DEFAULT,
        sorts: '-createdAt&+name',
      }),
    );
    dispatch(
      myPageActions.getListProductSaved({
        page: PAGE_DEFAULT,
        limit: LIMIT_DEFAULT,
        sorts: '-createdAt&+name',
      }),
    );
  };

  const onNavigateSetting = () => {
    navigation.navigate('Setting');
  };

  const TokenDisplay = () => {
    return (
      <View
        style={{
          display: 'flex',
          flexDirection: 'row',
          alignItems: 'center',
          paddingTop: 16,
          paddingHorizontal: 12,
        }}>
        <Text style={{fontSize: 13, lineHeight: 18}}>Token</Text>
        <TextInput
          value={userToken}
          style={{
            height: 32,
            borderWidth: 1,
            borderColor: 'gray',
            borderRadius: 4,
            paddingHorizontal: 8,
            marginHorizontal: 12,
            flex: 1,
            backgroundColor: '#F2F2F2',
            color: '#A2A2A2',
          }}
          numberOfLines={1}
          editable={false}
        />
        <ButtonRounded
          style={styles.editButton}
          labelStyle={styles.editLabelButton}
          label={'Copy'}
          onPress={() => Clipboard.setString(userToken)}
        />
      </View>
    );
  };

  return (
    <ThemeView isFullView style={styles.container}>
      <Header
        title={userProfile?.username || ''}
        leftComponent={
          <View style={styles.leftHeader}>
            <TouchableOpacity>
              <ChatIcon color={Colors['$black']} />
            </TouchableOpacity>
          </View>
        }
        rightComponent={
          <View style={styles.rightHeader}>
            <TouchableOpacity
              onPress={onNavigateSetting}
              style={styles.rightHeaderIcon}>
              <Setting color={Colors['$black']} />
            </TouchableOpacity>
          </View>
        }
        containerStyle={styles.header}
        titleStyle={styles.headerTitle}
      />
      <ScrollView
        ref={scrollViewRef}
        scrollEventThrottle={1}
        nestedScrollEnabled={false}
        showsVerticalScrollIndicator={false}
        showsHorizontalScrollIndicator={false}
        style={styles.viewScroll}>
        <InfoView statistics={statisticsData} profile={userProfile} />
        <TokenDisplay />
        <TabViewContainer />
      </ScrollView>
    </ThemeView>
  );
};

export default Index;
