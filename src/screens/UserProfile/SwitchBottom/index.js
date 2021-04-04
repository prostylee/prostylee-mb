import React from 'react';
import {TouchableOpacity, View} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';

import {commonActions} from 'redux/reducers';

import {isFullViewSelector} from 'redux/selectors/common';

import styles from './styles';

import {Grid, FullSolid, Full, GridSolid} from 'svg/common';

const SwitchBottom = () => {
  const dispatch = useDispatch();

  const isFullView = useSelector((state) => isFullViewSelector(state));

  const _toogleGrid = () => {
    dispatch(commonActions.toggleViewMode(false));
  };

  const _toogleViewFull = () => {
    dispatch(commonActions.toggleViewMode(true));
  };
  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={_toogleGrid} style={styles.touch}>
        {!isFullView ? <GridSolid /> : <Grid />}
      </TouchableOpacity>
      <TouchableOpacity onPress={_toogleViewFull} style={styles.touch}>
        {isFullView ? <FullSolid /> : <Full />}
      </TouchableOpacity>
    </View>
  );
};

SwitchBottom.defaultProps = {};

SwitchBottom.propTypes = {};

export default SwitchBottom;
