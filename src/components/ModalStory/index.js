import React from 'react';
// import Modal from 'react-native-modal';
import CubeNavigationHorizontal from './Horizontal';
import {StyleSheet, Modal} from 'react-native';
import {useSelector, useDispatch} from 'react-redux';
import StoryContainer from './StoryContainer';
import {targetTypeSelector} from 'redux/selectors/common';
import {commonSelectors, commonActions} from 'reducers';
import {getStories} from 'redux/selectors/newFeed';

import {convertStoriesData} from 'utils/storyboard';

const ModalStory = () => {
  const dispatch = useDispatch();

  const isShowModal = useSelector((state) =>
    commonSelectors.isShowStoryModal(state),
  );

  const modalPage = useSelector((state) =>
    commonSelectors.storyModalInitPage(state),
  );

  const [currentScrollValue, setCurrentScrollValue] = React.useState(0);
  const modalScroll = React.useRef(null);
  const targetType = useSelector((state) => targetTypeSelector(state));
  const stories = useSelector((state) => getStories(state));

  const AllStories = convertStoriesData(stories.content, targetType);

  const onStoryClose = () => {
    dispatch(commonActions.toggleStoryModal({show: false}));
  };

  const onStoryNext = (isScroll) => {
    const newIndex = modalPage + 1;
    if (AllStories.length - 1 > modalPage) {
      dispatch(commonActions.toggleStoryModal({show: true, page: newIndex}));

      if (!isScroll) {
        modalScroll.current.scrollTo(newIndex, true);
      }
    } else {
      dispatch(commonActions.toggleStoryModal({show: false}));
    }
  };

  const onStoryPrevious = (isScroll) => {
    const newIndex = modalPage - 1;
    if (modalPage > 0) {
      dispatch(commonActions.toggleStoryModal({show: true, page: newIndex}));
      if (!isScroll) {
        modalScroll.current.scrollTo(newIndex, true);
      }
    }
  };

  const onScrollChange = (scrollValue) => {
    if (currentScrollValue > scrollValue) {
      onStoryNext(true);
      setCurrentScrollValue(scrollValue);
    }
    if (currentScrollValue < scrollValue) {
      onStoryPrevious();
      setCurrentScrollValue(scrollValue);
    }
  };

  return (
    <Modal
      animationType="slide"
      transparent={false}
      visible={isShowModal}
      style={styles.modal}
      onShow={() => {
        if (modalPage > 0) {
          modalScroll.current.scrollTo(modalPage, false);
        }
      }}>
      <CubeNavigationHorizontal
        initialPage={modalPage}
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
            isNewStory={index !== modalPage}
          />
        ))}
      </CubeNavigationHorizontal>
    </Modal>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-start',
    backgroundColor: 'rgba(255,255,255,255)',
  },
  modal: {
    flex: 1,
    width: '100%',
    height: '100%',
  },
});

export default ModalStory;
