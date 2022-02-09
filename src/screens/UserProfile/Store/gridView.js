import React from 'react';
import {useSelector} from 'react-redux';
import {View, FlatList, ActivityIndicator} from 'react-native';

import {ContainerView as Container, Colors} from 'components';

import ProductItem from './ProductItem';

import {productByUserSelector} from 'redux/selectors/user';

import styles from './styles';
import {EmptyProduct} from 'svg/profile';
import {EmptyComponent} from 'components';
import i18n from 'i18n';

const GridView = ({column, userProfile}) => {
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
        numColumns={column}
        keyExtractor={(_, index) => 'profileMeTab' + index}
        data={productByUser?.content || []}
        renderItem={({item, index}) => (
          <View
            style={{
              marginLeft: index % 2 === 0 ? 0 : 8,
            }}>
            <ProductItem item={item} />
          </View>
        )}
        contentContainerStyle={styles.listContent}
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
