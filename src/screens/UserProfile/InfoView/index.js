import React, {useState} from 'react';
import i18n from 'i18n';
import {useNavigation} from '@react-navigation/native';
import {TouchableOpacity, View, Text} from 'react-native';
import {Avatar, Button} from 'react-native-paper';

import styles from './styles';

import {ImageBackground, Colors} from 'components';

import {Message} from 'svg/social';

import {SUCCESS, TYPE_USER} from 'constants';

import {follow, unfollow} from 'services/api/socialApi';

const InfoView = ({profile, statistics}) => {
  const [followed, setFollowed] = useState(false);

  const navigation = useNavigation();

  const _navigateChat = () => {
    navigation.navigate('Chat');
  };

  const _followPress = async () => {
    if (!followed) {
      const res = await follow({
        targetId: profile?.id,
        targetType: TYPE_USER,
      });
      if (res.ok && res.data.status === SUCCESS) {
        setFollowed(true);
      }
    } else {
      const res = await unfollow({
        targetId: profile?.id,
        targetType: TYPE_USER,
      });
      if (res.ok && res.data.status === SUCCESS) {
        setFollowed(false);
      }
    }
  };

  return (
    <ImageBackground
      fluid
      style={styles.viewBg}
      source={
        profile?.avatar
          ? {uri: profile.avatar}
          : require('assets/images/default.png')
      }>
      <View style={styles.overlay} />
      <View style={styles.viewInfo}>
        <View style={styles.avatar}>
          <Avatar.Image
            size={80}
            source={
              profile?.avatar
                ? {uri: profile.avatar}
                : require('assets/images/default.png')
            }
          />
        </View>
        <View style={styles.viewArea}>
          <Text style={styles.textName}>{profile?.fullName}</Text>
          <Text style={styles.textDescription}>
            I’m only a morning person on Christmas morning You are not just a
            Follower. 📚 Bookaholic - ✈️ Travelholic
          </Text>
        </View>
        <View style={styles.actions}>
          <Button
            mode="contained"
            uppercase={false}
            onPress={() => _followPress()}
            style={[styles.followBtn, followed && styles.followedBtn]}>
            {i18n.t(!followed ? 'common.textFollow' : 'common.textFollowed')}
          </Button>
          <TouchableOpacity onPress={_navigateChat} style={styles.touchMess}>
            <Message width={18} heigh={12} color={Colors.$purple} />
          </TouchableOpacity>
        </View>
        <View style={styles.statisticalView}>
          <View style={styles.viewSection}>
            <Text style={styles.textTitle}>{statistics?.followers}</Text>
            <Text>{i18n.t('common.textFollower')}</Text>
          </View>
          <View style={styles.viewSection}>
            <Text style={styles.textTitle}>{statistics?.followings}</Text>
            <Text>{i18n.t('common.textFollowing')}</Text>
          </View>
          <View style={styles.viewSection}>
            <Text style={styles.textTitle}>{statistics?.posts}</Text>
            <Text>{i18n.t('common.textPost')}</Text>
          </View>
        </View>
      </View>
    </ImageBackground>
  );
};

InfoView.defaultProps = {};

InfoView.propTypes = {};

export default InfoView;
