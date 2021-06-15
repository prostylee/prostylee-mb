import styles from './styles';

import React from 'react';
import {View, TouchableOpacity, Text} from 'react-native';

/*Hooks*/
import {useTheme} from '@react-navigation/native';

/*Components*/
import IconIcons from 'react-native-vector-icons/Ionicons';
import Collapsible from 'react-native-collapsible';

/*Translate*/
import i18n from 'i18n';

/*Proptypes*/
import PropTypes from 'prop-types';

const ProductInfo = ({description, brand, productStatus}) => {
  const {colors} = useTheme();

  const [showInfo, setShowInfo] = React.useState(false);

  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={styles.infoTitle}
        onPress={() => setShowInfo(!showInfo)}>
        <View style={styles.infoLeft}>
          <IconIcons
            name="information-circle-outline"
            size={18}
            color={colors['$black']}
          />
          <Text style={styles.infoTitleText}>
            {i18n.t('productDetail.productInfo')}
          </Text>
        </View>
        <IconIcons
          name={showInfo ? 'ios-chevron-down' : 'ios-chevron-up'}
          size={16}
          color={colors['$lightGray']}
        />
      </TouchableOpacity>
      <Collapsible collapsed={showInfo} style={styles.infoContent}>
        <Text style={styles.infoContentText}>{description}</Text>
      </Collapsible>
      {brand && brand.name ? (
        <View style={styles.infoMore}>
          <Text style={styles.infoMoreTitleText}>
            {i18n.t('productDetail.brand')}
          </Text>
          <Text style={styles.infoContentContent}>{brand.name}</Text>
        </View>
      ) : null}
      {productStatus && productStatus.description ? (
        <View style={styles.infoMore}>
          <Text style={styles.infoMoreTitleText}>
            {i18n.t('productDetail.productStatus')}
          </Text>
          <Text style={styles.infoMoreTitleContent}>
            {productStatus.description}
          </Text>
        </View>
      ) : null}
    </View>
  );
};

ProductInfo.defaultProps = {
  description: '',
  brand: {},
  productStatus: {},
};

ProductInfo.PropTypes = {
  description: PropTypes.string,
  brand: PropTypes.object,
  productStatus: PropTypes.object,
};

export default ProductInfo;
