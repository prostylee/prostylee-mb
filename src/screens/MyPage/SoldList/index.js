import styles from './styles';
import React from 'react';
import {View} from 'react-native';
import i18n from 'i18n';

import {ThemeView, Header} from 'components';
import TabSold from './TabSold';

const SoldList = ({navigation, route: {params}}) => {
  const {status} = params;
  
  return (
    <ThemeView style={styles.container} isFullView>
      <Header isDefault title={i18n.t('mypage.products')} />
      <View style={styles.wrapContent}>
        <TabSold status={status} />
      </View>
    </ThemeView>
  );
};

SoldList.defaultProps = {};

SoldList.propTypes = {};

export default SoldList;
