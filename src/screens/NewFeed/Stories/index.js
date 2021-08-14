import React from 'react';
import {StyleSheet, View} from 'react-native';
import {isEmpty} from 'lodash';
import {useDispatch} from 'react-redux';
import {commonActions} from 'reducers';
import StoryHorizontal from './StoryHorizontal';

const Stories = ({stories, loading, targetType}) => {
  const dispatch = useDispatch();

  if (isEmpty(stories) || !stories?.content?.length || loading) {
    return null;
  }

  const onStorySelect = (index) => {
    dispatch(commonActions.toggleStoryModal({show: true, page: index}));
  };

  return (
    <View style={styles.container}>
      <StoryHorizontal
        onPress={onStorySelect}
        targetType={targetType}
        stories={stories}
        loading={loading}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-start',
    backgroundColor: 'rgba(255,255,255,255)',
  },
});

export default Stories;
