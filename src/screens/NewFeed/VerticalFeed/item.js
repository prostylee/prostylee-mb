/* eslint-disable react-hooks/rules-of-hooks */
import React, {useState} from 'react';
import {View, Text, TouchableOpacity} from 'react-native';
import styles from './styles';
import i18n from 'i18n';
import {isEmpty} from 'lodash';

import {Avatar} from 'react-native-paper';

import {ContainerView, Colors} from 'components';

import {Heart, Message, More} from 'svg/social';

import {follow, unfollow, like, unlike} from 'services/api/socialApi';

import FeedSlide from './slide';

const STORE = 'STORE';
const VerticalFeedItem = ({newFeedItem}) => {
  if (isEmpty(newFeedItem)) {
    return null;
  }

  const [followed, setFollowed] = useState(false);
  const [liked, setLiked] = useState(false);

  const disCountPer = newFeedItem?.priceSale / newFeedItem?.price;

  const _followPress = async () => {
    if (!followed) {
      const res = await follow({
        targetId: newFeedItem?.id,
        targetType: STORE,
      });
      if (res.ok) {
        setFollowed(true);
      }
    } else {
      const res = await unfollow({
        targetId: newFeedItem?.id,
        targetType: STORE,
      });
      if (res.ok) {
        setFollowed(false);
      }
    }
  };
  const _likePress = async () => {
    if (!liked) {
      const res = await like({
        targetId: newFeedItem?.id,
        targetType: STORE,
      });
      if (res.ok) {
        setLiked(true);
      }
    } else {
      const res = await unlike({
        targetId: newFeedItem?.id,
        targetType: STORE,
      });
      if (res.ok) {
        setLiked(false);
      }
    }
  };
  return (
    <View style={styles.container}>
      <ContainerView style={styles.headerContainer}>
        <View style={styles.headerWrap}>
          <Avatar.Image
            size={32}
            source={{
              uri:
                'https://www.iphonehacks.com/wp-content/uploads/2020/07/ios-14-home-screen-widgets-alt.png',
            }}
          />
          <Text numberOfLines={1} style={styles.textTitle}>
            {newFeedItem?.name}
          </Text>
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
          <Text style={styles.productName}>Áo khoác blazer Nữ tay dài</Text>
          <Text style={styles.price}>1000000 đ</Text>
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
            <Heart color={liked ? Colors.$purple : Colors.$icon} />
          </TouchableOpacity>
          <TouchableOpacity style={styles.touchMes}>
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
