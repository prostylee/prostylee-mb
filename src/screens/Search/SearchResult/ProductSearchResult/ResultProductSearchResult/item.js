/* eslint-disable react-hooks/rules-of-hooks */
import React from 'react';
import {Text, View, TouchableOpacity} from 'react-native';
import styles from './styles';
import {Chip, Divider} from 'react-native-paper';
const FeaturedCategoriesItem = ({item, index, navigation}) => {
  return (
    <View style={styles.wrapItems}>
      <TouchableOpacity
        onPress={() => {
          navigation.navigate('SearchProducts');
        }}>
        <View style={styles.item}>
          <Text style={styles.title}>Áo khoác</Text>
        </View>
      </TouchableOpacity>
      <View style={{paddingLeft: 16, paddingRight: 16}}>
        <Divider />
      </View>
    </View>
  );
};

FeaturedCategoriesItem.defaultProps = {};

FeaturedCategoriesItem.propTypes = {};

export default FeaturedCategoriesItem;
