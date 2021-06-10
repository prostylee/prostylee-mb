import React from 'react';
import {Header, ThemeView} from '../../components';
import Comment from './Comment';
import ChatOne2One from './ChatOne2One';

const Chat = (props) => {

  return (
    <ThemeView isFullView>
      <Header isDefault title={'Chat'} />
      {/*<Comment />*/}
      <ChatOne2One />
    </ThemeView>
  );
};

Chat.defaultProps = {};

Chat.propTypes = {};

export default Chat;
