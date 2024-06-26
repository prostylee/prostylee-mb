import styles from './styles';

import React from 'react';
import {
  View,
  Text,
  Animated,
  RefreshControl,
  Platform,
  FlatList,
} from 'react-native';

/*Hooks*/
import {useDispatch, useSelector} from 'react-redux';
import {useBackHandler} from '@react-native-community/hooks';
import {useRoute} from '@react-navigation/native';

/*Translate*/
import i18n from 'i18n';

/*Components*/
import {ProductDetailLoading} from 'components/Loading/contentLoader';
import {Container} from 'components';
import AnimatedHeader from './AnimatedHeader';
import ProductTitle from './ProductTitle';
import ProductChoice from './ProductChoice';
import ProductInfo from './ProductInfo';
import ProductLocation from './ProductLocation';
import ProductRating from './ProductRating';
import ProductSimilar from './ProductSimilar';
import ProductViewedRecently from './ProductViewedRecently';
import ProductCoordinated from './ProductCoordinated';
import Footer from './Footer';

/*Helpers*/
import {getStatusBarHeight} from 'react-native-status-bar-height';
import {hasNotch} from 'react-native-device-info';
import {debounce} from 'lodash-es';
import PropTypes from 'prop-types';

/*Utils*/
import {priceSalePercent} from 'utils/currency';
import {dim} from 'utils/common';
import isEmpty from 'lodash/isEmpty';

/*Reducers*/
import {productActions, productSelectors, userSelectors} from 'reducers';

/*Assets*/
import defaultImg from '../../assets/images/default.png';

const WIDTH = dim.width;
const SCROLL_TRIGGER_POINT =
  Platform.OS === 'android' ? 90 : 136 + getStatusBarHeight();

const ProductDetail = (props) => {
  const dispatch = useDispatch();
  //route
  const route = useRoute();

  const imagesRef = React.useRef();
  const scrollViewRef = React.useRef();
  const ratingRef = React.useRef();
  const relatedRef = React.useRef();

  const notchHeight = getStatusBarHeight() + (hasNotch() ? 34 : 0);
  const [currentImage, setCurrentImage] = React.useState(1);
  const [choiceSelect, setChoiceSelect] = React.useState([]);
  const [activeTab, setActiveTab] = React.useState('product');
  const [priceList, setPriceList] = React.useState({});

  const [ratingPos, setRatingPos] = React.useState(0);
  const [suggestPos, setSuggestPos] = React.useState(0);
  const [refreshing, handleRefreshing] = React.useState(false);

  /*Animated*/
  const HEIGHT_HEADER = (WIDTH * 4) / 3 + getStatusBarHeight();
  const HEADER_AND_TABS_HEIGHT =
    36 + // tabNav
    50 + // header
    getStatusBarHeight() -
    (Platform.OS === 'ios' ? 0 : 36);
  const scrollAnimated = React.useRef(new Animated.Value(0)).current;

  const onScrollEvent = Animated.event(
    [{nativeEvent: {contentOffset: {y: scrollAnimated}}}],
    {useNativeDriver: false},
  );
  const opacity = scrollAnimated.interpolate({
    inputRange: [
      0,
      (HEIGHT_HEADER - HEADER_AND_TABS_HEIGHT) * 0.85,
      HEIGHT_HEADER - HEADER_AND_TABS_HEIGHT,
    ],
    outputRange: [1, 1, 0],
    extrapolate: 'clamp',
  });

  const productId = route?.params?.id || 232;

  const onViewRef = React.useRef(({viewableItems}) => {
    setCurrentImage(viewableItems[0] ? viewableItems[0].index + 1 : 0);
  });

  React.useEffect(() => {
    if (productId) {
      scrollAnimated.setValue(0);
      dispatch(productActions.getProductById({id: productId}));
      dispatch(productActions.getProductComments({id: productId}));
      dispatch(productActions.getProductRelated({id: productId}));
      dispatch(productActions.getProductViewedRecently());
      setChoiceSelect([]);
    }
  }, [productId]);

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

  const userProfile = useSelector((state) =>
    userSelectors.getUserProfile(state),
  );

  const processProductPriceData = (data) => {
    const attributeList = {};
    data?.map((item) => {
      const attributeValues = item.productAttributes
        .map(
          (attribute) => attribute?.productAttributeResponses?.[0]?.attrValue,
        )
        .sort();
      let attributeID = '';
      attributeValues.forEach((element) => {
        attributeID = attributeID + '_' + element;
      });
      attributeList[attributeID] = {
        price: item?.price,
        priceSale: item?.priceSale,
      };
    });
    setPriceList(attributeList);
  };

  const productPriceData = !isEmpty(productData)
    ? productData?.price && productData?.priceSale
      ? {
          price: productData?.price,
          priceSale: productData?.priceSale,
        }
      : {
          price: productData.productPriceResponseList?.[0]?.price || 0,
          priceSale: productData.productPriceResponseList?.[0]?.priceSale || 0,
        }
    : {};
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

  const productViewedRecently = useSelector((state) =>
    productSelectors.getProductViewedRecently(state),
  );

  React.useEffect(() => {
    if (productData) {
      processProductPriceData(productData.productPriceResponseList);
    }
  }, [productData]);

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
  const handleChangeTabActiveItemWhenScrolling = debounce(
    (currentOffset, isEndReached) => {
      if (currentOffset < ratingPos - (notchHeight + 56)) {
        if (activeTab !== 'product') {
          setActiveTab('product');
        }
      }
      if (
        currentOffset >= ratingPos - (notchHeight + 56) &&
        currentOffset < suggestPos - (notchHeight + 58) &&
        !isEndReached
      ) {
        if (activeTab !== 'rate') {
          setActiveTab('rate');
        }
      }
      if (currentOffset >= suggestPos - (notchHeight + 58)) {
        if (activeTab !== 'suggest') {
          setActiveTab('suggest');
        }
      }
    },
    50,
    {trailing: true, leading: false, maxWait: 4000},
  );

  const selectOtherProduct = (id) => {
    scrollAnimated.setValue(0);
    setCurrentImage(1);
    setChoiceSelect([]);
    dispatch(productActions.getProductById({id: id}));
  };
  const handleRefresh = () => {
    handleRefreshing(true);
    selectOtherProduct(productId);
  };
  const isCloseToBottom = ({layoutMeasurement, contentOffset, contentSize}) => {
    const paddingToBottom = 0;
    return (
      layoutMeasurement?.height + contentOffset.y >=
      contentSize.height - paddingToBottom
    );
  };
  const ProductChoiceMemo = React.useMemo(() => {
    // console.log('productData == ' + JSON.stringify(productData));
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
        defaultSource={defaultImg}
      />
    );
  };
  const discount = productData
    ? priceSalePercent(productPriceData?.price, productPriceData?.priceSale)
    : 0;

  React.useEffect(() => {
    if (!productDataLoading) {
      handleRefreshing(false);
    }
  }, [productDataLoading]);

  React.useEffect(() => {
    if (
      !productData?.productAttributeOptionResponse ||
      !productData?.productAttributeOptionResponse.length
    ) {
      return;
    }
    let defaultChoiceSelect = [];
    productData?.productAttributeOptionResponse.map((item) => {
      defaultChoiceSelect.push({
        ...item,
        value: item?.productAttributeResponses?.[0],
      });
      return {...item};
    });
    setChoiceSelect(defaultChoiceSelect);
  }, [productData]);

  if (productDataLoading && !refreshing) {
    return (
      <View style={styles.loaderContainer}>
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
        discount={priceSalePercent(
          productPriceData?.price,
          productPriceData?.priceSale,
        )}
        activeTabProps={activeTab}
        hasMenu={
          productData &&
          !productData?.storeId &&
          productData?.productOwnerResponse?.id === userProfile?.id
        }
      />
      <Container
        style={styles.mainContent}
        scrollEventThrottle={16}
        scrollViewRef={scrollViewRef}
        overLapStatusBar
        onScroll={(e) => {
          onScrollEvent(e);
          handleChangeTabActiveItemWhenScrolling(
            e.nativeEvent.contentOffset.y,
            isCloseToBottom(e.nativeEvent),
          );
        }}
        hasRefreshing
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={handleRefresh} />
        }>
        <Animated.View
          style={[
            styles.imageList,
            {
              opacity: opacity,
            },
          ]}>
          <FlatList
            ref={imagesRef}
            keyExtractor={(_, index) => `image_slider_${index}`}
            data={
              productData?.imageUrls && productData?.imageUrls
                ? productData.imageUrls
                : []
            }
            horizontal
            pagingEnabled={true}
            showsHorizontalScrollIndicator={false}
            decelerationRate={0.993}
            viewabilityConfig={{
              itemVisiblePercentThreshold: 50,
            }}
            renderItem={renderImageItem}
            getItemLayout={(_, index) => {
              return {length: WIDTH, offset: WIDTH * index, index};
            }}
            onViewableItemsChanged={onViewRef.current}
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
          productId={productData?.id || 1}
          name={productData?.name}
          priceList={priceList}
          choiceSelect={choiceSelect}
          rateValue={productData?.productStatisticResponse?.resultOfRating}
          numberOfRate={productData?.productStatisticResponse?.numberOfReview}
          bookmarkStatus={productData?.saveStatusOfUserLogin || false}
        />
        <View style={styles.lineHr} />
        {ProductChoiceMemo}
        <View style={styles.lineHr} />
        <ProductInfo
          description={productData?.description}
          brand={productData?.brandResponse || {}}
        />
        {productData?.locationId ? (
          <>
            <View style={styles.lineHrBig} />
            <ProductLocation
              info={productData?.productOwnerResponse}
              location={productData?.location || {}}
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
        {(productRelated?.content || [])?.length ? (
          <>
            <ProductSimilar
              data={productRelated?.content || []}
              onSelect={selectOtherProduct}
            />
            <View style={styles.lineHrBig} />
          </>
        ) : null}
        {(productViewedRecently?.content || [])?.length ? (
          <ProductViewedRecently
            data={productViewedRecently?.content || []}
            onSelect={selectOtherProduct}
          />
        ) : null}
        {/* <ProductCoordinated
          data={productCoordinated?.content || []}
          onSelect={selectOtherProduct}
        /> */}
      </Container>
      {productData &&
      !productData?.storeId &&
      productData?.productOwnerResponse?.id === userProfile?.id ? null : (
        <Footer
          navigation={props.navigation}
          isLike={productData?.likeStatusOfUserLogin || false}
          productData={productData}
          priceList={priceList}
          choiceSelect={choiceSelect}
        />
      )}
    </View>
  );
};

ProductDetail.defaultProps = {};

ProductDetail.propTypes = {
  navigation: PropTypes.object,
};

export default ProductDetail;
