import React from 'react';
import {
  View,
  Text,
  Animated,
  ActivityIndicator,
  Dimensions,
} from 'react-native';
import {Container} from 'components';
import {ProductDetailLoading} from 'components/Loading/contentLoader';
import {getStatusBarHeight} from 'react-native-status-bar-height';
import {hasNotch} from 'react-native-device-info';
import {useTheme, useRoute} from '@react-navigation/native';
import Carousel from 'react-native-snap-carousel';
import AnimatedHeader from './AnimatedHeader';
import styles from './styles';
import i18n from 'i18n';
import {useBackHandler} from '@react-native-community/hooks';
import {productActions, productSelectors} from 'reducers';
import {useDispatch, useSelector} from 'react-redux';
import {priceSalePercent} from 'utils/currency';
import ProductTitle from './ProductTitle';
import ProductChoice from './ProductChoice';
import ProductInfo from './ProductInfo';
import ProductLocation from './ProductLocation';
import ProductRating from './ProductRating';
import ProductSimilar from './ProductSimilar';
import ProductCoordinated from './ProductCoordinated';
import Footer from './Footer';

import {dim} from 'utils/common';
import {debounce} from 'lodash-es';
const SCREEN_HEIGHT = Dimensions.get('window').height;

const WIDTH = dim.width;

const ProductDetail = (props) => {
  const dispatch = useDispatch();
  //route
  const route = useRoute();
  const {colors} = useTheme();

  const imagesRef = React.useRef();
  const scrollViewRef = React.useRef();
  const ratingRef = React.useRef();
  const relatedRef = React.useRef();

  const notchHeight = getStatusBarHeight() + (hasNotch() ? 34 : 0);
  const [currentImage, setCurrentImage] = React.useState(1);
  const [choiceSelect, setChoiceSelect] = React.useState([]);
  const [activeTab, setActiveTab] = React.useState('product');
  const [ratingVerticalOffset, setRatingVerticalOffset] = React.useState(0);
  const [relatedVerticalOffset, setRelatedVerticalOffset] = React.useState(0);
  const [ratingPos, setRatingPos] = React.useState(0);
  const [suggestPos, setSuggestPos] = React.useState(0);

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

  const productId = route?.params?.id || 232;

  React.useEffect(() => {
    dispatch(productActions.getProductById({id: productId}));
    dispatch(productActions.getProductComments({id: productId}));
    dispatch(productActions.getProductRelated({id: productId}));
  }, []);

  React.useEffect(() => {
    if (productData && productData.storeId && productData.categoryId) {
      dispatch(
        productActions.getProductCoordinated({
          storeId: productData.storeId,
          categoryId: productData.categoryId,
        }),
      );
    }
  }, [productData]);

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
  const productCoordinated = useSelector((state) =>
    productSelectors.getProductCoordinated(state),
  );

  // React.useEffect(() => {
  //   if (productDataLoading) {
  //     dispatch(commonActions.toggleLoading(true));
  //   } else {
  //     dispatch(commonActions.toggleLoading(false));
  //   }
  // }, [productDataLoading]);

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
    scrollViewRef.current?.scrollTo({
      y: ratingPos - (notchHeight + 56),
      animated: true,
    });
  };
  const scrollToRelated = () => {
    scrollViewRef.current?.scrollTo({
      y: suggestPos - (notchHeight + 56),
      animated: true,
    });
  };
  const handleChangeTabActiveItemWhenScrolling = (currentOffset) => {
    if (currentOffset + SCREEN_HEIGHT / 2 < ratingVerticalOffset) {
      if (activeTab !== 'product') {
        setActiveTab('product');
      }
    }
    if (
      currentOffset + SCREEN_HEIGHT / 2 > ratingVerticalOffset &&
      currentOffset + SCREEN_HEIGHT / 2 < relatedVerticalOffset
    ) {
      if (activeTab !== 'rate') {
        setActiveTab('rate');
      }
    }
    if (currentOffset + SCREEN_HEIGHT / 2 > relatedVerticalOffset) {
      if (activeTab !== 'suggest') {
        setActiveTab('suggest');
      }
    }
  };
  debounce;
  const selectRelatedProduct = (id) => {
    scrollAnimated.setValue(0);
    setCurrentImage(1);
    setChoiceSelect([]);
    dispatch(productActions.getProductById({id: id}));
  };

  const ProductChoiceMemo = React.useMemo(() => {
    return (
      <ProductChoice
        choiceList={productData?.productAttributeOptionResponse}
        setChoiceSelect={setChoiceSelect}
        choiceSelect={choiceSelect}
      />
    );
  }, [productData, choiceSelect]);

  const renderImageItem = ({item, index}) => {
    return (
      <Animated.Image
        style={styles.imageItem}
        source={{uri: item}}
        resizeMode={'cover'}
      />
    );
  };
  const discount = productData
    ? priceSalePercent(productData?.price, productData?.priceSale)
    : 0;

  React.useEffect(() => {
    if (!ratingVerticalOffset || !relatedVerticalOffset) {
      if (ratingRef) {
        ratingRef?.current?.measure((fx, fy) => {
          setRatingVerticalOffset(fy);
        });
      }
      if (relatedRef) {
        relatedRef?.current?.measure((fx, fy) => {
          setRelatedVerticalOffset(fy);
        });
      }
    }
  });
  if (productDataLoading) {
    return (
      <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
        <ProductDetailLoading />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <AnimatedHeader
        scrollAnimated={scrollAnimated}
        image={productImage}
        scrollToTop={scrollToTop}
        scrollToComment={scrollToComment}
        scrollToRelated={scrollToRelated}
        discount={priceSalePercent(productData?.price, productData?.priceSale)}
        activeTabProps={activeTab}
      />
      <Container
        style={styles.mainContent}
        scrollEventThrottle={16}
        scrollViewRef={scrollViewRef}
        onScroll={(e) => {
          onScrollEvent(e);

          handleChangeTabActiveItemWhenScrolling(e.nativeEvent.contentOffset.y);
        }}>
        <Animated.View
          style={[
            styles.imageList,
            {
              opacity: opacity,
            },
          ]}>
          <Carousel
            ref={imagesRef}
            data={
              productData?.imageUrls && productData?.imageUrls
                ? productData.imageUrls
                : []
            }
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
          navigation={props.navigation}
          productId={productData?.id}
          name={productData?.name}
          price={productData?.price}
          priceOriginal={productData?.price}
          rateValue={productData?.productStatisticResponse?.resultOfRating}
          numberOfRate={productData?.productStatisticResponse?.numberOfReview}
        />
        <View style={styles.lineHr} />
        {ProductChoiceMemo}
        <View style={styles.lineHr} />
        <ProductInfo
          description={productData?.description}
          brand={productData?.brandResponse || {}}
        />
        {productData?.storeId ? (
          <>
            <View style={styles.lineHrBig} />
            <ProductLocation
              info={productData?.productOwnerResponse}
              location={productData?.location}
              productId={productData?.id}
            />
          </>
        ) : null}
        <View
          ref={ratingRef}
          style={styles.lineHrBig}
          onLayout={({
            nativeEvent: {
              layout: {y},
            },
          }) => {
            setRatingPos(y);
          }}
        />
        <ProductRating
          navigation={props.navigation}
          data={productComments}
          productId={productData?.id}
        />
        <View
          ref={relatedRef}
          style={styles.lineHrBig}
          onLayout={({
            nativeEvent: {
              layout: {y},
            },
          }) => {
            setSuggestPos(y);
          }}
        />
        <ProductSimilar
          data={productRelated?.content || []}
          onSelect={selectRelatedProduct}
        />
        <View style={styles.lineHrBig} />
        <ProductCoordinated
          data={productCoordinated?.content || []}
          onSelect={selectRelatedProduct}
        />
      </Container>
      <Footer
        isLike={productData?.likeStatusOfUserLogin || false}
        productData={productData}
        choiceSelect={choiceSelect}
      />
    </View>
  );
};

export default ProductDetail;
