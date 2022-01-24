import React from 'react';
import {Text, View} from 'react-native';
import {useSelector, useDispatch} from 'react-redux';
import {useRoute} from '@react-navigation/native';
import VerticalFeed from 'screens/NewFeed/VerticalFeed';
import {ThemeView, Header} from 'components';
import i18n from 'i18n';
import {targetTypeSelector} from 'redux/selectors/common';

import {postOfUserSlector} from 'redux/selectors/user';

import styles from './styles';

const FullView = () => {
  const dispatch = useDispatch();
  const route = useRoute();
  const profile = route?.params?.profile || {};
  const postOfUser = route?.params?.postOfUser || {};
  const selectedPost = route?.params?.selectedPost || {};
  const targetType = useSelector((state) => targetTypeSelector(state));
  // const postOfUser = useSelector((state) => postOfUserSlector(state));
  return (
    <ThemeView style={styles.container} isFullView>
      <Header
        middleComponent={
          <View style={styles.headerMiddle}>
            <Text style={styles.name}>{profile.username || ''}</Text>
            <Text style={styles.nameLabel}>{i18n.t('post')}</Text>
          </View>
        }
        isDefault
        containerStyle={styles.header}
      />
      <VerticalFeed
        targetType={targetType}
        loading={() => {}}
        handleRefresh={() => {}}
        handleLoadMore={() => {}}
        newFeedList={postOfUser}
        refreshing={false}
        isProfile
        loadMoreLoading={false}
      />
    </ThemeView>
  );
};

export default FullView;
