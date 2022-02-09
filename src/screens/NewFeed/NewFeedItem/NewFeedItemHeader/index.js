import React, {useMemo} from 'react';
import PropTypes from 'prop-types';
import i18n from 'i18n';
import styles from './styles';
import {Text, TouchableOpacity, View} from 'react-native';
import {Avatar} from 'react-native-paper';
import {userSelectors, newFeedSelectors} from 'reducers';
import {ContainerView, FollowTextButton} from 'components';
import {MapPin} from 'svg/common';
import {TYPE_STORE} from 'constants';
import {useSelector} from 'react-redux';

const NewFeedItemHeader = ({
  showHeader = true,
  avatar,
  title,
  subTitle,
  isAdvertising,
  onAvatarPress,
  targetId,
  followStatusOfUserLogin,
  targetType = TYPE_STORE,
  allNewFeedsFollowed = [],
  addFollowAction = () => {},
  removeFollowAction = () => {},
}) => {
  const userProfile = useSelector((state) =>
    userSelectors.getUserProfile(state),
  );
  const localFollowedStore = useSelector(
    newFeedSelectors.getLocalFollowedStore,
  );
  const localFollowedUser = useSelector(newFeedSelectors.getLocalFollowedUser);
  let localFollowData = [];
  if (targetType === TYPE_STORE) {
    localFollowData = localFollowedStore;
  } else {
    localFollowData = localFollowedUser;
  }

  const FollowButtonComponent = useMemo(() => {
    return (
      <FollowTextButton
        item={{
          followStatusOfUserLogin: allNewFeedsFollowed?.includes(targetId),
          id: targetId,
        }}
        targetType={targetType}
        addFollowAction={addFollowAction}
        removeFollowAction={removeFollowAction}
      />
    );
  }, [
    targetType,
    addFollowAction,
    removeFollowAction,
    allNewFeedsFollowed,
    localFollowData,
    targetId,
  ]);

  if (!showHeader) {
    return null;
  }
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
      {userProfile?.id !== targetId ? (
        <View
          style={{
            paddingBottom: isAdvertising || Boolean(subTitle) ? 20 : 0,
          }}>
          {FollowButtonComponent}
        </View>
      ) : null}
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
