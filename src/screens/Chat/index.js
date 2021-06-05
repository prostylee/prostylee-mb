import React from 'react';
import {Header, ThemeView} from '../../components';
import Comment from './Comment';

const Chat = (props) => {

  return (
    <ThemeView isFullView>
      <Header isDefault title={'Chat'} />
      <Comment />
    </ThemeView>
  );
};

Chat.defaultProps = {};

Chat.propTypes = {};

export default Chat;
