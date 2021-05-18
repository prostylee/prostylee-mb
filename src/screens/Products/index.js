import React, {useRef, useEffect, useState} from 'react';
import {
  Animated,
  TouchableOpacity as Touch,
  View,
  Text,
  ScrollView,
  FlatList,
} from 'react-native';
import {Divider, Searchbar, Chip} from 'react-native-paper';
import i18n from 'i18n';
import styles from './styles';

import {ThemeView, Colors, Image, HeaderAnimated} from 'components';

import ProductsCategories from './Categories';
import ProductItem from './ProductItem';
import {getStatusBarHeight} from 'react-native-status-bar-height';
import {ChevronLeft, Sort, Filter, CaretDown} from 'svg/common';
import HeaderList from './HeaderList';

const heightShow = 334;

const Products = ({navigation}) => {
  const scrollRef = useRef();

  /*Animated*/
  const scrollAnimated = useRef(new Animated.Value(0)).current;

  const onScrollEvent = Animated.event(
    [{nativeEvent: {contentOffset: {y: scrollAnimated}}}],
    {useNativeDriver: false},
  );
  const loading = false;
  const loadMoreLoading = false;
  const [dataSource, setDataSource] = useState([]);

  useEffect(() => {
    let items = Array.apply(null, Array(60)).map((v, i) => {
      return {id: i, src: 'http://placehold.it/200x200?text=' + (i + 1)};
    });
    setDataSource(items);
  }, []);

  const leftPress = () => {
    navigation.goBack();
  };

  return (
    <ThemeView style={styles.container} isFullView>
      <HeaderAnimated
        leftComponent={
          <Touch style={styles.leftTouch} onPress={leftPress}>
            <ChevronLeft color={Colors.$black} />
          </Touch>
        }
        midComponent={
          <Text numberOfLines={1} style={styles.textTitle}>
            Thời trang nam
          </Text>
        }
        bottomComponent={
          <View style={{width: '100%'}}>
            <Divider />
            <View
              style={{
                height: 45,
                width: '100%',
                flexDirection: 'row',
                justifyContent: 'space-between',
              }}>
              <View
                style={{
                  height: 45,
                  width: 80,
                  alignItems: 'center',
                  paddingLeft: 16,
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                }}>
                <View>
                  <Sort />
                </View>
                <Text
                  numberOfLines={1}
                  style={{
                    lineHeight: 18,
                    fontSize: 13,
                    color: '#8B9399',
                    marginLeft: 5,
                  }}>
                  Sắp xếp
                </Text>
                <View>
                  <CaretDown />
                </View>
              </View>
              <View
                style={{
                  height: 45,
                  width: 105,
                  alignItems: 'center',
                  paddingRight: 16,
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                }}>
                <Text
                  numberOfLines={1}
                  style={{
                    lineHeight: 25,
                    fontSize: 25,
                    color: '#F4F5F5',
                    marginRight: 10,
                  }}>
                  |
                </Text>
                <Filter />
                <Text
                  numberOfLines={1}
                  style={{
                    lineHeight: 18,
                    fontSize: 13,
                    color: '#8B9399',
                    marginLeft: 5,
                  }}>
                  Bộ lọc
                </Text>
              </View>
            </View>
            <Divider />
            <View
              style={{
                height: 45,
                width: '100%',
                alignItems: 'flex-start',
                paddingLeft: 16,
              }}>
              <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                <Chip
                  small
                  icon="map-marker"
                  onPress={() => console.log('Pressed')}
                  style={{height: 32, marginTop: 5, marginRight: 10}}>
                  Example Chip
                </Chip>
                <Chip
                  small
                  onPress={() => console.log('Pressed')}
                  style={{height: 32, marginTop: 5, marginRight: 10}}>
                  Best-seller
                </Chip>
                <Chip
                  small
                  onPress={() => console.log('Pressed')}
                  style={{height: 32, marginTop: 5, marginRight: 10}}>
                  Best-seller
                </Chip>
                <Chip
                  small
                  onPress={() => console.log('Pressed')}
                  style={{height: 32, marginTop: 5, marginRight: 10}}>
                  Best-seller
                </Chip>
                <Chip
                  small
                  onPress={() => console.log('Pressed')}
                  style={{height: 32, marginTop: 5, marginRight: 10}}>
                  Best-seller
                </Chip>
              </ScrollView>
            </View>
          </View>
        }
        bottomHeight={100}
        hideBottomBorder={true}
        heightShow={heightShow - 190}
        Animated={Animated}
        navigation={navigation}
        scrollAnimated={scrollAnimated}
      />
      <FlatList
        data={dataSource}
        ListHeaderComponent={() => (
          <HeaderList
            leftPress={leftPress}
            navigation={navigation}
            heightShow={heightShow}
          />
        )}
        renderItem={({item}) => {
          return (
            <View style={{width: '50%'}}>
              <ProductItem item={item} />
            </View>
          );
        }}
        numColumns={2}
        onScroll={onScrollEvent}
        scrollEventThrottle={1}
        keyExtractor={(item, index) => index}
        showsVerticalScrollIndicator={false}
        showsHorizontalScrollIndicator={false}
      />
    </ThemeView>
  );
};

Products.defaultProps = {};

Products.propTypes = {};

export default Products;
