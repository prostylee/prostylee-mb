import React, {useEffect} from 'react';
import {View, Text} from 'react-native';
import styles from './styles';
import i18n from 'i18n';
import {ThemeView, Header, ButtonRounded} from 'components';

import {getPostProductInfoSelector} from 'redux/selectors/postProduct';
import {LIMIT_DEFAULT, PAGE_DEFAULT} from 'constants';
import {categoriesActions} from 'redux/reducers';
import {useDispatch, useSelector, shallowEqual} from 'react-redux';
import ListParentCategories from './ListParentCategories';
import ListChildCategories from './ListChildCategories';
import _ from 'lodash';
const AddProducts = ({navigation}) => {
  const dispatch = useDispatch();

  const postProductInfo = useSelector(
    (state) => getPostProductInfoSelector(state),
    shallowEqual,
  );
  const [selectedCategory, setSelectedCategory] = React.useState();
  const [parentId, setParentId] = React.useState(
    postProductInfo?.category?.id || null,
  );
  useEffect(() => {
    dispatch(
      categoriesActions.getListLeftCategories({
        page: PAGE_DEFAULT,
        limit: LIMIT_DEFAULT,
      }),
    );
  }, []);
  useEffect(() => {
    if (parentId) {
      dispatch(
        categoriesActions.getListRightCategories({
          page: PAGE_DEFAULT,
          limit: LIMIT_DEFAULT,
          parentId: parentId,
        }),
      );
    }
  }, [parentId]);

  useEffect(() => {
    if (postProductInfo?.category?.id) {
      setParentId(postProductInfo?.category?.id);
    }
  }, [postProductInfo?.category?.id]);

  return (
    <ThemeView style={styles.container} isFullView>
      <Header isDefault title={i18n.t('addProduct.categoryScreenTitle')} />
      {parentId ? (
        <ListChildCategories selectAction={setSelectedCategory} />
      ) : null}

      <ListParentCategories selectedCategory={selectedCategory} />
    </ThemeView>
  );
};
export default AddProducts;
