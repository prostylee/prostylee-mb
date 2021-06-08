import styles from './styles';
import React from 'react';
import {View} from 'react-native';
import i18n from 'i18n';

import {ThemeView, Header} from 'components';
import TabSold from './TabSold';

const SoldList = ({navigation, route: {params}}) => {
  const {status} = params;
  console.log("status", status)
  return (
    <ThemeView style={styles.container} isFullView>
      <Header isDefault title={'Sản phẩm'} />
      <View style={styles.wrapContent}>
        <TabSold status={status} />
      </View>
    </ThemeView>
  );
};

SoldList.defaultProps = {};

SoldList.propTypes = {};

export default SoldList;
