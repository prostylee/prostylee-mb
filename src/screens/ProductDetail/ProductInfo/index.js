import React from 'react';
import {View, TouchableOpacity, Text} from 'react-native';
import IconIcons from 'react-native-vector-icons/Ionicons';
import Collapsible from 'react-native-collapsible';
import i18n from 'i18n';
import {useTheme} from '@react-navigation/native';
import styles from './styles';

const ProductInfo = (props) => {
  const {colors} = useTheme();
  const description = props.description ? props.description : '';
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
          name={showInfo ? 'ios-chevron-up' : 'ios-chevron-down'}
          size={16}
          color={colors['$lightGray']}
        />
      </TouchableOpacity>
      <Collapsible collapsed={showInfo} style={styles.infoContent}>
        <Text style={styles.infoContentText}>{description}</Text>
      </Collapsible>
    </View>
  );
};

export default ProductInfo;
