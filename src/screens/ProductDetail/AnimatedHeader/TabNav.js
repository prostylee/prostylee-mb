import React, {useEffect} from 'react';
import {View, Dimensions, TouchableOpacity, Text, Animated} from 'react-native';
import Feather from 'react-native-vector-icons/Feather';
import IconIcons from 'react-native-vector-icons/Ionicons';
import {getStatusBarHeight} from 'react-native-status-bar-height';
import i18n from 'i18n';
import EStyleSheet from 'react-native-extended-stylesheet';
import {useTheme, useNavigation} from '@react-navigation/native';

const {width: WIDTH_HEADER} = Dimensions.get('window');

const TabNav = ({
  opacity,
  scrollToTop,
  scrollToComment,
  scrollToRelated,
  activeTabProps = 'product',
}) => {
  const {colors} = useTheme();
  const navigation = useNavigation();
  const [activeTab, setActiveTab] = React.useState(activeTabProps);

  const tabButtonStyle = (tabName) => {
    if (activeTab === tabName) {
      return [styles.tabButton, styles.tabButtonActive];
    } else {
      return styles.tabButton;
    }
  };

  const tabButtoTextnStyle = (tabName) => {
    if (activeTab === tabName) {
      return [styles.tabButtonText, styles.tabButtonTextActive];
    } else {
      return styles.tabButtonText;
    }
  };
  useEffect(() => {
    if (activeTabProps !== activeTab) {
      setActiveTab(activeTabProps);
    }
  }, [activeTabProps]);
  return (
    <Animated.View
      style={[
        styles.container,
        {
          opacity,
        },
      ]}>
      <TouchableOpacity
        style={tabButtonStyle('product')}
        onPress={() => {
          setActiveTab('product');
          scrollToTop();
        }}>
        <Text style={tabButtoTextnStyle('product')}>
          {i18n.t('productDetail.tabProduct')}
        </Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={tabButtonStyle('rate')}
        onPress={() => {
          setActiveTab('rate');
          scrollToComment();
        }}>
        <Text style={tabButtoTextnStyle('rate')}>
          {i18n.t('productDetail.tabRate')}
        </Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={tabButtonStyle('suggest')}
        onPress={() => {
          setActiveTab('suggest');
          scrollToRelated();
        }}>
        <Text style={tabButtoTextnStyle('suggest')}>
          {i18n.t('productDetail.tabSuggest')}
        </Text>
      </TouchableOpacity>
    </Animated.View>
  );
};

const styles = EStyleSheet.create({
  container: {
    height: 36 + 50 + getStatusBarHeight(),
    paddingTop: 50 + getStatusBarHeight(),
    width: '100%',
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-evenly',
    backgroundColor: '$white',
    paddingHorizontal: 32,
    borderBottomWidth: 1,
    borderBottomColor: '$bgColor',
  },
  tabButton: {
    height: 36,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    borderBottomWidth: 3,
    borderBottomColor: 'transparent',
  },
  tabButtonActive: {
    borderBottomColor: '$purple',
  },
  tabButtonText: {
    fontSize: 14,
    lineHeight: 20,
    color: '$lightGray',
  },
  tabButtonTextActive: {
    color: '$purple',
  },
});

export default TabNav;
