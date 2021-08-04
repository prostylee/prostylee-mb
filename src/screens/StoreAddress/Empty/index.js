import React from 'react';
import {View, Text} from 'react-native';
import styles from './styles';
import i18n from 'i18n';

const EmptyStore = (props) => {
  const cityList = props.cityList ? props.cityList : [];
  const branchList = props.branchList ? props.branchList : [];
  return (
    <View style={styles.container}>
      <Text style={styles.emptyStoreText}>
        {!cityList?.length
          ? i18n.t('storeAddress.noBranchCity')
          : !branchList?.length
          ? i18n.t('storeAddress.noBranch')
          : ''}
      </Text>
    </View>
  );
};

export default EmptyStore;
