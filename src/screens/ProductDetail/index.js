import React from 'react';
import {View, Text, Animated, ActivityIndicator} from 'react-native';
import {Container} from 'components';
import {getStatusBarHeight} from 'react-native-status-bar-height';
import {hasNotch} from 'react-native-device-info';
import {useTheme, useRoute, useNavigation} from '@react-navigation/native';
import * as CommonIcon from 'svg/common';
import isEmpty from 'lodash/isEmpty';
import Carousel from 'react-native-snap-carousel';
import AnimatedHeader from './AnimatedHeader';
import {Storage, Auth} from 'aws-amplify';
import styles from './styles';
import i18n from 'i18n';
import {useBackHandler} from '@react-native-community/hooks';
import {commonActions, productActions, productSelectors} from 'reducers';
import {useDispatch, useSelector} from 'react-redux';
import {priceSalePercent} from 'utils/currency';
import ProductTitle from './ProductTitle';
import ProductChoice from './ProductChoice';
import ProductInfo from './ProductInfo';
import ProductLocation from './ProductLocation';
import ProductRating from './ProductRating';
import ProductSimilar from './ProductSimilar';
import Footer from './Footer';

import {dim} from 'utils/common';

const WIDTH = dim.width;

const ProductDetail = (props) => {
  const dispatch = useDispatch();
  //route
  const route = useRoute();
  const navigation = useNavigation();
  const {colors} = useTheme();

  const imagesRef = React.useRef();
  const scrollViewRef = React.useRef();
  const notchHeight = getStatusBarHeight() + (hasNotch() ? 34 : 0);
  const [currentImage, setCurrentImage] = React.useState(1);
  const [choiceSelect, setChoiceSelect] = React.useState([]);

  /*Animated*/
  const HEIGHT_HEADER = (WIDTH * 4) / 3 + getStatusBarHeight();
  const scrollAnimated = React.useRef(new Animated.Value(0)).current;

  const onScrollEvent = Animated.event(
    [{nativeEvent: {contentOffset: {y: scrollAnimated}}}],
    {useNativeDriver: false},
  );
  const opacity = scrollAnimated.interpolate({
    inputRange: [0, HEIGHT_HEADER],
    outputRange: [1, 0],
    extrapolate: 'clamp',
  });

  const productId = route?.params?.id || 0;

  React.useEffect(() => {
    dispatch(productActions.getProductById({id: productId}));
    dispatch(productActions.getProductComments({id: productId}));
    dispatch(productActions.getProductRelated({id: productId}));
  }, []);

  const productData = useSelector((state) =>
    productSelectors.getProductDetail(state),
  );
  const productDataLoading = useSelector((state) =>
    productSelectors.getProductDetailLoading(state),
  );
  const productComments = useSelector((state) =>
    productSelectors.getProductComments(state),
  );
  const productRelated = useSelector((state) =>
    productSelectors.getProductRelated(state),
  );

  React.useEffect(() => {
    if (productDataLoading) {
      dispatch(commonActions.toggleLoading(true));
    } else {
      dispatch(commonActions.toggleLoading(false));
    }
  }, [productDataLoading]);

  const productImage =
    productData?.imageUrls && productData?.imageUrls?.length
      ? productData.imageUrls
      : [];

  //BackHandler handle
  useBackHandler(() => {
    return true;
  });

  const scrollToTop = () => {
    scrollViewRef.current?.scrollTo({y: 0, animated: true});
  };
  const scrollToComment = () => {
    scrollViewRef.current?.scrollToEnd({animated: true});
  };
  const scrollToRelated = () => {
    scrollViewRef.current?.scrollToEnd({animated: true});
  };

  const selectRelatedProduct = (id) => {
    setCurrentImage(1);
    setChoiceSelect([]);
    dispatch(productActions.getProductById({id: id}));
    scrollToTop();
  };

  const ProductChoiceMemo = React.useMemo(() => {
    return (
      <ProductChoice
        choiceList={productData.productAttributeOptionResponse}
        setChoiceSelect={setChoiceSelect}
        choiceSelect={choiceSelect}
      />
    );
  }, [productData, choiceSelect]);

  const renderImageItem = ({item, index}) => {
    return (
      <Animated.Image
        style={styles.imageItem}
        source={{original: item}}
        resizeMode={'cover'}
      />
    );
  };
  const discount = productData
    ? priceSalePercent(productData?.price, productData?.priceSale)
    : 0;

  return (
    <View style={styles.container}>
      <AnimatedHeader
        scrollAnimated={scrollAnimated}
        image={productImage}
        scrollToTop={scrollToTop}
        scrollToComment={scrollToComment}
        scrollToRelated={scrollToRelated}
        discount={priceSalePercent(productData?.price, productData?.priceSale)}
      />
      <Container
        style={styles.mainContent}
        scrollEventThrottle={16}
        scrollViewRef={scrollViewRef}
        onScroll={onScrollEvent}>
        <Animated.View
          style={[
            styles.imageList,
            {
              opacity: opacity,
            },
          ]}>
          <Carousel
            ref={imagesRef}
            data={productImage}
            activeSlideAlignment={'start'}
            renderItem={renderImageItem}
            sliderWidth={WIDTH * productImage.length}
            itemWidth={WIDTH}
            onSnapToItem={(index) => setCurrentImage(index + 1)}
          />
          <View style={styles.imageCount}>
            <Text
              style={
                styles.imageCountText
              }>{`${currentImage}/${productImage.length}`}</Text>
          </View>
          {discount ? (
            <View style={styles.discount}>
              <Text style={styles.discountText}>{`${i18n.t(
                'productDetail.reduce',
              )} -${discount}%`}</Text>
            </View>
          ) : null}
        </Animated.View>
        <ProductTitle
          name={productData?.name}
          price={productData?.price}
          priceOriginal={productData?.priceSale}
          rateValue={productData?.productStatisticResponse.resultOfRating}
          numberOfRate={productData?.productStatisticResponse.numberOfReview}
        />
        <View style={styles.lineHr} />
        {ProductChoiceMemo}
        <View style={styles.lineHr} />
        <ProductInfo description={productData?.description} />
        {productData?.storeId ? (
          <>
            <View style={styles.lineHrBig} />
            <ProductLocation
              info={productData?.productOwnerResponse}
              location={productData?.location}
            />
          </>
        ) : null}
        <View style={styles.lineHrBig} />
        <ProductRating data={productComments} />
        <View style={styles.lineHrBig} />
        <ProductSimilar
          data={productRelated.content || []}
          onSelect={selectRelatedProduct}
        />
      </Container>
      <Footer isLike={productData?.likeStatusOfUserLogin || false} />
    </View>
  );
};

export default ProductDetail;
