import React, {useEffect, useState} from 'react';
import {View, TouchableOpacity, FlatList} from 'react-native';
import i18n from 'i18n';
import {useDispatch, useSelector} from 'react-redux';
import {newFeedActions} from 'reducers';
import {getHasLoadMoreStoriesSelector} from 'redux/selectors/newFeed';

import {ContainerView as Container, Title} from 'components';

import Item from './Item';

import styles from './styles';

const StoryHorizontal = ({stories, loading, targetType, onPress}) => {
  const dispatch = useDispatch();
  const hasLoadMore = useSelector((state) =>
    getHasLoadMoreStoriesSelector(state),
  );
  const [listStory, setListStory] = useState([]);

  // useEffect(() => {
  //   console.log(stories?.content.length || 0, listStory?.length || 0);
  //   if ((stories?.content.length || 0) > (listStory?.length || 0)) {
  //     setListStory((prev) => {
  //       return prev.concat(
  //         stories?.content?.slice(listStory.length).map((story, i) => ({
  //           image: story?.storySmallImageUrls[0],
  //           ...story.storeForStoryResponse,
  //           ...story.userForStoryResponse,
  //         })),
  //       );
  //     });
  //   }
  // }, [stories?.content]);

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

  const callGetMoreStories = () => {
    if (hasLoadMore) {
      dispatch(newFeedActions.getStoriesByUserMore());
    }
  };

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
        <FlatList
          horizontal
          showsHorizontalScrollIndicator={false}
          data={listStoryBoads}
          keyExtractor={(_, index) => 'listStoryBoads' + targetType + index}
          renderItem={({item, index}) => {
            return (
              <TouchableOpacity
                onPress={() => onPress(index)}
                key={'listStoryBoads' + targetType + index}
                style={[
                  styles.viewContainer,
                  padStyle(index, listStoryBoads.length),
                ]}>
                <Item targetType={targetType} item={item} style={styles.item} />
              </TouchableOpacity>
            );
          }}
          onEndReached={callGetMoreStories}
          onEndReachedThreshold={0.2}
        />
      </Container>
    </Container>
  );
};

export default StoryHorizontal;
