import React from 'react';
import {Text, TouchableOpacity, View} from 'react-native';
import i18n from 'i18n';
import styles from './styles';
import NewFeedItemHeader from '../NewFeedItem/NewFeedItemHeader';
import NewFeedItemFooter from '../NewFeedItem/NewFeedItemFooter';
import NewFeedSlider from '../NewFeedItem/NewFeedSlider';
import NewFeedItemBody from './NewFeedItemBody';
import RootNavigator from '../../../navigator/rootNavigator';
import {Store} from '../../../svg/common';
import ReadMore from '@fawazahmed/react-native-read-more/example/src/ReadMore';

const PostNewFeedItem = ({newFeedItem, targetType}) => {
  const ownerResponseLite = newFeedItem?.newFeedOwnerResponse;
  const urlImage = ownerResponseLite?.avatar;
  const name = ownerResponseLite?.fullName || '';
  const userId = ownerResponseLite?.id || '';
  const address = ownerResponseLite?.fullAddress || '';

  const navigateToUserProfile = () => {
    // RootNavigator.navigate('UserProfile', {
    //   userId: newFeedItem?.userResponseLite?.id,
    // });
  };

  const navigateToStore = () => {
    RootNavigator.navigate('StoreProfileMain', {storeId: newFeedItem?.storeId});
  };

  const top = (
    <ReadMore
      numberOfLines={3}
      seeMoreText={i18n.t('common.textSeeMore')}
      seeLessText={i18n.t('common.textSeeLess')}
      ellipsis={'...'}
      seeMoreStyle={styles.seeMoreStyle}
      seeLessStyle={styles.seeLessStyle}
      style={styles.postContentWrapper}>
      {newFeedItem?.description}
    </ReadMore>
  );

  const slider = (
    <View style={styles.slideWrap}>
      <NewFeedSlider
        targetType={targetType}
        images={newFeedItem?.imageUrls || []}>
        {newFeedItem?.storeResponseLite && (
          <TouchableOpacity
            onPress={navigateToStore}
            style={styles.viewTagStore}>
            <Store />
            <Text style={styles.textTagName}>
              {newFeedItem?.storeResponseLite?.name}
            </Text>
          </TouchableOpacity>
        )}
      </NewFeedSlider>
    </View>
  );

  return (
    <View style={styles.container}>
      <NewFeedItemHeader
        targetId={userId}
        subTitle={address}
        title={name}
        avatar={urlImage}
        onAvatarPress={navigateToUserProfile}
        followStatusOfUserLogin={newFeedItem?.followStatusOfUserLogin}
      />
      <NewFeedItemBody slider={slider} top={top} />
      <NewFeedItemFooter targetType={targetType} newFeedItem={newFeedItem} />
    </View>
  );
};

PostNewFeedItem.defaultProps = {};

PostNewFeedItem.propTypes = {};

export default PostNewFeedItem;
