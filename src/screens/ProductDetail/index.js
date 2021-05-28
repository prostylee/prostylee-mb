import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
  Image,
  Animated,
} from 'react-native';
import {Container, ButtonRounded, HeaderBack} from 'components';
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
  const [userId, setUserId] = React.useState('');
  const [contentSizeChange, setContentSizeChange] = React.useState(false);
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
  }, []);

  const productData = useSelector((state) =>
    productSelectors.getProductDetail(state),
  );
  const demoChoice = [
    {
      id: 'choice_1',
      label: 'Kích thước',
      productAttributeResponses: ['XS', 'S', 'M', 'L'],
      isSize: true,
    },
    {
      id: 'choice_2',
      label: 'Màu sắc',
      productAttributeResponses: ['Đen', 'Trắng', 'Xám'],
    },
  ];
  const demoComments = {
    totalRate: 4.6,
    totalRateCount: 4,
    list: [
      {
        id: 'rate_1',
        content:
          'I bought this product two weeks ago. I really really like it so elegant.',
        value: 4,
        commentImages: [
          {
            attachmentId: 0,
            uri: 'https://images.unsplash.com/photo-1571501679680-de32f1e7aad4',
          },
          {
            attachmentId: 1,
            uri: 'https://images.unsplash.com/photo-1573273787173-0eb81a833b34',
          },
        ],
        user: {
          displayName: 'Diệu Anh',
          emailAddress: 'dieuanh@gmail.com',
        },
      },
      {
        id: 'rate_2',
        content:
          'I bought this product two weeks ago. I really really like it so elegant.',
        value: 3,
        commentImages: [
          {
            attachmentId: 0,
            uri: 'https://images.unsplash.com/photo-1571501679680-de32f1e7aad4',
          },
          {
            attachmentId: 1,
            uri: 'https://images.unsplash.com/photo-1573273787173-0eb81a833b34',
          },
          {
            attachmentId: 2,
            uri: 'https://images.unsplash.com/photo-1569569970363-df7b6160d111',
          },
          {
            attachmentId: 3,
            uri: 'https://images.unsplash.com/photo-1571501679680-de32f1e7aad4',
          },
          {
            attachmentId: 4,
            uri: 'https://images.unsplash.com/photo-1573273787173-0eb81a833b34',
          },
          {
            attachmentId: 5,
            uri: 'https://images.unsplash.com/photo-1569569970363-df7b6160d111',
          },
        ],
        user: {
          displayName: 'Việt Khang',
          emailAddress: 'vietkhang@gmail.com',
        },
      },
      {
        id: 'rate_3',
        content:
          'I bought this product two weeks ago. I really really like it so elegant.',
        value: 5,
        commentImages: [
          {
            attachmentId: 0,
            uri: 'https://images.unsplash.com/photo-1571501679680-de32f1e7aad4',
          },
          {
            attachmentId: 1,
            uri: 'https://images.unsplash.com/photo-1573273787173-0eb81a833b34',
          },
          {
            attachmentId: 2,
            uri: 'https://images.unsplash.com/photo-1569569970363-df7b6160d111',
          },
        ],
        user: {
          displayName: 'Đức Tường',
          emailAddress: 'ductuong@gmail.com',
        },
      },
      {
        id: 'rate_4',
        content:
          'I bought this product two weeks ago. I really really like it so elegant.',
        value: 5,
        commentImages: [
          {
            attachmentId: 0,
            uri: 'https://images.unsplash.com/photo-1571501679680-de32f1e7aad4',
          },
          {
            attachmentId: 1,
            uri: 'https://images.unsplash.com/photo-1573273787173-0eb81a833b34',
          },
          {
            attachmentId: 2,
            uri: 'https://images.unsplash.com/photo-1569569970363-df7b6160d111',
          },
        ],
        user: {
          displayName: 'Đức Tường',
          emailAddress: 'ductuong@gmail.com',
        },
      },
    ],
  };
  const productImage =
    productData?.imageUrls && productData?.imageUrls?.length
      ? productData.imageUrls
      : [];

  //BackHandler handle
  useBackHandler(() => {
    return true;
  });

  const ProductChoiceMemo = React.useMemo(() => {
    return (
      <ProductChoice
        choiceList={demoChoice}
        setChoiceSelect={setChoiceSelect}
        choiceSelect={choiceSelect}
      />
    );
  }, [demoChoice, choiceSelect]);

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

  return (
    <View style={styles.container}>
      <AnimatedHeader
        scrollAnimated={scrollAnimated}
        image={productImage}
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
        <ProductRating data={demoComments} />
      </Container>
    </View>
  );
};

export default ProductDetail;
