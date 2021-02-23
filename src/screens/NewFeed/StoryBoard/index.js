import React from 'react';
import {ScrollView, View} from 'react-native';
import i18n from 'i18n';
import {isEmpty} from 'lodash';

import {ContainerView as Container, Title} from 'components';

import Item from './Item';

import styles from './styles';

const StoryBoard = ({stories, loading, targetType}) => {
  if (isEmpty(stories) || !stories?.content?.length) {
    return null;
  }

  const listStoryBoads = stories?.content.map((story, i) => ({
    image: story?.storySmallImageUrls[0],
    ...story.storeForStoryResponse,
    ...story.userForStoryResponse,
  }));

  const padStyle = (i, max) => ({
    paddingLeft: i === 0 ? 14 : null,
    paddingRight: i === max - 1 ? 14 : null,
  });

  if (loading) {
    return null;
  }

  return (
    <Container style={styles.container} fluid>
      <View style={styles.titleContainer}>
        <Title
          title={i18n.t('storyBoard.titleStoryBoard')}
          style={styles.textTitle}
          containerStyle={{}}
          subTitle={''}
          onPress={() => {}}
        />
      </View>
      <Container fluid>
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          {listStoryBoads.map((item, index) => (
            <View
              key={item.id}
              style={[
                styles.viewContainer,
                padStyle(index, listStoryBoads.length),
              ]}>
              <Item targetType={targetType} item={item} style={styles.item} />
            </View>
          ))}
        </ScrollView>
      </Container>
    </Container>
  );
};

export default StoryBoard;
