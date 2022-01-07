import React from 'react';
import {Text, TouchableOpacity, View} from 'react-native';
import i18n from 'i18n';
import styles from './styles';
import isEmpty from 'lodash/isEmpty';
import {USER_POST_TYPE_PRODUCT, USER_POST_TYPE_POST} from 'constants';
import NewFeedItemHeader from '../NewFeedItem/NewFeedItemHeader';
import NewFeedItemFooter from '../NewFeedItem/NewFeedItemFooter';
import NewFeedSlider from '../NewFeedItem/NewFeedSlider';
import NewFeedItemBody from './NewFeedItemBody';
import {userSelectors} from 'reducers';
import {useSelector} from 'react-redux';
import RootNavigator from '../../../navigator/rootNavigator';
import {Store} from '../../../svg/common';
import ReadMore from '@fawazahmed/react-native-read-more';
import {ContainerView} from 'components';
import PriceLabel from '../components/PriceLabel';
import OutlineButton from '../components/OutlineButton';
import {tabsSetting} from 'config/navigator';

const PostNewFeedItem = ({
  newFeedItem,
  targetType,
  allNewFeedsFollowed = [],
  addFollowAction = () => {},
  removeFollowAction = () => {},
}) => {
  const userProfile = useSelector((state) =>
    userSelectors.getUserProfile(state),
  );

  let ownerResponseLite = {};
  let urlImage = '';
  let name = '';
  let userId = 0;
  let address = '';

  if (!isEmpty(newFeedItem?.newFeedOwnerResponse)) {
    ownerResponseLite = newFeedItem?.newFeedOwnerResponse;
    urlImage = ownerResponseLite?.logoUrl || '';
    name = ownerResponseLite?.name || '';
    userId = ownerResponseLite?.id || 0;
    address = ownerResponseLite?.fullAddress || '';
  } else if (!isEmpty(newFeedItem?.userResponseLite)) {
    ownerResponseLite = newFeedItem?.userResponseLite;
    urlImage = ownerResponseLite?.avatar || '';
    name = ownerResponseLite?.fullName || '';
    userId = ownerResponseLite?.id || 0;
  }

  const postType = newFeedItem?.type || USER_POST_TYPE_POST;

  const navigateToUserProfile = () => {
    const {tabsNavigator} = tabsSetting;
    if (userProfile?.id == newFeedItem?.newFeedOwnerResponse?.id) {
      RootNavigator.navigate(tabsNavigator[4].name);
      return;
    }
    RootNavigator.navigate('UserProfile', {
      userId: newFeedItem?.newFeedOwnerResponse?.id,
    });
  };

  const navigateToStore = () => {
    RootNavigator.navigate('StoreProfileMain', {
      storeId: newFeedItem?.storeId || newFeedItem?.storeAdsId,
    });
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
      {newFeedItem?.content || newFeedItem?.description}
    </ReadMore>
  );
  const bottom = (
    <ContainerView fluid style={styles.description}>
      <View style={styles.wrapInfo}>
        <Text style={styles.productName}>
          {newFeedItem?.name || newFeedItem?.content}
        </Text>
        <PriceLabel
          price={newFeedItem?.price}
          priceSale={newFeedItem?.priceSale}
        />
      </View>
      <OutlineButton
        label={i18n.t('common.textBuyNow')}
        onClick={() => {
          RootNavigator.navigate('ProductDetail', {id: newFeedItem.id});
        }}
      />
    </ContainerView>
  );

  const slider = (
    <View style={styles.slideWrap}>
      <NewFeedSlider
        targetType={targetType}
        images={newFeedItem?.imageUrls || []}>
        {newFeedItem?.storeResponseLite || newFeedItem?.storeAdsResponseLite ? (
          <TouchableOpacity
            onPress={navigateToStore}
            style={styles.viewTagStore}>
            <Store />
            <Text style={styles.textTagName}>
              {newFeedItem?.storeResponseLite?.name ||
                newFeedItem?.storeAdsResponseLite?.name}
            </Text>
          </TouchableOpacity>
        ) : null}
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
        targetType={targetType}
        allNewFeedsFollowed={allNewFeedsFollowed}
        addFollowAction={addFollowAction}
        removeFollowAction={removeFollowAction}
      />
      <NewFeedItemBody
        slider={slider}
        top={postType === USER_POST_TYPE_POST ? top : null}
        bottom={postType === USER_POST_TYPE_PRODUCT ? bottom : null}
      />
      <NewFeedItemFooter targetType={targetType} newFeedItem={newFeedItem} />
    </View>
  );
};

PostNewFeedItem.defaultProps = {};

PostNewFeedItem.propTypes = {};

export default PostNewFeedItem;
