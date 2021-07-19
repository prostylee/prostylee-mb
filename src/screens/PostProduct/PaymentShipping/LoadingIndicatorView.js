import React from 'react';
import {Text} from 'react-native';
import {ActivityIndicator, View} from 'react-native';
import i18n from 'i18n';
import styles from './styles';
const LoadingModal = () => {
  return (
    <View style={styles.loadingContainer}>
      <ActivityIndicator color="#fff" size="large" />
      <Text style={styles.loadingText}>{i18n.t('addProduct.inprogress')}</Text>
    </View>
  );
};
export default LoadingModal;
