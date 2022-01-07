import React from 'react';
import {Text, View} from 'react-native';
import styles from './styles';
import i18n from 'i18n';
import isEmpty from 'lodash/isEmpty';
import {useNavigation} from '@react-navigation/native';
import {
  TYPE_STORE,
  USER_POST_TYPE_PRODUCT,
  USER_POST_TYPE_POST,
} from 'constants';

import {ContainerView} from 'components';
import PriceLabel from '../components/PriceLabel';
import PriceSaleLabel from '../components/PriceSaleLabel';
import OutlineButton from '../components/OutlineButton';
import NewFeedItemHeader from '../NewFeedItem/NewFeedItemHeader';
import NewFeedItemFooter from '../NewFeedItem/NewFeedItemFooter';
import NewFeedSlider from '../NewFeedItem/NewFeedSlider';
import NewFeedItemBody from './NewFeedItemBody';
import RootNavigator from '../../../navigator/rootNavigator';
import ReadMore from '@fawazahmed/react-native-read-more';

const StoreNewFeedItem = ({
  newFeedItem,
  targetType,
  allNewFeedsFollowed = [],
  addFollowAction = () => {},
  removeFollowAction = () => {},
}) => {
  const navigation = useNavigation();

  let productOwnerResponse = {};

  if (!isEmpty(newFeedItem?.newFeedOwnerResponse)) {
    productOwnerResponse = newFeedItem?.newFeedOwnerResponse;
  } else if (!isEmpty(newFeedItem?.productOwnerResponse)) {
    productOwnerResponse = newFeedItem?.productOwnerResponse;
  }

  const urlImage = productOwnerResponse?.logoUrl;
  const name = productOwnerResponse?.name || '';
  const storeId = productOwnerResponse?.id || 0;
  const address = productOwnerResponse?.fullAddress || '';
  const postType = newFeedItem?.type || USER_POST_TYPE_PRODUCT;

  const navigateStore = () => {
    if (targetType === TYPE_STORE) {
      RootNavigator.navigate('StoreProfileMain', {
        storeId: productOwnerResponse?.id,
      });
    } else if (productOwnerResponse?.id) {
      RootNavigator.navigate('UserProfile', {
        userId: productOwnerResponse?.id,
      });
    } else {
      // nothing happen
    }
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

  const slider = (
    <View style={styles.slideWrap}>
      <NewFeedSlider
        targetType={targetType}
        images={newFeedItem?.imageUrls || []}>
        {postType === USER_POST_TYPE_PRODUCT ? (
          <PriceSaleLabel
            price={newFeedItem?.price || 0}
            priceSale={newFeedItem?.priceSale || 0}
          />
        ) : null}
      </NewFeedSlider>
    </View>
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
          navigation.navigate('ProductDetail', {id: newFeedItem.id});
        }}
      />
    </ContainerView>
  );

  return (
    <View style={styles.container}>
      <NewFeedItemHeader
        subTitle={address}
        targetId={storeId}
        title={name}
        avatar={urlImage}
        onAvatarPress={navigateStore}
        isAdvertising={newFeedItem?.isAdvertising}
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

StoreNewFeedItem.defaultProps = {};

StoreNewFeedItem.propTypes = {};

export default StoreNewFeedItem;
