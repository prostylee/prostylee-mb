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
import {useNavigation} from '@react-navigation/native';
import {Colors, ImageAnimated as Image} from 'components';

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
import {EmptyPost} from 'svg/profile';
import {EmptyComponent} from 'components';
import i18n from 'i18n';

const {width} = Dimensions.get('window');

const GridView = ({column, wImage, hImage}) => {
  const dispatch = useDispatch();
  const navigation = useNavigation();

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
          showsVerticalScrollIndicator={false}
          showsHorizontalScrollIndicator={false}
          scrollEnabled={false}
          key={column}
          numColumns={column}
          ItemSeparatorComponent={() => <View style={styles.separator} />}
          contentContainerStyle={styles.listContent}
          keyExtractor={(item, index) => 'profileMeTab' + index}
          data={postList || []}
          renderItem={({item, index}) => (
            <TouchableOpacity
              style={[
                styles.viewImage,
                {
                  marginLeft: index % 2 === 0 ? 0 : 12,
                },
              ]}
              onPress={() =>
                navigation.navigate('PostList', {
                  profile: userProfile,
                  postOfUser: {content: postList},
                  selectedPost: item,
                })
              }>
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
          ListEmptyComponent={
            <EmptyComponent
              icon={<EmptyPost />}
              title={i18n.t('mypage.noPost')}
              subTitle={i18n.t('mypage.noPostSub', {
                name: userProfile?.username || '',
              })}
            />
          }
        />
      )}
    </>
  );
};

GridView.defaultProps = {
  column: 2,
  wImage: (width - 42) / 2,
  hImage: (width - 42) / 2,
};

GridView.propTypes = {};

export default GridView;
