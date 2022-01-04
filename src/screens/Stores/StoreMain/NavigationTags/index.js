import React from 'react';
import {View, Text, TouchableOpacity, Image} from 'react-native';
import i18n from 'i18n';
import styles from './style';

const NavigationTags = ({navigation}) => {
  return (
    <View style={styles.container}>
      <View style={styles.tagListContainer}>
        <TouchableOpacity
          style={styles.tagItem}
          onPress={() => navigation.navigate('NearbyStore')}>
          <Image
            source={require('assets/images/store-nearby-shop.png')}
            style={styles.tagItemImage}
            resizeMode="cover"
          />
          <Text style={styles.tagName}>{i18n.t('stores.nearbyStores')}</Text>
          <Text style={styles.tagNameDes}>
            {i18n.t('stores.personalSellDes')}
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.tagItem}
          onPress={() => navigation.navigate('PersonalSalers')}>
          <Image
            source={require('assets/images/store-user-sell.png')}
            style={styles.tagItemImage}
            resizeMode="cover"
          />
          <Text style={styles.tagName}>{i18n.t('stores.personalSell')}</Text>
          <Text style={styles.tagNameDes}>
            {i18n.t('stores.personalSellDes')}
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default NavigationTags;
