import React from 'react';

import {ThemeView, Header} from 'components';

const Chat = (props) => {
  return (
    <ThemeView isFullView>
      <Header isDefault title={'Comment'} />
      
    </ThemeView>
  );
};

Chat.defaultProps = {};

Chat.propTypes = {};

export default Chat;
