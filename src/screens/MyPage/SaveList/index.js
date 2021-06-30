import React, {useEffect, useState} from 'react';
import {View, FlatList} from 'react-native';
import styles from './styles';
import i18n from 'i18n';
import ProductItem from './ProductItem';
import {ThemeView, Header} from 'components';
import {myPageActions, userSelectors} from 'reducers';
import {useDispatch, useSelector} from 'react-redux';
import {LIMIT_DEFAULT, PAGE_DEFAULT} from 'constants';
import {
  getListProductSavedLoadingSelector,
  getListProductSavedSelector,
  getLoadProductSavedMoreLoadingSelector,
  getHasLoadMoreProductSavedSelector,
  getPageProductSavedSelector,
} from 'redux/selectors/myPage';
const data = [
  {
    id: 231,
    imageUrls: [
      'https://d1fq4uh0wyvt14.cloudfront.net/fit-in/600x900/public/ec72c651-d66a-4bfb-950c-f6b8e2132f30/557e3db0-c889-488b-8afd-79a8c90f17d6.jpeg',
    ],
    name: 'Ao thum nam den ',
    price: 123000,
    priceSale: 99000,
    amount: 1,
    productSize: 'M',
    productColor: 'Den',
  },
  {
    id: 232,
    imageUrls: [
      'https://d1fq4uh0wyvt14.cloudfront.net/fit-in/600x900/public/ec72c651-d66a-4bfb-950c-f6b8e2132f30/557e3db0-c889-488b-8afd-79a8c90f17d6.jpeg',
    ],
    name: 'Ao thum nam den ',
    price: 144000,
    priceSale: 97000,
    amount: 1,
    productSize: 'M',
    productColor: 'Den',
  },
  {
    id: 233,
    imageUrls: [
      'https://d1fq4uh0wyvt14.cloudfront.net/fit-in/600x900/public/ec72c651-d66a-4bfb-950c-f6b8e2132f30/557e3db0-c889-488b-8afd-79a8c90f17d6.jpeg',
    ],
    name: 'Ao thum nam dài tay phối kiểu dọc Caro đen trắng basic ',
    price: 133000,
    priceSale: 79000,
    amount: 1,
    productSize: 'M',
    productColor: 'Den',
  },
];
const SaveList = (props) => {
  const dispatch = useDispatch();

  const [isRefreshing, setIsRefreshing] = useState(false);

  const userProfile = useSelector((state) =>
    userSelectors.getUserProfile(state),
  );

  const loading = useSelector((state) =>
    getListProductSavedLoadingSelector(state),
  );

  const savedProductListSelector = useSelector((state) =>
    getListProductSavedSelector(state),
  );

  const page = useSelector((state) => getPageProductSavedSelector(state));

  const hasLoadmore = useSelector((state) =>
    getHasLoadMoreProductSavedSelector(state),
  );

  const savedProductList = savedProductListSelector?.content || [];

  const loadMoreLoading = useSelector((state) =>
    getLoadProductSavedMoreLoadingSelector(state),
  );

  const handleLoadMore = () => {
    if (hasLoadmore) {
      dispatch(
        myPageActions.getListProductSavedLoadmore({
          page: page,
          limit: LIMIT_DEFAULT,
        }),
      );
    }
  };
  const handleRefresh = () => {
    setIsRefreshing(true);
    dispatch(
      myPageActions.getListProductSaved({
        page: PAGE_DEFAULT,
        limit: LIMIT_DEFAULT,
      }),
    );
  };
  React.useEffect(() => {
    if (!loading) setIsRefreshing(false);
  }, [loading]);
  React.useEffect(() => {
    dispatch(
      myPageActions.getListProductSaved({
        page: PAGE_DEFAULT,
        limit: LIMIT_DEFAULT,
      }),
    );
  }, []);
  return (
    <ThemeView style={styles.container} isFullView>
      <Header isDefault title={i18n.t('mypage.saveList')} />
      <View style={styles.wrapWishList}>
        <FlatList
          data={savedProductList}
          renderItem={({item, index}) => {
            return (
              <View style={styles.wrapProduct}>
                <ProductItem
                  index={index}
                  item={item?.productResponseLite}
                  id={item?.id}
                />
              </View>
            );
          }}
          numColumns={2}
          scrollEventThrottle={1}
          keyExtractor={(_, index) => `coordinated_product_${index}`}
          style={styles.listContainer}
          showsVerticalScrollIndicator={false}
          showsHorizontalScrollIndicator={false}
          onEndReached={handleLoadMore}
          onRefresh={handleRefresh}
          refreshing={isRefreshing}
        />
      </View>
    </ThemeView>
  );
};

export default SaveList;
