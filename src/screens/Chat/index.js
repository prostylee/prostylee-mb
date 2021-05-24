import React from 'react';

import {ThemeView, Header} from 'components';

const Chat = (props) => {
  return (
    <ThemeView isFullView>
      <Header isDefault title={'Chat'} />
    </ThemeView>
  );
};

Chat.defaultProps = {};

Chat.propTypes = {};

export default Chat;
