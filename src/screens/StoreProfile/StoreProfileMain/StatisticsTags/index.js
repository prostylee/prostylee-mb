import React from 'react';
import {View, Text, TouchableOpacity} from 'react-native';
import {useSelector} from 'react-redux';
import {getStoreStatisticsSelector} from 'redux/selectors/storeProfile';
import AntDesign from 'react-native-vector-icons/AntDesign';
import i18n from 'i18n';
import styles from './style';
import {DashLine} from 'svg/common';

const StatisticsTags = ({navigation}) => {
  const storeStatistics = useSelector((state) =>
    getStoreStatisticsSelector(state),
  );
  return (
    <View style={styles.container}>
      <View style={styles.tagListContainer}>
        <TouchableOpacity
          style={styles.tagItem}
          onPress={() => navigation.navigate('NearbyStore')}>
          <Text style={styles.tagValue}>
            {storeStatistics?.numberOfFollowers || 0}
          </Text>
          <Text style={styles.tagName}>{i18n.t('common.textFollower')}</Text>
        </TouchableOpacity>
        <DashLine />
        <TouchableOpacity
          style={styles.tagItem}
          onPress={() => navigation.navigate('Vouchers')}>
          <View style={styles.ratingValue}>
            <AntDesign name={'star'} size={24} color={'#F9CE3F'} />
            <Text style={[styles.tagValue, styles.paddingLeft4]}>
              {storeStatistics?.rating || 0}
            </Text>
          </View>
          <Text style={styles.tagName}>
            {i18n.t('stores.ratingNum', {count: ''})}
          </Text>
        </TouchableOpacity>
        <DashLine />
        <TouchableOpacity
          style={styles.tagItem}
          onPress={() => navigation.navigate('BestSeller')}>
          <Text style={styles.tagValue}>
            {storeStatistics?.numberOfProductPosts || 0}
          </Text>
          <Text style={styles.tagName}>{i18n.t('product')}</Text>
        </TouchableOpacity>
        <DashLine />
        <TouchableOpacity
          style={styles.tagItem}
          onPress={() => navigation.navigate('PersonalSalers')}>
          <Text style={styles.tagValue}>
            {storeStatistics?.numberOfPosts || 0}
          </Text>
          <Text style={styles.tagName}>{i18n.t('stores.post')}</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default StatisticsTags;
