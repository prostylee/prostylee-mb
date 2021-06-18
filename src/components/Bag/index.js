import React from 'react';
import {View, TouchableOpacity, StyleSheet, Text} from 'react-native';
import {useSelector, shallowEqual} from 'react-redux';
import {Bag as Bags} from 'svg/common';
import {getListCartSelector} from 'redux/selectors/cart';
import PropTypes from 'prop-types';

const Bag = ({badgeColor, badgeTextColor, navigation, color}) => {
  const listCart = useSelector(
    (state) => getListCartSelector(state),
    () => {},
  );
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

Bag.defaultProps = {
  badgeColor: '#EF2F48',
  badgeTextColor: '#fff',
  navigation: {},
  color: '#8B9399',
};

Bag.propTypes = {
  badgeColor: PropTypes.string.isRequired,
  badgeTextColor: PropTypes.string.isRequired,
  navigation: PropTypes.object.isRequired,
  color: PropTypes.string.isRequired,
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
