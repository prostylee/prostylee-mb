import styles from './styles';
import React from 'react';
import i18n from 'i18n';

import {ThemeView} from 'components';
import HeaderFeed from './HeaderFeed';
import SettingItem from './SettingItem';
const Setting = ({navigation}) => {
  return (
    <ThemeView style={styles.container} isFullView>
      <HeaderFeed title={i18n.t('setting.title')}/>
      <SettingItem/>
    </ThemeView>
  );
};

Setting.defaultProps = {};

Setting.propTypes = {};

export default Setting;
