import styles from './styles';
import React from 'react';

import {View, Text, Image, TouchableOpacity, Dimensions} from 'react-native';
import {Avatar} from 'react-native-paper';
import {MapPin, Heart, HorizontalDot, StoreIcon} from 'svg/common';
import {Message} from 'svg/social';
import I18n from 'i18n';
import {ChatIcon} from 'components';
import {FlatList} from 'react-native-gesture-handler';
import {useSelector} from 'react-redux';
import {userSelectors} from 'reducers';

const WIDTH = Dimensions.get('window').width;
const PostView = ({item, disabledLike = false, disabledComment = false}) => {
  const {checkin, heartcount, commentcount, imageUrls} = item;
  const userProfile = useSelector((state) =>
    userSelectors.getUserProfile(state),
  );
  return (
    <View style={styles.containerItem}>
      <View style={styles.firstRowView}>
        <View style={styles.viewHeaderItem}>
          <View style={styles.wrapHeaderItem}>
            <View style={styles.wrapUserInfoItem}>
              <Avatar.Image
                source={
                  item?.userResponseLite?.avatar
                    ? {uri: item?.userResponseLite?.avatar}
                    : require('assets/images/default.png')
                }
                size={32}
              />
              <View style={{paddingLeft: 10}}>
                <Text>{item?.userResponseLite?.fullName}</Text>
                {item?.checkin ? (
                  <View style={styles.subTextCheckin}>
                    <MapPin width={11} height={11} />
                    <Text style={[styles.subText, {fontSize: 11}]}>
                      &nbsp;&nbsp;{checkin}
                    </Text>
                  </View>
                ) : null}
              </View>
            </View>
            {userProfile?.id !== item?.userResponseLite?.id ? (
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
            ) : null}
          </View>
        </View>
        <View style={styles.viewBodyItem}>
          <FlatList
            data={imageUrls || []}
            horizontal
            pagingEnabled
            showsVerticalScrollIndicator={false}
            showsHorizontalScrollIndicator={false}
            keyExtractor={(item, index) => index}
            renderItem={({item, index}) => {
              return (
                <Image
                  style={{width: WIDTH, height: WIDTH}}
                  source={
                    item ? {uri: item} : require('assets/images/default.png')
                  }
                />
              );
            }}
          />

          {item?.storeResponseLite ? (
            <View style={styles.storeName}>
              <StoreIcon />
              <Text style={{paddingLeft: 7, color: 'white', fontSize: 13}}>
                {item?.storeResponseLite?.name}
              </Text>
            </View>
          ) : null}
        </View>
        <View style={styles.viewFooterItem}>
          <View style={{flex: 3, flexDirection: 'row'}}>
            <View style={{flex: 1, flexDirection: 'row', alignItems: 'center'}}>
              <TouchableOpacity
                disabled={disabledLike}
                style={{flexDirection: 'row', alignItems: 'center'}}>
                <Heart width={24} height={24} />
                <Text style={styles.subText}>
                  &nbsp;&nbsp;{heartcount || 0}
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                disabled={disabledComment}
                style={{
                  paddingLeft: 10,
                  flexDirection: 'row',
                  alignItems: 'center',
                }}>
                <Message width={24} height={24} />
                <Text style={styles.subText}>
                  &nbsp;&nbsp;{commentcount || 0}
                </Text>
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

export default PostView;
