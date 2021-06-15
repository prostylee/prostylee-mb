import styles from './styles';

import React from 'react';
import {View} from 'react-native';

/*Hooks*/
import {useDispatch} from 'react-redux';

/*Components*/
import {ButtonRounded, ButtonOutlined, ProductLike} from 'components';

/*Translate*/
import i18n from 'i18n';

/*Proptypes*/
import PropTypes from 'prop-types';

/*Reducers*/
import {cartActions} from 'reducers';

const Footer = ({navigation, productData, choiceSelect}) => {
  const dispatch = useDispatch();

  const onAddToCart = () => {
    const productItem = {
      item: productData,
      quantity: 1,
      options: choiceSelect,
    };
    dispatch(cartActions.addItemToCart(productItem));
  };

  const goToStore = () => {
    navigation.navigate('Stores');
  };

  return (
    <View style={styles.container}>
      <View style={styles.likeButton}>
        <ProductLike likeSize={26} unlikeSize={24} item={productData} />
      </View>
      <View style={{}}>
        <ButtonOutlined
          style={{}}
          contentStyle={{}}
          labelStyle={{}}
          label={i18n.t('productDetail.buttonStore')}
          onPress={goToStore}
        />
      </View>
      <View style={{}}>
        <ButtonRounded
          style={{}}
          contentStyle={{}}
          labelStyle={{}}
          label={i18n.t('productDetail.buttonAddToCart')}
          onPress={onAddToCart}
        />
      </View>
    </View>
  );
};

Footer.defaultProps = {
  productData: {},
  choiceSelect: [],
};

Footer.PropTypes = {
  navigation: PropTypes.object,
  productData: PropTypes.object,
  choiceSelect: PropTypes.array,
};

export default Footer;
