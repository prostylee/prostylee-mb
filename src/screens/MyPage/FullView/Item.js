import styles from './styles';
import React from 'react';

import {View, Text, Image, TouchableOpacity} from 'react-native';
import {Avatar} from 'react-native-paper';
import {MapPin, Heart, HorizontalDot, StoreIcon} from 'svg/common';
import {Message} from 'svg/social';
import I18n from 'i18n';

const FullView = ({item}) => {
  const {
    name,
    checkin,
    image,
    isFollowed,
    store,
    heartcount,
    commentcount,
    avatar,
  } = item;

  return (
    <View style={styles.containerItem}>
      <View style={styles.firstRowView}>
        <View style={styles.viewHeaderItem}>
          <View style={styles.wrapHeaderItem}>
            <View style={styles.wrapUserInfoItem}>
              <Avatar.Image source={{uri: avatar}} size={32} />
              <View style={{paddingLeft: 10}}>
                <Text>{name}</Text>
                {checkin != '' && (
                  <View style={styles.subTextCheckin}>
                    <MapPin width={11} height={11} />
                    <Text style={[styles.subText, {fontSize: 11}]}>
                      &nbsp;&nbsp;{checkin}
                    </Text>
                  </View>
                )}
              </View>
            </View>
            <View style={styles.wrapFollow}>
              {isFollowed ? (
                <Text style={styles.subText}>
                  {I18n.t('mypage.isFollowed')}
                </Text>
              ) : (
                <TouchableOpacity>
                  <Text style={styles.btnFollowText}>
                    {I18n.t('mypage.isNotFollow')}
                  </Text>
                </TouchableOpacity>
              )}
            </View>
          </View>
        </View>
        <View style={styles.viewBodyItem}>
          <Image style={{width: 375, height: 375}} source={{uri: image}} />
          <View style={styles.storeName}>
            <StoreIcon />
            <Text style={{paddingLeft: 7, color: 'white', fontSize: 13}}>
              {store}
            </Text>
          </View>
        </View>
        <View style={styles.viewFooterItem}>
          <View style={{flex: 3, flexDirection: 'row'}}>
            <View style={{flex: 1, flexDirection: 'row', alignItems: 'center'}}>
              <TouchableOpacity
                style={{flexDirection: 'row', alignItems: 'center'}}>
                <Heart width={18} height={18} />
                <Text style={styles.subText}>{heartcount}</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={{
                  paddingLeft: 10,
                  flexDirection: 'row',
                  alignItems: 'center',
                }}>
                <Message width={18} height={18} />
                <Text style={styles.subText}>{commentcount}</Text>
              </TouchableOpacity>
            </View>
            <TouchableOpacity style={styles.horizontalDot}>
              <HorizontalDot />
            </TouchableOpacity>
          </View>
        </View>
      </View>
      <View style={{height: 6}}></View>
    </View>
  );
};

export default FullView;
