import React, {useEffect} from 'react';
import {Text, View, Dimensions} from 'react-native';

import {Container, TextButton, SocialSignIn} from 'components';
import {TabView, TabBar, SceneMap} from 'react-native-tab-view';
import {useKeyboard, useBackHandler} from '@react-native-community/hooks';
import {useIsFocused} from '@react-navigation/native';

import styles from './styles';
import I18n from 'i18n';

import {LogoBlack} from 'svg/common';

import envConfig from 'config';

import SignInTab from './SignInTab';
import SignUpTab from './SignUpTab';

const initialLayout = {width: Dimensions.get('window').width};

const Index = (props) => {
  //index = 0 --> render signIn screen
  //index = 1 --> render SignUp screen
  // if set index = useState(0) --> render --> index of TabView = 0 --> render signIn screen --> useEffect() --> index = 1,but screen render is signIn => error
  const [index, setIndex] = React.useState(props.route.params?.index);
  const keyboard = useKeyboard();
  const isFocused = useIsFocused();

  useEffect(() => {
    if (isFocused) {
      if (props.route.params?.index !== index) {
        setIndex(props.route.params?.index);
      }
    }
  }, [isFocused]);

  //BackHandler handle
  useBackHandler(() => {
    if (props.route.name === 'SignIn') {
      props.navigation.goBack();
      return true;
    }
  });

  //initial Tabs
  const [routes] = React.useState([
    {key: 'signIn', title: I18n.t('signIn')},
    {key: 'signUp', title: I18n.t('signUp')},
  ]);

  //handle funcs
  const onGoToTerms = () => {
    props.navigation.navigate('SimpleWebView', {
      url: envConfig.termOfUseURL,
      title: I18n.t('termOfUse'),
    });
  };

  const onGoToPrivacy = () => {
    props.navigation.navigate('SimpleWebView', {
      url: envConfig.privacyPolicyURL,
      title: I18n.t('privacyPolicy'),
    });
  };

  const renderScene = SceneMap({
    signIn: SignInTab,
    signUp: SignUpTab,
  });

  const renderTabBar = (tabProps) => (
    <TabBar
      {...tabProps}
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
              <SocialSignIn useWhiteAppleIcon={false} />
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
