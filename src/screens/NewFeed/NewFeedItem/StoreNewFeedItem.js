import React from 'react';
import {Text, View} from 'react-native';
import styles from './styles';
import i18n from 'i18n';

import {ContainerView} from 'components';
import PriceLabel from '../components/PriceLabel';
import PriceSaleLabel from '../components/PriceSaleLabel';
import OutlineButton from '../components/OutlineButton';
import NewFeedItemHeader from '../NewFeedItem/NewFeedItemHeader';
import NewFeedItemFooter from '../NewFeedItem/NewFeedItemFooter';
import NewFeedSlider from '../NewFeedItem/NewFeedSlider';
import NewFeedItemBody from './NewFeedItemBody';
import RootNavigator from '../../../navigator/rootNavigator';

const StoreNewFeedItem = ({newFeedItem, targetType}) => {
  const productOwnerResponse = newFeedItem?.newFeedOwnerResponse;
  const urlImage = productOwnerResponse?.logoUrl;
  const name = productOwnerResponse?.name || '';
  const storeId = productOwnerResponse?.id || '';
  const address = productOwnerResponse?.fullAddress || '';

  const navigateStore = () => {
    if (newFeedItem?.storeId) {
      RootNavigator.navigate('StoreProfileMain', {
        storeId: newFeedItem?.storeId,
      });
    } else {
      RootNavigator.navigate('UserProfile', {
        userId: productOwnerResponse?.id,
      });
    }
  };

  const slider = (
    <View style={styles.slideWrap}>
      <NewFeedSlider
        targetType={targetType}
        images={newFeedItem?.imageUrls || []}>
        <PriceSaleLabel
          price={newFeedItem?.price || 0}
          priceSale={newFeedItem?.priceSale || 0}
        />
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
      <OutlineButton label={i18n.t('common.textBuyNow')} onClick={() => {}} />
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
      />
      <NewFeedItemBody slider={slider} bottom={bottom} />
      <NewFeedItemFooter targetType={targetType} newFeedItem={newFeedItem} />
    </View>
  );
};

StoreNewFeedItem.defaultProps = {};

StoreNewFeedItem.propTypes = {};

export default StoreNewFeedItem;
