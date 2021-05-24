/* eslint-disable react-hooks/exhaustive-deps */
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
  countLike,
} from 'services/api/socialApi';

import FeedSlide from './slide';

import {SUCCESS} from 'constants';

import {currencyFormat} from 'utils/currency';

import {TYPE_STORE, TYPE_USER} from 'constants';

import {Store} from 'svg/common';

const VerticalFeedItem = ({newFeedItem, targetType, isProfile}) => {
  if (isEmpty(newFeedItem)) {
    return null;
  }

  const navigation = useNavigation();
  const [followed, setFollowed] = useState(false);
  const [liked, setLiked] = useState(false);
  const [countsLike, setCountLike] = useState(undefined);

  const disCountPer = newFeedItem?.priceSale / newFeedItem?.price;
  const productOwnerResponse = newFeedItem?.productOwnerResponse;
  const userResponseLite = isProfile ? newFeedItem?.userResponseLite : null;
  const storeResponseLite = isProfile ? newFeedItem?.storeResponseLite : null;

  const urlImage = userResponseLite
    ? userResponseLite.avatar
    : productOwnerResponse.logoUrl;
  const name = userResponseLite
    ? userResponseLite?.fullName
    : productOwnerResponse?.name;

  useEffect(() => {
    constLike();
  }, []);
  const constLike = async () => {
    try {
      const res = await countLike({
        targetId: newFeedItem?.id,
        targetType: targetType,
      });
      if (res.ok && res.data.status === SUCCESS) {
        setCountLike(res.data.data);
      }
    } catch (error) {
      console.log(error);
    }
  };
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
        customFieldId1: newFeedItem?.categoryId,
        customFieldId2: newFeedItem?.storeId,
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
  const _showProfile = () => {
    navigation.navigate('UserProfile');
  };
  const navigateStore = () => {
    navigation.navigate('Stores');
  };
  return (
    <View style={styles.container}>
      <ContainerView style={styles.headerContainer}>
        <TouchableOpacity
          onPress={_showProfile}
          style={[styles.headerWrap, isProfile && styles.alignCenter]}>
          <Avatar.Image
            size={32}
            source={{
              uri: urlImage,
            }}
          />
          <View>
            <Text numberOfLines={1} style={styles.textTitle}>
              {name}
            </Text>
            {newFeedItem?.isAdvertising && (
              <Text style={styles.isAdvertising}>
                {i18n.t('common.textAdvertisement')}
              </Text>
            )}
          </View>
        </TouchableOpacity>
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
        <FeedSlide
          targetType={targetType}
          images={newFeedItem?.imageUrls || []}
        />
        {disCountPer !== 1 && targetType === TYPE_STORE && (
          <View style={styles.discountPercent}>
            <Text style={styles.textDiscount}>{`Giảm ${Math.floor(
              disCountPer * 100,
            )} %`}</Text>
          </View>
        )}
        {storeResponseLite && targetType === TYPE_USER && (
          <TouchableOpacity onPress={navigateStore} style={styles.viewTagStore}>
            <Store />
            <Text style={styles.textTagName}>Diesel Clothing Store</Text>
          </TouchableOpacity>
        )}
      </View>
      {targetType === TYPE_STORE ? (
        <ContainerView fluid style={styles.description}>
          <View style={styles.wrapInfo}>
            <Text style={styles.productName}>{newFeedItem?.name}</Text>
            <Text style={styles.price}>
              {currencyFormat(newFeedItem?.priceSale || 0, 'đ')}
            </Text>
          </View>
          <TouchableOpacity style={styles.touchBuyNow}>
            <Text style={styles.touchTextByNow}>Mua ngay</Text>
          </TouchableOpacity>
        </ContainerView>
      ) : null}
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
          {countsLike && (
            <Text style={[{color: Colors.$icon}, styles.textLike]}>
              {countsLike}
            </Text>
          )}
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
