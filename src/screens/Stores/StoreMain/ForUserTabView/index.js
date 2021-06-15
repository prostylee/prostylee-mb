import React, {useState, useEffect} from 'react';
import {View, Text} from 'react-native';
import styles from './style';
import ProductList from './ProductList';
import ScrollableTabView, {
  ScrollableTabBar,
} from 'components/ForkReactNativeSrollableTabView';
import {Colors} from 'components';
import {getBottomTabListSelector} from 'redux/selectors/storeMain';
import {useSelector} from 'react-redux';
import {_fetch} from '../../../../services/config';
import {GET, POST, PUT, LIMIT_DEFAULT, SUCCESS} from 'constants';

const ForUserTabView = ({navigation}) => {
  const UNIT_INCREASE = 1;

  const [tabIndex, setTabIndex] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [isLoadmore, setIsLoadmore] = useState(false);

  const [state, setState] = useState({
    hasLoadMore: false,
    currentPage: 0,
    data: [],
  });

  const tabList = useSelector((state) => getBottomTabListSelector(state));

  const _handleRefresh = async () => {
    try {
      setIsRefreshing(true);
      let res = await getData(0);
      if (res.ok && res.data.status === SUCCESS && !res.data.error) {
        let newState = {...state};
        newState.data = res.data.data.content;
        newState.currentPage = 0;
        newState.hasLoadMore =
          UNIT_INCREASE + 1 < res.data.data.totalPages ? true : false;
        setState({...newState});
      } else {
        setState({
          hasLoadMore: false,
          currentPage: 0,
          data: [],
        });
      }
    } catch (err) {
      console.log('INIT DATA ERR', err);
    } finally {
      setIsRefreshing(false);
    }
  };
  const _handleLoadMore = async () => {
    if (state.hasLoadMore) {
      try {
        setIsLoadmore(true);
        let res = await getData(state.currentPage);
        if (res.ok && res.data.status === SUCCESS && !res.data.error) {
          let newState = {...state};
          newState.data = state.data.concat(res.data.data.content);
          newState.currentPage = state.currentPage + UNIT_INCREASE;
          newState.hasLoadMore =
            UNIT_INCREASE + 1 < res.data.data.totalPages ? true : false;
          setState({...newState});
        } else {
          setState({
            hasLoadMore: false,
            currentPage: 0,
            data: [],
          });
        }
      } catch (err) {
        setIsLoadmore(false);
        console.log('INIT DATA ERR', err);
      }
    }
    return;
  };
  const initData = async () => {
    try {
      setIsLoading(true);
      let res = await getData(0);
      console.log('RES TOTAL PAGE', res.totalPages, UNIT_INCREASE + 1);
      if (res.ok && res.data.status === SUCCESS && !res.data.error) {
        let newState = {...state};
        newState.data = res.data.data.content;
        newState.currentPage = 0;
        newState.hasLoadMore =
          UNIT_INCREASE + 1 < res.data.data.totalPages ? true : false;
        setState({...newState});
      } else {
        setState({
          hasLoadMore: false,
          currentPage: 0,
          data: [],
        });
      }
    } catch (err) {
      console.log('INIT DATA ERR', err);
    } finally {
      setIsLoading(false);
    }
  };
  const getData = async (page = 0) => {
    let url = tabList[tabIndex].apiUrl.split('');
    url.splice(0, 3);
    url = url.join('');
    let method = tabList[tabIndex].apiMethod === 'Get' ? GET : null;
    const res = await _fetch(method, url, {
      limit: LIMIT_DEFAULT,
      page: page,
    });
    return res;
  };
  useEffect(() => {
    console.log('TABLIST', tabList);
    if (tabList && tabList.length) {
      initData(tabIndex);
    }
  }, [tabIndex]);
  return (
    <View style={styles.contaner}>
      <View style={styles.titleContainer}>
        <Text style={styles.title}>Dành riêng cho bạn</Text>
      </View>
      <ScrollableTabView
        onChangeTab={({i}) => {
          setTabIndex(i);
        }}
        tabBarBackgroundColor={Colors?.[`$white`]}
        tabBarActiveTextColor={Colors?.['$purple']}
        tabBarUnderlineStyle={{backgroundColor: Colors?.[`$purple`], height: 2}}
        tabBarInactiveTextColor={Colors?.['$lightGray']}
        tabBarTextStyle={{fontSize: 14, fontWeight: '500', textAlign: 'center'}}
        initialPage={0}
        renderTabBar={() => <ScrollableTabBar />}
        locked={false}>
        {tabList && tabList.length ? (
          tabList.map((v) => (
            <View tabLabel={v.tabName} url={v?.apiUrl} method={v?.apiMethod} />
          ))
        ) : (
          <Text>Khong co ket qua</Text>
        )}
      </ScrollableTabView>
      <ProductList
        onRefresh={_handleRefresh}
        onLoadMore={_handleLoadMore}
        isRefreshing={isRefreshing}
        isLoading={isLoading}
        data={state.data}
        isLoadmore={isLoadmore}
        navigation={navigation}
      />
    </View>
  );
};
export default ForUserTabView;
