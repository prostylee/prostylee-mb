import React from 'react';
import {View, Text} from 'react-native';
import styles from './styles';
import i18n from 'i18n';
import {ThemeView, Header, ButtonRounded} from 'components';
import ListSelected from './ListSelected';
import ListProduct from './ListProducts';
const AddProducts = ({navigation}) => {
  const [selectedCategory, setSelectedCategory] = React.useState();
  return (
    <ThemeView style={styles.container} isFullView>
      <Header isDefault title={i18n.t('addProduct.categoryScreenTitle')} />
      <ListSelected selectedCategory={selectedCategory} />
      <ListProduct selectAction={setSelectedCategory} />
    </ThemeView>
  );
};
export default AddProducts;
