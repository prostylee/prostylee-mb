import React from 'react';
import PropTypes from 'prop-types';
import i18n from 'i18n';
import styles from './styles';
import {Text, TouchableOpacity, View} from 'react-native';
import {Avatar} from 'react-native-paper';
import {ContainerView, FollowTextButton} from '../../../../components';
import {MapPin} from '../../../../svg/common';

const NewFeedItemHeader = ({
  avatar,
  title,
  subTitle,
  isAdvertising,
  onAvatarPress,
  targetId,
  followStatusOfUserLogin,
}) => {
  return (
    <ContainerView style={styles.headerContainer}>
      <TouchableOpacity onPress={onAvatarPress} style={[styles.headerWrap]}>
        <Avatar.Image
          size={32}
          source={avatar ? {uri: avatar} : require('assets/images/profile.png')}
        />
        <View style={styles.titleWrapper}>
          <Text numberOfLines={1} style={styles.textTitle}>
            {title}
          </Text>
          {subTitle ? (
            <View style={styles.subTitleWrapper}>
              <View style={styles.locationIcon}>
                <MapPin />
              </View>
              <Text numberOfLines={1} style={styles.textSubTitle}>
                {subTitle}
              </Text>
            </View>
          ) : null}
          {isAdvertising ? (
            <Text style={styles.isAdvertising}>
              {i18n.t('common.textAdvertisement')}
            </Text>
          ) : null}
        </View>
      </TouchableOpacity>
      <FollowTextButton
        item={{
          followStatusOfUserLogin: followStatusOfUserLogin,
          id: targetId,
        }}
      />
    </ContainerView>
  );
};

NewFeedItemHeader.defaultProps = {
  title: '',
  isAdvertising: false,
  onAvatarPress: () => {},
};

NewFeedItemHeader.propTypes = {
  targetId: PropTypes.number.isRequired,
  avatar: PropTypes.string,
  subTitle: PropTypes.string,
  title: PropTypes.string.isRequired,
  isAdvertising: PropTypes.bool,
  onAvatarPress: PropTypes.func,
  followStatusOfUserLogin: PropTypes.bool,
};

export default NewFeedItemHeader;
