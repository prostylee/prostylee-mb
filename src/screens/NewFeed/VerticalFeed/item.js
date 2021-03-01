/* eslint-disable react-hooks/rules-of-hooks */
import React, {useState, useEffect} from 'react';
import {useNavigation} from '@react-navigation/native';
import {View, Text, TouchableOpacity} from 'react-native';
import styles from './styles';
import i18n from 'i18n';
import {isEmpty} from 'lodash';

import {Avatar} from 'react-native-paper';

import {ContainerView, Colors} from 'components';

import {Heart, Message, More} from 'svg/social';
import {HeartSolid} from 'svg/common';

import {
  follow,
  unfollow,
  like,
  unlike,
  // loadListLiked,
} from 'services/api/socialApi';

import FeedSlide from './slide';

import {SUCCESS} from 'constants';

import {currencyFormat} from 'utils/currency';

const VerticalFeedItem = ({newFeedItem, targetType}) => {
  if (isEmpty(newFeedItem)) {
    return null;
  }

  const navigation = useNavigation();
  const [followed, setFollowed] = useState(false);
  const [liked, setLiked] = useState(false);

  const disCountPer = newFeedItem?.priceSale / newFeedItem?.price;
  const productOwnerResponse = newFeedItem?.productOwnerResponse;

  // useEffect(() => {
  //   // checkStatusLike();
  // }, []);

  // const checkStatusLike = async () => {
  //   try {
  //     const res = await loadListLiked(1);
  //     console.log('res', res);
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };
  const _followPress = async () => {
    if (!followed) {
      const res = await follow({
        targetId: newFeedItem?.id,
        targetType,
      });
      if (res.ok && res.data.status === SUCCESS) {
        setFollowed(true);
      }
    } else {
      const res = await unfollow({
        targetId: newFeedItem?.id,
        targetType,
      });
      if (res.ok && res.data.status === SUCCESS) {
        setFollowed(false);
      }
    }
  };
  const _likePress = async () => {
    if (!liked) {
      const res = await like({
        targetId: newFeedItem?.id,
        targetType,
      });
      if (res.ok && res.data.status === SUCCESS) {
        setLiked(true);
      }
    } else {
      const res = await unlike({
        targetId: newFeedItem?.id,
        targetType,
      });
      if (res.ok && res.data.status === SUCCESS) {
        setLiked(false);
      }
    }
  };
  const _navigateChat = () => {
    navigation.navigate('Chat');
  };
  return (
    <View style={styles.container}>
      <ContainerView style={styles.headerContainer}>
        <View style={styles.headerWrap}>
          <Avatar.Image
            size={32}
            source={{
              uri: productOwnerResponse.logoUrl,
            }}
          />
          <View>
            <Text numberOfLines={1} style={styles.textTitle}>
              {productOwnerResponse?.name}
            </Text>
            {newFeedItem?.isAdvertising && (
              <Text style={styles.isAdvertising}>
                {i18n.t('common.textAdvertisement')}
              </Text>
            )}
          </View>
        </View>
        <TouchableOpacity
          onPress={() => _followPress()}
          style={styles.wrapFollow}>
          <Text style={!followed ? styles.textFollow : styles.textFollowed}>
            {!followed
              ? i18n.t('common.textFollow')
              : i18n.t('common.textFollowed')}
          </Text>
        </TouchableOpacity>
      </ContainerView>
      <View style={styles.slideWrap}>
        <FeedSlide images={newFeedItem?.imageUrls || []} />
        {disCountPer !== 1 && (
          <View style={styles.discountPercent}>
            <Text style={styles.textDiscount}>{`Giảm ${Math.floor(
              disCountPer * 100,
            )} %`}</Text>
          </View>
        )}
      </View>
      <ContainerView fluid style={styles.description}>
        <View style={styles.wrapInfo}>
          <Text style={styles.productName}>{newFeedItem.name}</Text>
          <Text style={styles.price}>
            {currencyFormat(newFeedItem.priceSale, 'đ')}
          </Text>
        </View>
        <TouchableOpacity style={styles.touchBuyNow}>
          <Text style={styles.touchTextByNow}>Mua ngay</Text>
        </TouchableOpacity>
      </ContainerView>
      <ContainerView style={styles.socialActionWrap}>
        <View style={styles.postAction}>
          <TouchableOpacity
            onPress={() => _likePress()}
            style={styles.touchHeart}>
            {liked ? (
              <HeartSolid color={Colors.$purple} />
            ) : (
              <Heart color={Colors.$icon} />
            )}
          </TouchableOpacity>
          <TouchableOpacity onPress={_navigateChat} style={styles.touchMes}>
            <Message />
          </TouchableOpacity>
        </View>
        <TouchableOpacity style={styles.touchOption}>
          <More />
        </TouchableOpacity>
      </ContainerView>
    </View>
  );
};

VerticalFeedItem.defaultProps = {};

VerticalFeedItem.propTypes = {};

export default VerticalFeedItem;
