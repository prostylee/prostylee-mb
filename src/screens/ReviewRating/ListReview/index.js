/* eslint-disable react-hooks/rules-of-hooks */

import styles from './styles';

import React, {useEffect, useState, useRef} from 'react';
import {Animated, View, ActivityIndicator, FlatList} from 'react-native';

import {Colors, ThemeView} from 'components';
import BottomHeaderAnimated from '../BottomHeaderAnimated';
import ReviewItem from '../ReviewItem';

import {useDispatch} from 'react-redux';

const ListReview = ({navigation}) => {
  const dispatch = useDispatch();

  /*Animated*/
  const scrollAnimated = useRef(new Animated.Value(0)).current;

  const onScrollEvent = Animated.event(
    [{nativeEvent: {contentOffset: {y: scrollAnimated}}}],
    {useNativeDriver: false},
  );

  const [refreshing, handleRefreshing] = useState(false);
  const [loadMoreLoading, setLoadMoreLoading] = useState(false);

  useEffect(() => {}, [dispatch, refreshing]);

  const handleRefresh = () => {
    handleRefreshing(true);
  };

  const handleLoadMore = () => {};

  const renderFooter = () => {
    if (!loadMoreLoading) {
      return <View style={styles.viewFooter} />;
    }

    return (
      <View style={[styles.viewFooter, styles.viewLoadingFooter]}>
        <ActivityIndicator animating color={Colors.$purple} size="small" />
      </View>
    );
  };

  const leftPress = () => {
    navigation.goBack();
  };

  return (
    <ThemeView style={styles.container} isFullView>
      <BottomHeaderAnimated />

      <FlatList
        data={[
          {
            author: {name: 'Vũ'},
            rating: 5,
            content: 'Sản phẩm tốt, chất lượng',
            images: [
              {
                key: '1',
                url: 'https://cdn3.yame.vn/pimg/so-mi-nam-no-style-td-km18-0018246/e4cebcc8-21b2-1a00-b6bc-00173fc25903.jpg?w=440',
              },
              {
                key: '2',
                url: 'https://sagasilk.com/wp-content/uploads/vay-dam-maxi-trang-dai-du-tiec-hang-hieu-cao-cap-2019.jpg',
              },
              {
                key: '3',
                url: 'https://cdn2.yame.vn/pimg/so-mi-nam-no-style-td-km18-0018246/7af60ad2-b54b-0400-1db4-00159060c9b0.jpg?w=440',
              },
              {
                key: '4',
                url: 'https://vaymaxi.vn/wp-content/uploads/2019/08/IMG_0790.jpg',
              },
              {
                key: '5',
                url: 'https://cdn2.yame.vn/pimg/so-mi-nam-no-style-td-km18-0018246/7af60ad2-b54b-0400-1db4-00159060c9b0.jpg?w=440',
              },
              {
                key: '6',
                url: 'https://sagasilk.com/wp-content/uploads/vay-dam-maxi-trang-dai-du-tiec-hang-hieu-cao-cap-2019.jpg',
              },
            ],
          },
          {
            author: {name: 'Vũ'},
            rating: 3,
            content:
              'I bought this product two weeks ago. I really really like it so elegant.',
            images: [
              {
                key: '1',
                url: 'https://cdn3.yame.vn/pimg/so-mi-nam-no-style-td-km18-0018246/e4cebcc8-21b2-1a00-b6bc-00173fc25903.jpg?w=440',
              },
              {
                key: '2',
                url: 'https://cdn2.yame.vn/pimg/so-mi-nam-no-style-td-km18-0018246/7af60ad2-b54b-0400-1db4-00159060c9b0.jpg?w=440',
              },
            ],
          },
          {
            author: {name: 'Vũ'},
            rating: 4,
            content:
              'Sản phẩm tốt, chất lượng. I bought this product two weeks ago. I really really like it so elegant.',
            images: [
              {
                key: '1',
                url: 'https://cdn3.yame.vn/pimg/so-mi-nam-no-style-td-km18-0018246/e4cebcc8-21b2-1a00-b6bc-00173fc25903.jpg?w=440',
              },
              {
                key: '2',
                url: 'https://cdn2.yame.vn/pimg/so-mi-nam-no-style-td-km18-0018246/7af60ad2-b54b-0400-1db4-00159060c9b0.jpg?w=440',
              },
            ],
          },
          {
            author: {name: 'Tran Vawn A'},
            rating: 1,
            content: 'Sản phẩm tốt, chất lượng',
            images: [],
          },
          {
            author: {name: 'Vũ Nguyeen'},
            rating: 5,
            content: 'Sản phẩm tốt, chất lượng',
            images: [],
          },
          {
            author: {name: 'Vũ 123'},
            rating: 5,
            content:
              'Sản phẩm tốt, chất lượng. I bought this product two weeks ago. I really really like it so elegant.',
            images: [],
          },
          {
            author: {name: 'Vũ ABC'},
            rating: 5,
            content: 'Sản phẩm tốt, chất lượng',
            images: [],
          },
          {
            author: {name: 'Vũ'},
            rating: 4,
            content: 'Sản phẩm tốt, chất lượng',
            images: [],
          },
          {
            author: {name: 'Vũ'},
            rating: 5,
            content: 'Sản phẩm tốt, chất lượng',
            images: [],
          },
          {
            author: {name: 'Vũ'},
            rating: 5,
            content: 'Sản phẩm tốt, chất lượng',
            images: [],
          },
          {
            author: {name: 'Vũ'},
            rating: 5,
            content: 'Sản phẩm tốt, chất lượng',
            images: [],
          },
          {
            author: {name: 'Vũ'},
            rating: 5,
            content: 'Sản phẩm tốt, chất lượng',
            images: [],
          },
        ]}
        renderItem={({item}) => (
          <ReviewItem navigation={navigation} item={item} />
        )}
        numColumns={1}
        keyExtractor={(item, index) => index}
        refreshing={refreshing}
        onRefresh={handleRefresh}
        onEndReached={() => handleLoadMore()}
        ListFooterComponent={renderFooter}
        style={styles.flatList}
        showsVerticalScrollIndicator={false}
        showsHorizontalScrollIndicator={false}
        onScroll={onScrollEvent}
      />
    </ThemeView>
  );
};

ListReview.defaultProps = {};

ListReview.propTypes = {};

export default ListReview;
