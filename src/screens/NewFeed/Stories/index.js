import React, {useRef, useState} from 'react';
import {Modal, StyleSheet, View} from 'react-native';
import {isEmpty} from 'lodash';
import {CubeNavigationHorizontal} from 'react-native-3dcube-navigation';
// import AllStories from './constants/AllStories';
import StoryContainer from './StoryContainer';
import StoryHorizontal from './StoryHorizontal';

import {convertStoriesData} from 'utils/storyboard';

const Stories = ({stories, loading, targetType}) => {
  const [isModelOpen, setModel] = useState(false);
  const [currentUserIndex, setCurrentUserIndex] = useState(0);
  const [currentScrollValue, setCurrentScrollValue] = useState(0);
  const modalScroll = useRef(null);

  if (isEmpty(stories) || !stories?.content?.length || loading) {
    return null;
  }

  const AllStories = convertStoriesData(stories.content, targetType);

  const onStorySelect = (index) => {
    setCurrentUserIndex(index);
    setModel(true);
  };

  const onStoryClose = () => {
    setModel(false);
  };

  const onStoryNext = (isScroll) => {
    const newIndex = currentUserIndex + 1;
    if (AllStories.length - 1 > currentUserIndex) {
      setCurrentUserIndex(newIndex);
      if (!isScroll) {
        modalScroll.current.scrollTo(newIndex, true);
      }
    } else {
      setModel(false);
    }
  };

  const onStoryPrevious = (isScroll) => {
    const newIndex = currentUserIndex - 1;
    if (currentUserIndex > 0) {
      setCurrentUserIndex(newIndex);
      if (!isScroll) {
        modalScroll.current.scrollTo(newIndex, true);
      }
    }
  };

  const onScrollChange = (scrollValue) => {
    if (currentScrollValue > scrollValue) {
      onStoryNext(true);
      console.log('next');
      setCurrentScrollValue(scrollValue);
    }
    if (currentScrollValue < scrollValue) {
      onStoryPrevious();
      console.log('previous');
      setCurrentScrollValue(scrollValue);
    }
  };

  return (
    <View style={styles.container}>
      <StoryHorizontal
        onPress={onStorySelect}
        targetType={targetType}
        stories={stories}
        loading={loading}
      />
      <Modal
        animationType="slide"
        transparent={false}
        visible={isModelOpen}
        style={styles.modal}
        onShow={() => {
          if (currentUserIndex > 0) {
            modalScroll.current.scrollTo(currentUserIndex, false);
          }
        }}
        onRequestClose={onStoryClose}>
        <CubeNavigationHorizontal
          callBackAfterSwipe={(g) => onScrollChange(g)}
          ref={modalScroll}
          animated={true}
          style={styles.container}>
          {AllStories.map((item, index) => (
            <StoryContainer
              key={'storyContainer' + targetType + index}
              onClose={onStoryClose}
              onStoryNext={onStoryNext}
              onStoryPrevious={onStoryPrevious}
              user={item}
              targetType={targetType}
              isNewStory={index !== currentUserIndex}
            />
          ))}
        </CubeNavigationHorizontal>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-start',
    backgroundColor: 'rgba(255,255,255,255)',
  },
  circle: {
    width: 66,
    margin: 4,
    height: 66,
    borderRadius: 33,
    borderWidth: 2,
    borderColor: '#72bec5',
  },
  modal: {
    flex: 1,
  },
  title: {
    fontSize: 9,
    textAlign: 'center',
  },
});

export default Stories;
