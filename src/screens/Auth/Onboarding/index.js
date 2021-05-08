import React from 'react';
import {View, Text, FlatList} from 'react-native';
import {Image, ContainerWithoutScrollView, ButtonRounded} from 'components';

import {useTheme} from '@react-navigation/native';

import styles from './styles';
import I18n from 'i18n';
import {useBackHandler} from '@react-native-community/hooks';
import {commonActions} from 'reducers';
import {useDispatch} from 'react-redux';

import {ON_BOARDING as data} from 'constants/onboarding';

import {dim} from 'utils/common';

const WIDTH = dim.width;
const HEIGHT = dim.height;

const Index = (props) => {
  const [activeIndex, setActiveIndex] = React.useState(0);

  const flatListRef = React.useRef(null);

  //dispatch
  const dispatch = useDispatch();

  //BackHandler handle
  useBackHandler(() => {
    return true;
  });

  //Theme
  const {colors} = useTheme();

  //Other funcs
  const onSliderScrollEnd = (e) => {
    let contentOffset = e.nativeEvent.contentOffset;
    let viewSize = e.nativeEvent.layoutMeasurement;

    let i = Math.floor(contentOffset.x / viewSize.width);
    setActiveIndex(i);
  };

  const onPressItem = async (index) => {
    if (index < data.length - 1) {
      flatListRef.current.scrollToIndex({animated: true, index: index + 1});
    } else {
      await dispatch(commonActions.showOnboardingScreen(false));
      props.navigation.navigate('SignInOptions');
    }
  };

  const _renderItem = ({item, index}) => {
    const labelBtn =
      index === data.length - 1 ? I18n.t('getStarted') : I18n.t('next');
    return (
      <View style={[styles.pageWrapper, {width: WIDTH, height: HEIGHT}]}>
        <View style={[styles.imgWrapper, styles[`onboarding${index}`]]}>
          <Image
            style={styles.image}
            source={item.image}
            resizeMode="contain"
          />
        </View>
        <View style={styles.body}>
          <View style={styles.contentWrapper}>
            <View style={styles.pagination}>
              {data.map((x, y) => {
                const backgroundColor =
                  activeIndex === y ? '#111111' : 'rgba(0, 0, 0, 0.1)';
                return <View style={[styles.dot, {backgroundColor}]} key={y} />;
              })}
            </View>
            <Text style={styles.title}>{item.title}</Text>
            <Text style={styles.content}>{item.content}</Text>
          </View>
          <View style={styles.btnWrapper}>
            <ButtonRounded
              onPress={() => onPressItem(index)}
              label={labelBtn}
            />
          </View>
        </View>
      </View>
    );
  };
  return (
    <View style={styles.container}>
      <ContainerWithoutScrollView
        safeAreaTopStyle={styles.safeAreaTopStyle}
        bgStatusBar={colors['$bgColor']}>
        <View style={styles.mainWrapper}>
          <FlatList
            ref={flatListRef}
            data={data}
            renderItem={_renderItem}
            keyExtractor={(item, index) => `${index}`}
            extraData={props}
            horizontal
            pagingEnabled={true}
            bounces={false}
            showsHorizontalScrollIndicator={false}
            onMomentumScrollEnd={onSliderScrollEnd}
          />
        </View>
      </ContainerWithoutScrollView>
    </View>
  );
};

export default Index;
