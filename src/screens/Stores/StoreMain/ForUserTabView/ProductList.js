import React from 'react';
import {View, FlatList, Text, ActivityIndicator} from 'react-native';
import styles from './style';
import ProductItem from './ProductItem';
import {SearchProductLoading} from 'components/Loading/contentLoader';

const ProductList = ({
  navigation,
  onRefresh = () => {},
  onLoadMore = () => {},
  isRefreshing = false,
  isLoading = false,
  data = [],
  isLoadmore = false,
}) => {
  const Footer = () =>
    isLoadmore ? (
      <View style={styles.listFooterContainer}>
        <ActivityIndicator />
      </View>
    ) : null;
  return (
    <View style={styles.container}>
      <View style={styles.listWrapper}>
        {isLoading ? (
          <View
            style={{
              flexDirection: 'row',
              paddingBottom: 16,
              flexWrap: 'wrap',
              justifyContent: 'space-around',
            }}>
            {[1, 2, 3, 4].map((v) => (
              <SearchProductLoading />
            ))}
          </View>
        ) : data && data.length ? (
          <FlatList
            style={styles.listWrapper}
            numColumns={2}
            data={data}
            nestedScrollEnabled={true}
            onEndReached={onLoadMore}
            refreshing={isRefreshing}
            onRefresh={onRefresh}
            renderItem={({item, index}) => {
              return (
                <ProductItem
                  item={item}
                  index={index}
                  navigation={navigation}
                  key={`${item.id}-${index}-${item.name}`}
                />
              );
            }}
            ListFooterComponent={<Footer />}
          />
        ) : (
          <Text>Ko co</Text>
        )}
      </View>
    </View>
  );
};

ProductList.defaultProps = {};

ProductList.propTypes = {};

export default ProductList;
