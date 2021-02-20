/* eslint-disable react-hooks/exhaustive-deps */
import React, {useEffect, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {ScrollView} from 'react-native';

import {ThemeView} from 'components';

const PAGE_DEFAULT = 0;
const LIMIT_DEFAULT = 12;
const NUMBER_OF_PRODUCT = 3;
const TYPE_STORE = 'STORE';
const TYPE_USER = 'USER';

const StoryBoard = ({navigation}) => {
  return (
    <ThemeView isFullView>
    </ThemeView>
  );
};

StoryBoard.defaultProps = {};

StoryBoard.propTypes = {};

export default StoryBoard;
