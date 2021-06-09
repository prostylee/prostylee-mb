import styles from './styles';
import React from 'react';
import {useDispatch} from 'react-redux';
import i18n from 'i18n';
import {View, TouchableOpacity} from 'react-native';
import {Divider, Text, List} from 'react-native-paper';
import list from './items';
import {RightArrow} from 'svg/common';
import {useNavigation} from '@react-navigation/native';
import {ButtonOutlined} from 'components';
import {commonActions, userActions} from 'reducers';
import {showMessage} from 'react-native-flash-message';

const SettingItem = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const onNavigateSetting = (screen) => {
    navigation.navigate(screen);
  };

  //funcs
  const onSignOut = async () => {
    await dispatch(commonActions.setInitialRouteName('SignInOptions'));
    await dispatch(userActions.userLogout());
    showMessage({
      message: i18n.t('logOutSuccess'),
      type: 'success',
    });
  };

  return (
    <View style={styles.container}>
      <View style={styles.wrapListMenu}>
        {list.map((tab, index) => {
          return (
            <View style={styles.itemContainer} key={index}>
              <View style={styles.textViewLabel}>
                <Text style={styles.textLabel}>{tab.title}</Text>
                <View>
                  {tab.list.map((list, indexList) => {
                    return (
                      <TouchableOpacity
                        key={indexList}
                        onPress={() => onNavigateSetting(list.screen)}
                        style={{alignContent: 'center'}}>
                        <List.Item
                          style={styles.textItemList}
                          title={list.title}
                          right={(props) => <RightArrow />}
                        />
                        {indexList == tab.list.length - 1 ? <></> : <Divider />}
                      </TouchableOpacity>
                    );
                  })}
                </View>
              </View>
              <View style={styles.listDividerView}></View>
            </View>
          );
        })}
      </View>
      <View style={styles.wrapFooterButton}>
        <ButtonOutlined
          label={i18n.t('logOut')}
          style={styles.buttonOutlinedRed}
          labelStyle={styles.labelBtnOutlineRed}
          onPress={onSignOut}
        />
      </View>
    </View>
  );
};

export default SettingItem;
