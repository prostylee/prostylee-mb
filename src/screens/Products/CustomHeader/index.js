import React from 'react';
import {StyleSheet, View, Dimensions} from 'react-native';
import {getStatusBarHeight} from 'react-native-status-bar-height';
const {width} = Dimensions.get('window');

const CustomHeader = ({
  leftComponent,
  rightComponent,
  midComponent,
  bottomComponent,
  bottomHeight,
  backgroundColor,
  justBottomComponent = false,
}) => {
  /*Dimension header*/
  const WIDTH_HEADER = width;
  const HEIGHT_HEADER =
    (bottomHeight ? bottomHeight : 0) + 50 + getStatusBarHeight();

  return (
    <View
      style={{
        ...styles.container(WIDTH_HEADER, HEIGHT_HEADER),
        backgroundColor: backgroundColor ? backgroundColor : '#fff',
        borderBottomColor: '#F4F5F5',
        width,
      }}>
      <View
        style={{
          paddingTop: getStatusBarHeight(),
          ...styles.content,
        }}>
        <View style={styles.left}>
          <View>{leftComponent}</View>
        </View>
        <View style={styles.mid(WIDTH_HEADER)}>
          {midComponent ? <View>{midComponent}</View> : null}
        </View>
        <View style={styles.right}>
          {rightComponent ? rightComponent : null}
        </View>
      </View>
      {bottomComponent ? (
        <View style={justBottomComponent ? {overflow: 'hidden'} : null}>
          {bottomComponent}
        </View>
      ) : null}
    </View>
  );
};

const styles = StyleSheet.create({
  container: (WIDTH_HEADER, HEIGHT_HEADER) => ({
    width: WIDTH_HEADER,
    height: HEIGHT_HEADER,
    display: 'flex',
    position: 'absolute',
    borderBottomWidth: 1,
    zIndex: 10,
  }),
  content: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    zIndex: 15,
  },
  left: {
    justifyContent: 'center',
    width: 80,
  },
  mid: (WIDTH_HEADER) => ({
    width: WIDTH_HEADER - 160,
    justifyContent: 'center',
    alignItems: 'center',
  }),
  right: {
    alignItems: 'flex-end',
    width: 80,
  },
});

export default CustomHeader;
