import React, {useRef, useEffect, useState} from 'react';
import {
  ScrollView,
  TouchableOpacity as Touch,
  View,
  ActivityIndicator,
} from 'react-native';
import {useDispatch} from 'react-redux';
import {useRoute} from '@react-navigation/native';

import styles from './styles';

import InfoView from './InfoView';
import ProfileTab from './ProfileTab';

import {userActions} from 'reducers';

import {ThemeView, Header, Colors} from 'components';

import {More} from 'svg/social';
import {getProfile, getStatistics} from 'services/api/userApi';

import {PAGE_DEFAULT, LIMIT_DEFAULT, SUCCESS} from 'constants';

const UserProfile = () => {
  const dispatch = useDispatch();
  const scrollRef = useRef();
  const route = useRoute();
  const userId = route?.params?.userId || 1;

  const [loading, setLoading] = useState(true);
  const [profile, setProfile] = useState({});
  const [statistics, setStatistics] = useState({});

  const getUserProfile = async () => {
    setLoading(true);
    try {
      const resProfile = await getProfile(userId);
      const resStatistics = await getStatistics(userId);

      if (
        resProfile.ok &&
        resStatistics.ok &&
        resProfile.data.status === SUCCESS &&
        resStatistics.data.status === SUCCESS
      ) {
        setProfile(resProfile.data.data);
        setStatistics(resStatistics.data.data);
      }
    } catch (e) {
      console.log('error get data', e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getUserProfile();
    dispatch(
      userActions.getUserPost({
        page: PAGE_DEFAULT,
        limit: LIMIT_DEFAULT,
        userId: userId,
        sorts: '-createdAt',
      }),
    );
    dispatch(
      userActions.getProductByUser({
        page: PAGE_DEFAULT,
        limit: LIMIT_DEFAULT,
        userId: userId,
        sorts: '-createdAt&+name',
      }),
    );
  }, [dispatch]);

  const morePress = () => {};

  if (loading) {
    return (
      <View style={[styles.container, styles.mid]}>
        <ActivityIndicator size={'large'} color={Colors['$pink']} />
      </View>
    );
  }

  return (
    <ThemeView style={styles.container} isFullView>
      <Header
        title={profile?.username || ''}
        isDefault
        rightComponent={
          <Touch style={styles.touchRight} onPress={morePress}>
            <More color={Colors.$black} />
          </Touch>
        }
        containerStyle={styles.header}
      />
      <ScrollView
        ref={scrollRef}
        scrollEventThrottle={1}
        showsVerticalScrollIndicator={false}
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.content}>
        <InfoView statistics={statistics} profile={profile} />
        <ProfileTab profile={profile} />
      </ScrollView>
    </ThemeView>
  );
};

UserProfile.defaultProps = {};

UserProfile.propTypes = {};

export default UserProfile;
