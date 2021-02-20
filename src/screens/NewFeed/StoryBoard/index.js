import React from 'react';
import {ScrollView, View} from 'react-native';
import {isEmpty} from 'lodash';
import i18n from 'i18n';

import {ContainerView as Container, Title} from 'components';
import {NewFeedTrendingContentLoading} from 'components/Loading/contentLoader';

import Item from './Item';

import styles from './styles';

const StoryBoard = ({storyBoads, loading, navigation}) => {
  // if (isEmpty(storyBoads) || !storyBoads?.content?.length) {
  //   return null;
  // }

  const listDynamicUser = storyBoads?.content;

  if (loading) {
    return <NewFeedTrendingContentLoading />;
  }

  return (
    <>
      <Container style={styles.titleContainer}>
        <Title
          title={i18n.t('dynamicUsers.titleDynamicUser')}
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
          {listDynamicUser.map((item, index) => (
            <View key={item.id} style={styles.viewContainer}>
              <Item item={item} style={{flex: 1}} />
            </View>
          ))}
        </ScrollView>
      </Container>
    </>
  );
};

export default StoryBoard;
