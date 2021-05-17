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
import CategoriesRightItem from '../Categories/Right/item';

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

  const scrollProfile = () => {
    scrollRef.current?.scrollTo({
      y: 0,
      animated: true,
    });
  };
  const [searchQuery, setSearchQuery] = React.useState('');

  const onChangeSearch = (query) => setSearchQuery(query);

  return (
    <ThemeView style={styles.container} isFullView>
      <HeaderAnimated
        leftComponent={
          <Touch style={styles.leftTouch} onPress={leftPress}>
            <ChevronLeft color={Colors.$black} />
          </Touch>
        }
        midComponent={
          <Touch onPress={scrollProfile} style={styles.mid}>
            <Text numberOfLines={1} style={styles.textTitle}>
              Thời trang nam
            </Text>
          </Touch>
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
        ListHeaderComponent={() => {
          return (
            <View
              style={{
                height: heightShow,
                width: '100%',
                position: 'relative',
              }}>
              <Image
                style={styles.imageBanner}
                source={{uri: 'http://placehold.it/400x200?text=Banner 2x1'}}
              />
              <View
                style={{
                  position: 'absolute',
                  bottom: 114,
                  width: '100%',
                  paddingLeft: 16,
                  paddingRight: 16,
                }}>
                <Searchbar
                  placeholder={i18n.t('search')}
                  onChangeText={onChangeSearch}
                  value={searchQuery}
                />
              </View>
              <View
                style={{
                  position: 'absolute',
                  top: getStatusBarHeight(),
                  width: '100%',
                  paddingLeft: 16,
                }}>
                <Touch
                  style={{
                    width: 16,
                  }}
                  onPress={leftPress}>
                  <ChevronLeft color={Colors.$white} />
                </Touch>
              </View>
              <View
                style={{
                  position: 'absolute',
                  bottom: 175,
                  width: '100%',
                  paddingLeft: 16,
                  paddingRight: 16,
                }}>
                <Text numberOfLines={1} style={styles.headTitle}>
                  Thời trang nam
                </Text>
              </View>
              <ProductsCategories />
            </View>
          );
        }}
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
