import React from 'react';
import {View, Text, Image, TouchableOpacity} from 'react-native';
import {Avatar} from 'react-native-paper';
import {MapPin, Heart, HorizontalDot, StoreIcon} from 'svg/common';
import {Message} from 'svg/social';
import styles from './styles';
import I18n from 'i18n';
const FullView = ({
  name,
  checkin,
  image,
  isFollowed,
  store,
  heartcount,
  commentcount,
  avatar,
}) => {
  return (
    <View>
      <View style={styles.firstRowView}>
        <View style={{flex: 1, height: 56}}>
          <View style={{flex: 3, flexDirection: 'row'}}>
            <View style={{flex: 1, flexDirection: 'row', alignItems: 'center'}}>
              <Avatar.Image source={{uri: avatar}} size={32} />
              <View style={{paddingLeft: 10}}>
                <Text>{name}</Text>
                {checkin != '' && (
                  <View style={styles.subTextCheckin}>
                    <MapPin width={11} height={11} />
                    <Text style={[styles.subText, {fontSize: 11}]}>
                      {checkin}
                    </Text>
                  </View>
                )}
              </View>
            </View>
            <View style={styles.followView}>
              {isFollowed == 1 ? (
                <Text style={styles.subText}>
                  {I18n.t('mypage.isFollowed')}
                </Text>
              ) : (
                <TouchableOpacity>
                  <Text>{I18n.t('mypage.isNotFollowed')}</Text>
                </TouchableOpacity>
              )}
            </View>
          </View>
        </View>
        <View style={{flex: 2}}>
          <Image style={{width: 375, height: 375}} source={image} />
          <View style={styles.storeName}>
            <StoreIcon />
            <Text style={{paddingLeft: 7, color: 'white', fontSize: 13}}>
              {store}
            </Text>
          </View>
        </View>
        <View style={{flex: 1, height: 48}}>
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
