import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import EStyleSheet from 'react-native-extended-stylesheet';

const EmptyComponent = (props) => {
  const containerStyle = props?.containerStyle ? props.containerStyle : {};
  const icon = props?.icon ? props.icon : null;
  const title = props?.title ? props.title : '';
  const titleStyle = props?.titleStyle ? props.titleStyle : {};
  const subTitle = props?.subTitle ? props.subTitle : '';
  const subTitleStyle = props?.subTitleStyle ? props.subTitleStyle : {};

  return (
    <View style={StyleSheet.flatten([customStyles.container, containerStyle])}>
      {icon}
      {title ? (
        <Text style={StyleSheet.flatten([customStyles.title, titleStyle])}>
          {title}
        </Text>
      ) : null}
      {subTitle ? (
        <Text
          style={StyleSheet.flatten([customStyles.subTitle, subTitleStyle])}>
          {subTitle}
        </Text>
      ) : null}
    </View>
  );
};

const customStyles = EStyleSheet.create({
  container: {
    width: '100%',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: 80,
  },
  title: {
    fontFamily: '$font1',
    color: '$black',
    fontSize: 20,
    lineHeight: 28,
    fontWeight: '500',
    textAlign: 'center',
    paddingTop: 24,
  },
  subTitle: {
    fontFamily: '$font1',
    color: '$lightGray',
    fontSize: 14,
    lineHeight: 20,
    fontWeight: '400',
    textAlign: 'center',
    paddingTop: 8,
    paddingHorizontal: 60,
  },
});

export default EmptyComponent;
