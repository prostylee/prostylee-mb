import styles from './styles';

import React from 'react';
import {View, Dimensions, TouchableOpacity, Animated} from 'react-native';

/*Hooks*/
import {useTheme, useNavigation} from '@react-navigation/native';

/*Components*/
import Feather from 'react-native-vector-icons/Feather';
import IconIcons from 'react-native-vector-icons/Ionicons';
import {Bag} from 'components';
import TabNav from './TabNav';
import i18n from 'i18n';

/*Proptypes*/
import PropTypes from 'prop-types';
import {Menu, IconButton, Divider} from 'react-native-paper';

const {width: WIDTH_HEADER} = Dimensions.get('window');

const AnimatedHeader = ({
  image: productImages,
  heightShow,
  scrollAnimated,
  scrollToTop,
  scrollToComment,
  scrollToRelated,
  activeTabProps = 'product',
  hasMenu = false,
}) => {
  const {colors} = useTheme();
  const navigation = useNavigation();
  const [visible, setVisible] = React.useState(false);
  /*Dimension header*/
  const HEIGHT_HEADER = (WIDTH_HEADER * 4) / 3;

  /*Animated*/
  const headerColor = scrollAnimated.interpolate({
    inputRange: [0, heightShow ? heightShow : HEIGHT_HEADER - 50],
    outputRange: ['transparent', '#fff'],
    extrapolate: 'clamp',
  });

  const opacity = scrollAnimated.interpolate({
    inputRange: [0, heightShow ? heightShow : HEIGHT_HEADER - 50],
    outputRange: [1, 0],
    extrapolate: 'clamp',
  });

  const reverseOpacity = scrollAnimated.interpolate({
    inputRange: [0, heightShow ? heightShow : HEIGHT_HEADER - 50],
    outputRange: [0, 1],
    extrapolate: 'clamp',
  });

  return (
    <Animated.View
      style={[
        styles.container,
        {
          backgroundColor: headerColor,
        },
      ]}>
      <Animated.View
        style={[
          styles.headerTop,
          {
            // backgroundColor: headerColor,
          },
        ]}>
        <TouchableOpacity onPress={navigation.goBack} style={styles.backButton}>
          <IconIcons
            name="chevron-back-outline"
            color={colors['$black']}
            size={24}
          />
        </TouchableOpacity>
        <View style={styles.topCenterImg}>
          <Animated.Image
            source={{uri: productImages[0]}}
            style={[
              styles.centerImgStyle,
              {
                opacity: reverseOpacity,
              },
            ]}
          />
        </View>
        <View style={styles.rightIcons}>
          <Bag navigation={navigation} />
          <TouchableOpacity
            onPress={() => {
              setVisible(!visible);
            }}
            style={styles.ellipsisIcon}>
            <Feather
              name="more-horizontal"
              color={colors['$black']}
              size={24}
            />
          </TouchableOpacity>
        </View>
      </Animated.View>
      <Animated.View
        style={[
          styles.headerTopPlaceholder,
          {
            opacity: opacity,
          },
        ]}>
        <TouchableOpacity onPress={navigation.goBack} style={styles.backButton}>
          <IconIcons
            name="chevron-back-outline"
            color={colors['$white']}
            size={24}
          />
        </TouchableOpacity>
        <View style={styles.topCenterImg}>
          <Animated.Image
            source={{uri: productImages[0]}}
            style={[styles.centerImgStyle, {opacity: 0}]}
          />
        </View>
        <View style={styles.rightIcons}>
          <Bag navigation={navigation} />
          <TouchableOpacity
            onPress={() => {
              setVisible(!visible);
            }}
            style={styles.ellipsisIcon}>
            <Feather
              name="more-horizontal"
              color={colors['$white']}
              size={24}
            />
          </TouchableOpacity>
        </View>
      </Animated.View>
      {hasMenu ? (
        <Menu
          visible={visible}
          onDismiss={() => setVisible(false)}
          anchor={{
            x: WIDTH_HEADER * 0.95,
            y: 50,
          }}
          contentStyle={{borderRadius: 10, padding: 0}}
          style={styles.menuContainer}>
          <Menu.Item
            titleStyle={{fontSize: 13}}
            onPress={() => {}}
            title={i18n.t('orders.markAsSold')}
            titleStyle={{
              fontSize: 13,
              lineHeight: 20,
            }}
            style={styles.topItemContainer}
          />
          <Divider />
          <Menu.Item
            onPress={() => {}}
            title={i18n.t('orders.dropProduct')}
            titleStyle={{
              color: '#ED2727',
              fontSize: 13,
              lineHeight: 20,
            }}
            style={styles.bottomItemContainer}
          />
        </Menu>
      ) : null}

      <TabNav
        opacity={reverseOpacity}
        scrollToTop={scrollToTop}
        scrollToComment={scrollToComment}
        scrollToRelated={scrollToRelated}
        activeTabProps={activeTabProps}
      />
    </Animated.View>
  );
};

AnimatedHeader.defaultProps = {
  activeTabProps: 'product',
};

AnimatedHeader.propTypes = {
  image: PropTypes.array,
  heightShow: PropTypes.number,
  scrollAnimated: PropTypes.object,
  scrollToTop: PropTypes.func,
  scrollToComment: PropTypes.func,
  scrollToRelated: PropTypes.func,
  activeTabProps: PropTypes.string,
};

export default AnimatedHeader;
