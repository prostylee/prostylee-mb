import React, {useEffect} from 'react';
import {View, Text} from 'react-native';
import styles from './styles';
import i18n from 'i18n';
import {ThemeView, Header, ButtonRounded} from 'components';

import {getPostProductInfoSelector} from 'redux/selectors/postProduct';
import {LIMIT_DEFAULT, PAGE_DEFAULT} from 'constants';
import {categoriesActions} from 'redux/reducers';
import {useDispatch, useSelector} from 'react-redux';
import ListParentCategories from './ListParentCategories';
import ListChildCategories from './ListChildCategories';
const AddProducts = ({navigation}) => {
  const dispatch = useDispatch();

  const postProductInfo = useSelector((state) =>
    getPostProductInfoSelector(state),
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
      console.log('PARENT ID CHANGE', postProductInfo);
      dispatch(
        categoriesActions.getListRightCategories({
          page: PAGE_DEFAULT,
          limit: LIMIT_DEFAULT,
          parentId: parentId,
        }),
      );
    }
  }, [parentId]);

  return (
    <ThemeView style={styles.container} isFullView>
      <Header isDefault title={i18n.t('addProduct.categoryScreenTitle')} />
      <ListChildCategories selectAction={setSelectedCategory} />
      <ListParentCategories selectedCategory={selectedCategory} />
    </ThemeView>
  );
};
export default AddProducts;
