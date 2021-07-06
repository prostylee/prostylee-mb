import React from 'react';
import {TouchableOpacity} from 'react-native';
import {ChevronLeft} from 'svg/common';
import styles from './styles';
import {Colors} from 'components';
import {useDispatch} from 'react-redux';

import {storeProfileActions} from 'redux/reducers';
const HeaderLeft = ({opacity, isAnimated = false, navigation}) => {
  const dispatch = useDispatch();
  const onBackPress = () => {
    dispatch(storeProfileActions.clearStoreProfileFilterState());
    navigation.goBack();
  };
  return isAnimated ? (
    <TouchableOpacity
      style={[
        styles.headerLeftContainer,
        {
          paddingLeft: 16,
          zIndex: 99999,
        },
      ]}
      onPress={onBackPress}>
      <ChevronLeft color={Colors?.['$icon']} strokeWidth={2} />
    </TouchableOpacity>
  ) : (
    <TouchableOpacity
      style={[
        styles.headerLeftContainer,
        {
          paddingTop: 3,
          justifyContent: 'center',
          alignItems: 'center',
        },
      ]}
      onPress={onBackPress}>
      <ChevronLeft color="#fff" strokeWidth={2} />
    </TouchableOpacity>
  );
};
export default HeaderLeft;
