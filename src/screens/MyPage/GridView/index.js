/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {
  View,
  FlatList,
  ActivityIndicator,
  TouchableOpacity,
  Dimensions,
} from 'react-native';
import {LIMIT_DEFAULT, PAGE_DEFAULT} from 'constants';
import {useDispatch, useSelector} from 'react-redux';
import {
  ContainerView as Container,
  Colors,
  ImageAnimated as Image,
} from 'components';

import {myPageActions, userSelectors} from 'reducers';
import {ImageGrid} from 'components/Loading/contentLoader';

import styles from './styles';

import {
  getListUserPostLoadingSelector,
  getListUserPostSelector,
  getListUserPostCurrentPageSelector,
  getListUserPostHasLoadmoreSelector,
  getListUserPostLoadmoreLoadingSelector,
} from 'redux/selectors/myPage';

const {width} = Dimensions.get('window');

const GridView = ({column, wImage, hImage, scrollEnabled}) => {
  const dispatch = useDispatch();

  const [isRefreshing, setIsRefreshing] = React.useState(false);

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
    <>
      {loading && !isRefreshing ? (
        [1, 2, 3, 4, 5].map((v, i) => (
          <View style={{paddingVertical: 16, overflow: 'hidden'}} key={v}>
            <ImageGrid />
          </View>
        ))
      ) : (
        <FlatList
          scrollEnabled={scrollEnabled !== undefined ? scrollEnabled : false}
          showsVerticalScrollIndicator={false}
          showsHorizontalScrollIndicator={false}
          key={column}
          numColumns={column}
          columnWrapperStyle={styles.viewCol}
          ItemSeparatorComponent={() => <View style={styles.separator} />}
          keyExtractor={(item, index) => 'profileMeTab' + index}
          data={postList || []}
          renderItem={({item}) => (
            <TouchableOpacity
              activeOpacity={1}
              style={styles.viewImage}
              onPress={() => {}}>
              <Image
                source={
                  item?.imageUrls.length
                    ? {uri: item?.imageUrls[0]}
                    : require('assets/images/default.png')
                }
                resizeMode="cover"
                style={{height: wImage, width: hImage, borderRadius: 4}}
                PlaceholderContent={<ActivityIndicator />}
              />
            </TouchableOpacity>
          )}
          onEndReached={handleLoadMore}
          onEndReachedThreshold={0.5}
          initialNumToRender={10}
          ListFooterComponent={renderFooter}
          refreshing={isRefreshing}
          onRefresh={handleRefresh}
          contentContainerStyle={{paddingTop: 10}}
        />
      )}
    </>
  );
};

GridView.defaultProps = {
  column: 2,
  wImage: (width - 48) / 2,
  hImage: (width - 48) / 2,
};

GridView.propTypes = {};

export default GridView;
