import React from 'react';
import {View, TouchableOpacity, StyleSheet, Text} from 'react-native';
import {useSelector} from 'react-redux';
import {Bag as Bags} from 'svg/common';
import {getListCartSelector} from 'redux/selectors/cart';
const Bag = ({
  badgeColor = '#EF2F48',
  badgeTextColor = '#fff',
  navigation,
  color,
}) => {
  const listCart = useSelector((state) => getListCartSelector(state));

  const onNavigateCart = () => {
    navigation.navigate('Cart');
  };
  return (
    <TouchableOpacity style={styles.container} onPress={onNavigateCart}>
      <Bags color={color} />
      {listCart && listCart.length ? (
        <View
          style={[
            styles.badgeContainer,
            {
              backgroundColor: badgeColor,
            },
          ]}>
          <Text
            style={[
              styles.badgeText,
              {
                color: badgeTextColor,
              },
            ]}>
            {listCart.length}
          </Text>
        </View>
      ) : null}
    </TouchableOpacity>
  );
};
export default Bag;
const styles = StyleSheet.create({
  container: {
    position: 'relative',
  },
  badgeContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    width: 14,
    height: 14,
    borderRadius: 7,
    position: 'absolute',
    bottom: -4,
    right: -2,
  },
  badgeText: {
    color: '#fff',
    fontSize: 8,
    textAlign: 'center',
  },
});
