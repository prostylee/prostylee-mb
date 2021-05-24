import React from 'react';
import {useSelector} from 'react-redux';

import {ThemeView} from 'components';

import Stories from './Stories';

import {targetTypeSelector} from 'redux/selectors/common';
import {getStories} from 'redux/selectors/newFeed';

const StoryBoard = ({navigation}) => {
  const stories = useSelector((state) => getStories(state));
  const targetType = useSelector((state) => targetTypeSelector(state));
  return (
    <ThemeView isFullView>
      <Stories
        navigation={navigation}
        targetType={targetType}
        stories={stories?.content || []}
      />
    </ThemeView>
  );
};

StoryBoard.defaultProps = {};

StoryBoard.propTypes = {};

export default StoryBoard;
