import React, {useRef, useState} from 'react';

import styles from './styles';

import {
  View,
  Text,
  Animated,
  TouchableOpacity,
  ImageBackground,
} from 'react-native';

import {ThemeView, ButtonRounded, Container} from 'components';
import HeaderFeed from './HeaderFeed';
import I18n from 'i18n';
import {useDispatch} from 'react-redux';
import {commonActions} from 'reducers';
import {Auth} from 'aws-amplify';
import {Grid, Full, Setting} from 'svg/common';
import {Message} from 'svg/social';

import {Avatar, ToggleButton} from 'react-native-paper';
import TabViewContainer from './TabView';

const heightShow = 334;
const Index = ({navigation}) => {
  const dispatch = useDispatch();
  const [viewType, setViewType] = useState('grid');
  const [activeTab, setActivedTab] = useState('menu');

  const scrollAnimated = useRef(new Animated.Value(0)).current;

  const onScrollEvent = Animated.event(
    [{nativeEvent: {contentOffset: {y: scrollAnimated}}}],
    {useNativeDriver: false},
  );

  React.useEffect(() => {
    // TODO remove
    Auth.currentAuthenticatedUser()
      .then((user) => {
        console.log('USER ' + JSON.stringify(user));
      })
      .catch((err) => console.log(err));
    dispatch(commonActions.toggleLoading(false));
  }, []);

  return (
    <ThemeView isFullView style={styles.container}>
      <HeaderFeed
        heightShow={heightShow}
        navigation={navigation}
        scrollAnimated={scrollAnimated}
      />
      <Container onScroll={onScrollEvent} scrollEventThrottle={1}>
        <Animated.View
          style={[
            {
              transform: [
                {
                  translateY: scrollAnimated.interpolate({
                    inputRange: [0, 1],
                    outputRange: [0, -1],
                    extrapolate: 'clamp',
                  }),
                },
              ],
            },
            styles.headerProfile,
          ]}>
          <View style={styles.headerFull}>
            <TouchableOpacity style={{paddingRight: 20}}>
              <Message color="#ffffff" />
            </TouchableOpacity>
            <TouchableOpacity onPress={() => navigation.navigate('Setting')}>
              <Setting color="#ffffff" />
            </TouchableOpacity>
          </View>
          <View>
            <ImageBackground
              style={styles.backgroundImageStyle}
              source={{uri: 'https://reactjs.org/logo-og.png'}}>
              <Avatar.Image
                source={{uri: 'https://reactjs.org/logo-og.png'}}
                size={80}
                style={styles.avatarStyle}
              />
              <View
                style={styles.scrollViewStyle}
                contentContainerStyle={{flex: 1}}>
                <View style={{alignItems: 'center'}}>
                  <Text
                    style={{
                      marginTop: 56,
                      fontSize: 20,
                      lineHeight: 28,
                      fontWeight: '500',
                    }}>
                    Alyssa Gardner
                  </Text>
                  <View style={{paddingHorizontal: 16}}>
                    <Text
                      style={{
                        textAlign: 'center',
                        lineHeight: 20,
                        fontSize: 14,
                        color: '#333333',
                      }}>
                      I’m only a morning person on Christmas morning
                      {'\n'}
                      You are not just a Follower.
                      {'\n'}
                      📚 Bookaholic - ✈️ Travelholic
                    </Text>
                  </View>
                  <View style={{paddingTop: 16}}>
                    <ButtonRounded
                      label={I18n.t('mypage.editProfile')}
                      onPress={() => navigation.navigate('SettingMyAccount')}
                    />
                  </View>
                  <View style={styles.followParentView}>
                    <View style={styles.followChildView}>
                      <Text style={styles.valueFollowChild}>1244</Text>
                      <Text style={styles.labelFollowChild}>
                        {I18n.t('mypage.follower')}
                      </Text>
                    </View>
                    <View style={styles.followChildView}>
                      <Text style={styles.valueFollowChild}>275</Text>
                      <Text style={styles.labelFollowChild}>
                        {I18n.t('mypage.following')}
                      </Text>
                    </View>
                    <View style={styles.followChildView}>
                      <Text style={styles.valueFollowChild}>275</Text>
                      <Text style={styles.labelFollowChild}>
                        {I18n.t('mypage.posts')}
                      </Text>
                    </View>
                  </View>
                </View>
              </View>
            </ImageBackground>
          </View>
        </Animated.View>
        <View style={styles.wrapTabView}>
          <TabViewContainer
            scrollAnimated={scrollAnimated}
            viewType={viewType}
            setActivedTab={setActivedTab}
          />
        </View>
      </Container>
      {activeTab === 'menu' && (
        <View style={styles.viewType}>
          <ToggleButton.Row
            value={viewType}
            style={{padding: 9, justifyContent: 'space-around'}}>
            <TouchableOpacity onPress={() => setViewType('grid')}>
              <Grid
                color={viewType == 'grid' ? '#333333' : '#8B9399'}
                fill={viewType == 'grid' ? '#333333' : 'none'}
              />
            </TouchableOpacity>
            <TouchableOpacity onPress={() => setViewType('full')}>
              <Full
                color={viewType == 'full' ? '#333333' : '#8B9399'}
                fill={viewType == 'full' ? '#333333' : 'none'}
              />
            </TouchableOpacity>
          </ToggleButton.Row>
        </View>
      )}
    </ThemeView>
  );
};

export default Index;
