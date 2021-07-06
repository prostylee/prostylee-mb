import styles from './styles';

import React, {useEffect} from 'react';
import {TouchableOpacity, Text, Animated} from 'react-native';

/*Translate*/
import i18n from 'i18n';

/*Proptypes*/
import PropTypes from 'prop-types';

const TabNav = ({
  opacity,
  scrollToTop,
  scrollToComment,
  scrollToRelated,
  activeTabProps = 'product',
}) => {
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
        styles.containerTabNav,
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

TabNav.defaultProps = {
  activeTabProps: 'product',
};

TabNav.propTypes = {
  opacity: PropTypes.object,
  scrollToTop: PropTypes.func,
  scrollToComment: PropTypes.func,
  scrollToRelated: PropTypes.func,
  activeTabProps: PropTypes.string,
};

export default TabNav;
