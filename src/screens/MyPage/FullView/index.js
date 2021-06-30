/* eslint-disable react-native/no-inline-styles */
import React, {useState} from 'react';
import {View, FlatList, ActivityIndicator, Dimensions} from 'react-native';

import {useDispatch, useSelector} from 'react-redux';
import {LIMIT_DEFAULT, PAGE_DEFAULT} from 'constants';
import {myPageActions, userSelectors} from 'reducers';
import {
  ContainerView as Container,
  Colors,
  ImageAnimated as Image,
  PostView,
} from 'components';

import {
  getListUserPostLoadingSelector,
  getListUserPostSelector,
  getListUserPostCurrentPageSelector,
  getListUserPostHasLoadmoreSelector,
  getListUserPostLoadmoreLoadingSelector,
} from 'redux/selectors/myPage';
import {PostLoading} from 'components/Loading/contentLoader';

import styles from './styles';

const FullView = ({column, wImage, hImage, scrollEnabled}) => {
  const dispatch = useDispatch();

  const [isRefreshing, setIsRefreshing] = useState(false);

  const userProfile = useSelector((state) =>
    userSelectors.getUserProfile(state),
  );

  const loading = useSelector((state) => getListUserPostLoadingSelector(state));

  const postListSelector = useSelector((state) =>
    getListUserPostSelector(state),
  );

  const page = useSelector((state) =>
    getListUserPostCurrentPageSelector(state),
  );

  const hasLoadmore = useSelector((state) =>
    getListUserPostHasLoadmoreSelector(state),
  );

  const postList = postListSelector?.content || [];

  const loadMoreLoading = useSelector((state) =>
    getListUserPostLoadmoreLoadingSelector(state),
  );

  const handleLoadMore = () => {
    if (hasLoadmore) {
      dispatch(
        myPageActions.getListUserPostLoadmore({
          userId: userProfile?.id,
          page: page,
          limit: LIMIT_DEFAULT,
        }),
      );
    }
  };
  const handleRefresh = () => {
    setIsRefreshing(true);
    dispatch(
      myPageActions.getListUserPost({
        userId: userProfile?.id,
        page: PAGE_DEFAULT,
        limit: LIMIT_DEFAULT,
      }),
    );
  };
  React.useEffect(() => {
    if (!loading) setIsRefreshing(false);
  }, [loading]);

  const renderFooter = () => {
    if (!loadMoreLoading) {
      return <View style={styles.viewFooter} />;
    }

    return (
      <View style={[styles.viewFooter, styles.viewLoadingFooter]}>
        <ActivityIndicator animating color={Colors.$purple} size="small" />
      </View>
    );
  };
  return (
    <Container fluid style={styles.container}>
      {loading && !isRefreshing ? (
        <>
          <View style={{padding: 16, overflow: 'hidden'}}>
            <PostLoading />
          </View>
          <View style={{padding: 16, overflow: 'hidden'}}>
            <PostLoading />
          </View>
        </>
      ) : (
        <FlatList
          scrollEnabled={scrollEnabled !== undefined ? scrollEnabled : false}
          showsVerticalScrollIndicator={false}
          showsHorizontalScrollIndicator={false}
          key={column}
          numColumns={column}
          columnWrapperStyle={styles.viewCol}
          ItemSeparatorComponent={() => <View style={styles.separator} />}
          keyExtractor={(item, index) => item?.id + '-' + index}
          data={postList}
          renderItem={({item}) => (
            <PostView item={item} disabledLike={true} disabledComment={true} />
          )}
          onEndReached={handleLoadMore}
          onEndReachedThreshold={0.5}
          initialNumToRender={10}
          ListFooterComponent={renderFooter}
          refreshing={isRefreshing}
          onRefresh={handleRefresh}
        />
      )}
    </Container>
  );
};

export default FullView;
