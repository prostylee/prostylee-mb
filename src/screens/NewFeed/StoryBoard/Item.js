import React from 'react';
import {useNavigation} from '@react-navigation/native';
import {ActivityIndicator} from 'react-native';
import {Image} from 'components';
import {Avatar} from 'react-native-paper';
import {View} from 'react-native';

import styles from './styles';
import {TouchableOpacity} from 'react-native-gesture-handler';

const WIDTH_IMG = 90;
const HEIGHT_IMG = 140;
const TYPE_STORE = 'STORE';

const Item = ({item, style, targetType}) => {
  const navigation = useNavigation();
  const _onPress = () => {
    navigation.navigate('StoryBoard');
  };
  return (
    <View style={[styles.itemContainer, style && style]}>
      <TouchableOpacity
        activeOpacity={0.6}
        onPress={_onPress}
        style={styles.touchImg}>
        <Image
          key={`productOfStore${item.id}`}
          source={
            item.image
              ? {uri: item.image}
              : require('assets/images/default.png')
          }
          resizeMode="cover"
          style={{height: HEIGHT_IMG, width: WIDTH_IMG}}
          PlaceholderContent={<ActivityIndicator />}
        />
        <View style={styles.circleImg}>
          <Avatar.Image
            source={
              item.logoUrl || item.avatar
                ? {uri: targetType === TYPE_STORE ? item.logoUrl : item.avatar}
                : require('assets/images/default.png')
            }
            size={26}
            rounded
          />
        </View>
      </TouchableOpacity>
    </View>
  );
};

export default Item;
