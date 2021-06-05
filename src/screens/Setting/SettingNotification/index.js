import React from 'react';
import {View, Text} from 'react-native';
import {Header, ThemeView} from 'components';
import I18n from 'i18n';
import styles from './styles';
import { Switch, Divider } from 'react-native-paper';
import { ScrollView } from 'react-native-gesture-handler';

const SettingNotification = () => {
  return (
    <ThemeView isFullView style={styles.container}>
      <Header title={I18n.t('settingNotification.title')} isDefault/>
      <ScrollView>
        <View style={styles.viewStyle}>
          <View style={{flex: 2}}>
            <Text style={styles.primaryText}>{I18n.t('settingNotification.allowNotification')}</Text>
          </View>
          <View style={{flex: 1}}>
            <Switch/>
          </View>
        </View>

        <View style={styles.viewStyle}>
          <View style={{flex: 2}}>
            <Text style={styles.primaryText}>{I18n.t('settingNotification.discountText')}</Text>
            <Text style={styles.subText}>{I18n.t('settingNotification.discountDescription')}</Text>
          </View>
          <View style={{flex: 1}}>
            <Switch/>
          </View>
        </View>

        <Divider/>

        <View style={[styles.viewStyle, {marginTop: 0}]}>
          <View style={{flex: 2}}>
            <Text style={styles.primaryText}>{I18n.t('settingNotification.socialNetworkNotifications')}</Text>
            <Text style={styles.subText}>{I18n.t('settingNotification.socialNetworkNotificationsDescription')}</Text>
          </View>
          <View style={{flex: 1}}>
            <Switch/>
          </View>
        </View>

        <Divider/>

        <View style={[styles.viewStyle, {marginTop: 0}]}>
          <View style={{flex: 2}}>
            <Text style={styles.primaryText}>{I18n.t('settingNotification.orderTransport')}</Text>
            <Text style={styles.subText}>{I18n.t('settingNotification.orderTransportDescription')}</Text>
          </View>
          <View style={{flex: 1}}>
            <Switch/>
          </View>
        </View>

        <Divider/>

        <View style={[styles.viewStyle, {marginTop: 0}]}>
          <View style={{flex: 2}}>
            <Text style={styles.primaryText}>{I18n.t('settingNotification.stockNotifications')}</Text>
            <Text style={styles.subText}>{I18n.t('settingNotification.stockNotificationsDescription')}</Text>
          </View>
          <View style={{flex: 1}}>
            <Switch/>
          </View>
        </View>
      </ScrollView>
    </ThemeView>
  );
}

export default SettingNotification;