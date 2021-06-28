import React from 'react';
import PropTypes from 'prop-types';
import i18n from 'i18n';
import styles from './styles';
import {Text, TouchableOpacity, View} from 'react-native';
import {Avatar} from 'react-native-paper';
import {ContainerView} from '../../../../components';
import FollowButton from '../../components/FollowButton';
import {MapPin} from '../../../../svg/common';

const NewFeedItemHeader = ({
  avatar,
  title,
  subTitle,
  isAdvertising,
  onAvatarPress,
  targetId,
  targetType,
}) => {
  return (
    <ContainerView style={styles.headerContainer}>
      <TouchableOpacity
        onPress={onAvatarPress}
        style={[styles.headerWrap]}>
        <Avatar.Image
          size={32}
          source={avatar ? {uri: avatar} : require('assets/images/profile.png')}
        />
        <View style={styles.titleWrapper}>
          <Text numberOfLines={1} style={styles.textTitle}>
            {title}
          </Text>
          {subTitle && (
            <View style={styles.subTitleWrapper}>
              <View style={styles.locationIcon}>
                <MapPin />
              </View>
              <Text numberOfLines={1} style={styles.textSubTitle}>
                {subTitle}
              </Text>
            </View>
          )}
          {isAdvertising && (
            <Text style={styles.isAdvertising}>
              {i18n.t('common.textAdvertisement')}
            </Text>
          )}
        </View>
      </TouchableOpacity>
      <FollowButton targetId={targetId} targetType={targetType} />
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
  targetType: PropTypes.string.isRequired,
  avatar: PropTypes.string,
  title: PropTypes.string.isRequired,
  subTitle: PropTypes.string,
  isAdvertising: PropTypes.bool,
  onAvatarPress: PropTypes.func,
};

export default NewFeedItemHeader;
