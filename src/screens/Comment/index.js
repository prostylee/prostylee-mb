import React from 'react';

import {ThemeView, Header} from 'components';
import FeedItem from 'screens/NewFeed/VerticalFeed/item';
import {useRoute} from '@react-navigation/native';
import {useSelector} from 'react-redux';
import {targetTypeSelector} from 'redux/selectors/common';

const Chat = (props) => {
  const route = useRoute();
  const targetType = useSelector((state) => targetTypeSelector(state));
  const newFeedItem = route?.params?.newFeedItem || {};
  console.log('newFeedItem', newFeedItem)
  return (
    <ThemeView isFullView>
      <Header isDefault title={'Comment'} />
      <FeedItem newFeedItem={newFeedItem} targetType={targetType} />
    </ThemeView>
  );
};

Chat.defaultProps = {};

Chat.propTypes = {};

export default Chat;
