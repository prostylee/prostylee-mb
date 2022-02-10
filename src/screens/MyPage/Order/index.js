import React from 'react';
import {View, FlatList, ActivityIndicator} from 'react-native';

import {ContainerView as Container, Colors} from 'components';

import ProductItem from './ProductItem';

import styles from './styles';
import {EmptyProduct} from 'svg/profile';
import {EmptyComponent} from 'components';
import i18n from 'i18n';
import {userSelectors} from 'reducers';
import {useSelector} from 'react-redux';

const GridView = ({column, productList}) => {
  const loadMoreLoading = false;
  const userProfile = useSelector((state) =>
    userSelectors.getUserProfile(state),
  );

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
        scrollEnabled={false}
        numColumns={column}
        keyExtractor={(_, index) => 'profileMeTab' + index}
        contentContainerStyle={styles.listContent}
        data={productList?.content || []}
        renderItem={({item, index}) => {
          const data = {
            ...item,
            ...(item.product ? item.product : {}),
            ...(item.productResponseLite ? item.productResponseLite : {}),
            product: {
              ...(item.product ? item.product : {}),
              ...(item.productResponseLite ? item.productResponseLite : {}),
            },
          };
          return (
            <View
              style={{
                marginLeft: index % 2 === 0 ? 0 : 8,
              }}>
              <ProductItem item={data} />
            </View>
          );
        }}
        onEndReachedThreshold={0.5}
        initialNumToRender={10}
        ListFooterComponent={renderFooter}
        ListEmptyComponent={
          <EmptyComponent
            icon={<EmptyProduct />}
            title={i18n.t('mypage.noProduct')}
            subTitle={i18n.t('mypage.noProductSub', {
              name: userProfile?.username || '',
            })}
          />
        }
      />
    </Container>
  );
};

GridView.defaultProps = {
  column: 2,
};

GridView.propTypes = {};

export default GridView;
