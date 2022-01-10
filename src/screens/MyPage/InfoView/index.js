import React from 'react';
import i18n from 'i18n';
import {useNavigation} from '@react-navigation/native';
import {View, Text} from 'react-native';
import {Avatar} from 'react-native-paper';

import styles from './styles';

import {ButtonOutlined} from 'components';
import {useDispatch} from 'react-redux';

const InfoView = ({profile, statistics}) => {
  const dispatch = useDispatch();
  const navigation = useNavigation();

  return (
    <View style={styles.viewInfo}>
      <View style={styles.infoTop}>
        <Avatar.Image
          size={100}
          source={
            profile?.avatar
              ? {uri: profile.avatar}
              : require('assets/images/default.png')
          }
        />
        <View style={styles.statisticalView}>
          <View style={styles.viewSection}>
            <Text style={styles.textTitle}>{statistics?.followers}</Text>
            <Text style={styles.textLabel}>
              {i18n.t('common.textFollower')}
            </Text>
          </View>
          <View style={styles.viewSection}>
            <Text style={styles.textTitle}>{statistics?.followings}</Text>
            <Text style={styles.textLabel}>
              {i18n.t('common.textFollowing')}
            </Text>
          </View>
          <View style={styles.viewSection}>
            <Text style={styles.textTitle}>
              {Number(statistics?.posts) + Number(statistics?.productPosts)}
            </Text>
            <Text style={styles.textLabel}>{i18n.t('common.textPost')}</Text>
          </View>
        </View>
      </View>

      <View style={styles.textDescriptionContainer}>
        <Text style={styles.textName}>{profile?.fullName}</Text>
        {profile?.bio ? (
          <Text style={styles.textDescription}>{profile?.bio}</Text>
        ) : null}
      </View>
      <View style={styles.actions}>
        <ButtonOutlined
          label={i18n.t('mypage.editProfile')}
          style={styles.button}
          labelStyle={styles.buttonLabel}
          onPress={() => navigation.navigate('SettingMyAccount')}
        />
        <ButtonOutlined
          label={i18n.t('mypage.orders')}
          style={styles.button}
          labelStyle={styles.buttonLabel}
          onPress={() =>
            navigation.navigate('Orders', {
              status: 1,
            })
          }
        />
      </View>
    </View>
  );
};

InfoView.defaultProps = {};

InfoView.propTypes = {};

export default InfoView;
