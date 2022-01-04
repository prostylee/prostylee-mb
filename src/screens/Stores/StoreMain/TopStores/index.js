import React from 'react';
import {ScrollView, View} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {isEmpty} from 'lodash';
import i18n from 'i18n';

import {ContainerView as Container, Title} from 'components';

import Item from './Item';

import styles from './styles';

const TopStores = ({topProduct}) => {
  const navigation = useNavigation();
  if (isEmpty(topProduct) || !topProduct?.content?.length) {
    return null;
  }

  const topProductList = topProduct?.content || [];

  return (
    <View style={styles.container}>
      <Container style={styles.titleContainer}>
        <Title
          title={i18n.t('stores.titleTopStore')}
          style={styles.textTitle}
          containerStyle={{}}
          subTitle={i18n.t('common.textSeeMore')}
          subTitleWithIcon={true}
          onPress={() => {
            navigation.navigate('StoreHighlight');
          }}
        />
      </Container>
      <Container fluid>
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.listContent}>
          {topProductList.map((item, index) => (
            <View key={`topProductList_${index}}`} style={styles.viewContainer}>
              <Item item={item} style={{flex: 1}} />
            </View>
          ))}
        </ScrollView>
      </Container>
    </View>
  );
};

export default TopStores;
