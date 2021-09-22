import React, {useEffect} from 'react';

import styles from './styles';
import i18n from 'i18n';
import {ThemeView, Header} from 'components';

import {getPostProductInfoSelector} from 'redux/selectors/postProduct';
import {LIMIT_DEFAULT, PAGE_DEFAULT} from 'constants';
import {categoriesActions} from 'redux/reducers';
import {useDispatch, useSelector, shallowEqual} from 'react-redux';
import ListParentCategories from './ListParentCategories';
import ListChildCategories from './ListChildCategories';
import {postProductActions} from 'redux/reducers';
import {Alert, BackHandler} from 'react-native';
import {useIsFocused, useNavigation} from '@react-navigation/native';
const AddProducts = () => {
  const isFocused = useIsFocused();

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

  const askForConfirmation = () => {
    Alert.alert(i18n.t('caution'), i18n.t('addProduct.inforWillDelete'), [
      {
        text: i18n.t('confirm'),
        onPress: () => {
          dispatch(postProductActions.clearPostProduct());
          navigation.goBack();
        },
        style: 'destructive',
      },
      {
        text: i18n.t('cancel'),
        onPress: () => {},
        style: 'cancel',
      },
    ]);
    return true;
  };

  useEffect(() => {
    const backHandler = BackHandler.addEventListener(
      'hardwareBackPress',
      askForConfirmation,
    );

    return () => backHandler.remove();
  }, []);

  return (
    <ThemeView style={styles.container} isFullView>
      <Header
        isDefault
        title={i18n.t('addProduct.categoryScreenTitle')}
        preventGobackFunction={askForConfirmation}
      />
      {parentId ? (
        <ListChildCategories selectAction={setSelectedCategory} />
      ) : null}

      <ListParentCategories selectedCategory={selectedCategory} />
    </ThemeView>
  );
};
export default AddProducts;
