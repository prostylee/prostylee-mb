import React, {useEffect} from 'react';

import styles from './styles';
import i18n from 'i18n';
import {ThemeView, Header, ButtonRounded} from 'components';

import {getPostProductInfoSelector} from 'redux/selectors/postProduct';
import {LIMIT_DEFAULT, PAGE_DEFAULT} from 'constants';
import {categoriesActions} from 'redux/reducers';
import {useDispatch, useSelector, shallowEqual} from 'react-redux';
import ListParentCategories from './ListParentCategories';
import ListChildCategories from './ListChildCategories';
import {postProductActions} from 'redux/reducers';
import _ from 'lodash';
import {Alert} from 'react-native';
import {useNavigation} from '@react-navigation/native';
const AddProducts = () => {
  const dispatch = useDispatch();
  const navigation = useNavigation();
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

  useEffect(() => {
    const unsubscribe = navigation.addListener('beforeRemove', (e) => {
      e.preventDefault();
      Alert.alert(i18n.t('caution'), i18n.t('addProduct.inforWillDelete'), [
        {
          text: i18n.t('confirm'),
          onPress: () => {
            dispatch(postProductActions.clearPostProduct());
            navigation.dispatch(e.data.action);
          },
          style: 'destructive',
        },
        {
          text: i18n.t('cancel'),
          onPress: () => {},
          style: 'cancel',
        },
      ]);
    });
    return unsubscribe;
  }, []);

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
