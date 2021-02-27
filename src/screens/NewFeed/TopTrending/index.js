import React from 'react';
import {ScrollView, View} from 'react-native';
import {isEmpty} from 'lodash';
import i18n from 'i18n';

import {ContainerView as Container, Title} from 'components';

import Item from './Item';

import styles from './styles';

const TopTrending = ({topProduct, navigation, targetType}) => {
  if (isEmpty(topProduct) || !topProduct?.content?.length) {
    return null;
  }

  const topProductList = topProduct?.content;

  return (
    <>
      <Container style={styles.titleContainer}>
        <Title
          title={i18n.t('stores.titleTopStore')}
          style={styles.textTitle}
          containerStyle={{}}
          subTitle={i18n.t('common.textSeeMore')}
          onPress={() => {
            navigation.navigate('Stores');
          }}
        />
      </Container>
      <Container fluid>
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          {topProductList.map((item, index) => (
            <View
              key={'topProductList' + targetType + index}
              style={styles.viewContainer}>
              <Item targetType={targetType} item={item} style={{flex: 1}} />
            </View>
          ))}
        </ScrollView>
      </Container>
    </>
  );
};

export default TopTrending;
