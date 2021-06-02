import styles from './styles';
import React from 'react';
import i18n from 'i18n';
import {View, FlatList, TouchableOpacity} from 'react-native';
import { Divider, Text, List } from 'react-native-paper';
import list from './items';
import {RightArrow} from 'svg/common';
import {useNavigation} from '@react-navigation/native';

const SettingItem = () => {
  const navigation = useNavigation();

  const onNavigateSetting = (screen) => {
    navigation.navigate(screen);
  };

  return (
    list.map((tab, index) => {
      return (
        <View style={styles.itemContainer} key={index}>
          <View style={styles.textViewLabel}>
            <Text style={styles.textLabel}>{tab.title}</Text>
            <View>
              {
                tab.list.map((list, indexList) => {
                  return (
                    <TouchableOpacity
                      key={indexList}
                      onPress={() => onNavigateSetting(list.screen)}
                    >
                      <List.Item
                        style={styles.textItemList}
                        title={list.title}
                        right={props => <RightArrow/>}
                      />
                      {indexList==tab.list.length-1?<></>:<Divider/>}
                    </TouchableOpacity>
                  );
                })
              }
            </View>
          </View>
          <View style={styles.listDividerView}></View>
        </View>
      );
    })
  );
}

export default SettingItem;