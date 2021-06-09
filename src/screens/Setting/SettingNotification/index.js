import styles from './styles';
import React, {useState} from 'react';
import {View, Text} from 'react-native';
import {Header, ThemeView} from 'components';
import I18n from 'i18n';
import {Switch, Divider} from 'react-native-paper';
import {ScrollView} from 'react-native-gesture-handler';

const SettingNotification = () => {
  const [allowNotification, setAllowNotification] = useState(false);
  const [discountNotification, setDiscountNotification] = useState(false);
  const [socialNetworkNotification, setSocialNetworkNotification] =
    useState(false);
  const [orderNotification, setOrderNotification] = useState(false);
  const [stockNotification, setStockNotification] = useState(false);

  return (
    <ThemeView isFullView style={styles.container}>
      <Header title={I18n.t('settingNotification.title')} isDefault />
      <ScrollView>
        <View style={styles.viewStyle}>
          <View style={styles.wrapLabel}>
            <Text style={styles.primaryText}>
              {I18n.t('settingNotification.allowNotification')}
            </Text>
          </View>
          <View style={styles.wrapSwitch}>
            <Switch
              color="#47B870"
              value={allowNotification}
              onValueChange={() => setAllowNotification(!allowNotification)}
            />
          </View>
        </View>

        <View style={styles.viewStyle}>
          <View style={styles.wrapLabel}>
            <Text style={styles.primaryText}>
              {I18n.t('settingNotification.discountText')}
            </Text>
            <Text style={styles.subText}>
              {I18n.t('settingNotification.discountDescription')}
            </Text>
          </View>
          <View style={styles.wrapSwitch}>
            <Switch
              color="#47B870"
              value={discountNotification}
              onValueChange={() =>
                setDiscountNotification(!discountNotification)
              }
            />
          </View>
        </View>

        <Divider />

        <View style={[styles.viewStyle, {marginTop: 0}]}>
          <View style={styles.wrapLabel}>
            <Text style={styles.primaryText}>
              {I18n.t('settingNotification.socialNetworkNotifications')}
            </Text>
            <Text style={styles.subText}>
              {I18n.t(
                'settingNotification.socialNetworkNotificationsDescription',
              )}
            </Text>
          </View>
          <View style={styles.wrapSwitch}>
            <Switch
              color="#47B870"
              value={socialNetworkNotification}
              onValueChange={() =>
                setSocialNetworkNotification(!socialNetworkNotification)
              }
            />
          </View>
        </View>

        <Divider />

        <View style={[styles.viewStyle, {marginTop: 0}]}>
          <View style={styles.wrapLabel}>
            <Text style={styles.primaryText}>
              {I18n.t('settingNotification.orderTransport')}
            </Text>
            <Text style={styles.subText}>
              {I18n.t('settingNotification.orderTransportDescription')}
            </Text>
          </View>
          <View style={styles.wrapSwitch}>
            <Switch
              color="#47B870"
              value={orderNotification}
              onValueChange={() => setOrderNotification(!orderNotification)}
            />
          </View>
        </View>

        <Divider />

        <View style={[styles.viewStyle, {marginTop: 0}]}>
          <View style={styles.wrapLabel}>
            <Text style={styles.primaryText}>
              {I18n.t('settingNotification.stockNotifications')}
            </Text>
            <Text style={styles.subText}>
              {I18n.t('settingNotification.stockNotificationsDescription')}
            </Text>
          </View>
          <View style={styles.wrapSwitch}>
            <Switch
              color="#47B870"
              value={stockNotification}
              onValueChange={() => setStockNotification(!stockNotification)}
            />
          </View>
        </View>
      </ScrollView>
    </ThemeView>
  );
};

export default SettingNotification;
