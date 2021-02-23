import React from 'react';
import {Text, View, Dimensions} from 'react-native';

import {Container, TextButton, SocialLogin} from 'components';
import {TabView, TabBar, SceneMap} from 'react-native-tab-view';
import {useKeyboard, useBackHandler} from '@react-native-community/hooks';

import styles from './styles';
import I18n from 'i18n';

import {LogoBlack} from 'svg/common';

import envConfig from 'config';

import LoginTab from './LoginTab';
import SignUpTab from './SignUpTab';

const initialLayout = {width: Dimensions.get('window').width};

const Index = (props) => {
  const [index, setIndex] = React.useState(0);
  const keyboard = useKeyboard();

  //UseEffect
  React.useEffect(() => {
    const tabIndex = props.route.params?.index;
    if (tabIndex === 1) {
      setIndex(tabIndex);
    }
  }, []);

  //BackHandler handle
  useBackHandler(() => {
    if (props.route.name === 'Login') {
      props.navigation.goBack();
      return true;
    }
  });

  //initial Tabs
  const [routes] = React.useState([
    {key: 'login', title: I18n.t('login')},
    {key: 'signup', title: I18n.t('signUp')},
  ]);

  //handle funcs
  const onGoToTerms = () => {
    props.navigation.navigate('PrivacyAndPolicy', {
      url: envConfig.termOfUseURL,
      title: I18n.t('termOfUse'),
    });
  };
  const onGoToPrivacy = () => {
    props.navigation.navigate('PrivacyAndPolicy', {
      url: envConfig.privacyPolicyURL,
      title: I18n.t('privacyPolicy'),
    });
  };

  const renderScene = SceneMap({
    login: LoginTab,
    signup: SignUpTab,
  });

  const renderTabBar = (props) => (
    <TabBar
      {...props}
      indicatorStyle={styles.indicatorStyle}
      style={styles.tabBarStyle}
      renderLabel={renderLabel}
    />
  );

  const renderLabel = ({route, focused, color}) => (
    <View style={styles.labelWrapper}>
      <Text style={focused ? styles.activeLabel : styles.inactiveLabel}>
        {route.title}
      </Text>
    </View>
  );

  return (
    <View style={styles.container}>
      <Container>
        <View style={styles.mainWrapper}>
          <View style={styles.logoWrapper}>
            <LogoBlack />
          </View>
          <TabView
            navigationState={{index, routes}}
            renderScene={renderScene}
            onIndexChange={setIndex}
            initialLayout={initialLayout}
            renderTabBar={renderTabBar}
          />
          {!keyboard.keyboardShown && (
            <View>
              <SocialLogin />
              {index === 1 && (
                <View style={styles.privacyWrapper}>
                  <Text style={styles.noticeText}>
                    {I18n.t('signUpPolicyNoti')}
                  </Text>
                  <View style={styles.btnRowWrapper}>
                    <TextButton
                      onPress={() => onGoToTerms()}
                      label={I18n.t('termOfUse')}
                      labelStyle={styles.privacyButton}
                    />
                    <Text style={styles.noticeText}>{I18n.t('and')}</Text>
                    <TextButton
                      onPress={() => onGoToPrivacy()}
                      label={I18n.t('privacyPolicy')}
                      labelStyle={styles.privacyButton}
                    />
                  </View>
                </View>
              )}
            </View>
          )}
        </View>
      </Container>
    </View>
  );
};

export default Index;
