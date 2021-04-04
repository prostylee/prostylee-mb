import React from 'react';
import {useSelector} from 'react-redux';
import {View, FlatList, ActivityIndicator, Dimensions} from 'react-native';

import {ContainerView as Container, Colors} from 'components';

import ProductItem from 'components/ProductItem';

import {productByUserSelector} from 'redux/selectors/user';

import styles from './styles';

const {width} = Dimensions.get('window');

const GridView = ({column, wImage, hImage}) => {
  const loadMoreLoading = false;

  const productByUser = useSelector((state) => productByUserSelector(state));

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
  return (
    <Container fluid style={styles.container}>
      <FlatList
        showsVerticalScrollIndicator={false}
        showsHorizontalScrollIndicator={false}
        key={column}
        numColumns={column}
        columnWrapperStyle={styles.viewCol}
        ItemSeparatorComponent={() => <View style={styles.separator} />}
        keyExtractor={(item, index) => 'profileMeTab' + index}
        data={productByUser?.content || []}
        renderItem={({item}) => <ProductItem item={item} />}
        onEndReachedThreshold={0.5}
        initialNumToRender={10}
        ListFooterComponent={renderFooter}
      />
    </Container>
  );
};

GridView.defaultProps = {
  column: 2,
  wImage: (width - 48) / 2,
  hImage: (width - 48) / 2,
};

GridView.propTypes = {};

export default GridView;
