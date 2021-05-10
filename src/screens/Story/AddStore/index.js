import React from 'react';
import {View, FlatList, TouchableOpacity, Text} from 'react-native';
import {Image, ContainerWithoutScrollView, ButtonRounded} from 'components';
import {getStatusBarHeight} from 'react-native-status-bar-height';
import {hasNotch} from 'react-native-device-info';
import {useTheme, useRoute} from '@react-navigation/native';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import {newFeedActions} from 'reducers';

import styles from './styles';
import i18n from 'i18n';
import {useBackHandler} from '@react-native-community/hooks';
import {commonActions, newFeedSelectors} from 'reducers';
import {useDispatch, useSelector} from 'react-redux';

import {dim} from 'utils/common';

const WIDTH = dim.width;
const HEIGHT = dim.height;

const AddStore = (props) => {
  const [activeIndex, setActiveIndex] = React.useState(0);
  const [storeList, setStoreList] = React.useState([]);
  const notchHeight = getStatusBarHeight() + (hasNotch() ? 34 : 0);
  const flatListRef = React.useRef(null);

  const storeMini = useSelector((state) =>
    newFeedSelectors.getStoreMini(state),
  );

  //dispatch
  const dispatch = useDispatch();

  //BackHandler handle
  useBackHandler(() => {
    return true;
  });

  const getStoreList = React.useCallback(async () => {
    await dispatch(newFeedActions.getStoreMini());
  }, [dispatch]);

  React.useEffect(() => {
    getStoreList();
  }, [getStoreList]);

  React.useEffect(() => {
    if (storeMini && storeMini?.content && storeMini?.content?.length) {
      setStoreList(storeMini.content);
      console.log(JSON.stringify(storeMini.content[0], null, 4))
    }
  }, [storeMini]);

  //Theme
  const {colors} = useTheme();
  const onPressItem = async (index) => {
    // if (index < data.length - 1) {
    //   flatListRef.current.scrollToIndex({animated: true, index: index + 1});
    // } else {
    //   await dispatch(commonActions.showOnboardingScreen(false));
    //   props.navigation.navigate('SignInOptions');
    // }
  };

  const _renderItem = ({item, index}) => {
    // const labelBtn =
    //   index === data.length - 1 ? i18n.t('getStarted') : i18n.t('next');
    // return (
    //   <View style={[styles.pageWrapper, {width: WIDTH, height: HEIGHT}]}>
    //     <View style={[styles.imgWrapper, styles[`onboarding${index}`]]}>
    //       <Image
    //         style={styles.image}
    //         source={item.image}
    //         resizeMode="contain"
    //       />
    //     </View>
    //     <View style={styles.body}>
    //       <View style={styles.contentWrapper}>
    //         <View style={styles.pagination}>
    //           {data.map((x, y) => {
    //             const backgroundColor =
    //               activeIndex === y ? '#111111' : 'rgba(0, 0, 0, 0.1)';
    //             return <View style={[styles.dot, {backgroundColor}]} key={y} />;
    //           })}
    //         </View>
    //         <Text style={styles.title}>{item.title}</Text>
    //         <Text style={styles.content}>{item.content}</Text>
    //       </View>
    //       <View style={styles.btnWrapper}>
    //         <ButtonRounded
    //           onPress={() => onPressItem(index)}
    //           label={labelBtn}
    //         />
    //       </View>
    //     </View>
    //   </View>
    // );
  };

  return (
    <View style={styles.container}>
      <ContainerWithoutScrollView
        safeAreaTopStyle={styles.safeAreaTopStyle}
        bgStatusBar={colors['$bgColor']}>
        <View style={styles.mainWrapper}>
          <FlatList
            ref={flatListRef}
            data={storeList}
            renderItem={_renderItem}
            keyExtractor={(item, index) => `${index}`}
            extraData={props}
            horizontal
            pagingEnabled={true}
            bounces={false}
            showsHorizontalScrollIndicator={false}
          />
        </View>
      </ContainerWithoutScrollView>
    </View>
  );
};

export default AddStore;
