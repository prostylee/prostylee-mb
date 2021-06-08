import styles from './styles';
import React from 'react';
import {View, Text, TouchableOpacity} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {RightIcon} from 'svg/common';

const ListMenu = ({title, menu, style, titleStyle, rowStyle}) => {
  const navigation = useNavigation();
  const renderBody = (item) => {
    return (
      <>
        <View style={styles.wrapInfo}>
          {item.icon && <View style={styles.wrapIcon}>{item.icon}</View>}
          <View style={styles.wrapLabelItem}>
            <Text style={styles.labelItem}>&nbsp;&nbsp;{item.label}</Text>
          </View>
        </View>
        <View style={styles.wrapRight}>
          <RightIcon />
        </View>
      </>
    );
  };

  const onNavigate = (item) => {
    if (typeof item.onPress === 'function') {
      item.onPress();
      return;
    }
    navigation.navigate(item.navigateScreen, item.dataPush);
  };

  return (
    <View style={{...styles.container, style}}>
      {title && (
        <View style={styles.wrapHeader}>
          <Text style={{...styles.labelHeader, titleStyle}}>{title}</Text>
        </View>
      )}
      {menu.length &&
        menu.map((item) => {
          if (item.navigateScreen || item.onPress) {
            return (
              <TouchableOpacity
                style={{...styles.wrapItems, rowStyle}}
                onPress={() => onNavigate(item)}
                key={item.key || item.label}>
                {renderBody(item)}
              </TouchableOpacity>
            );
          }
          return (
            <View
              style={{...styles.wrapItems, rowStyle}}
              key={item.key || item.label}>
              {renderBody(item)}
            </View>
          );
        })}
    </View>
  );
};

ListMenu.defaultProps = {
  menu: [],
};

export default ListMenu;
