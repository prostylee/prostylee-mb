import React from 'react';
import {View, Text, FlatList} from 'react-native';
import {Image, ContainerWithoutScrollView} from 'components';

import styles from './styles';

import {onboarding as data} from 'data/localJson';

import {dim} from 'utils/common';

import {Button} from 'react-native-paper';

const WIDTH = dim.width;
const HEIGHT = dim.height;

const Index = (props) => {
  const [activeIndex, setActiveIndex] = React.useState(0);

  const flatListRef = React.useRef(null);

  const onSliderScrollEnd = (e) => {
    let contentOffset = e.nativeEvent.contentOffset;
    let viewSize = e.nativeEvent.layoutMeasurement;

    let i = Math.floor(contentOffset.x / viewSize.width);
    setActiveIndex(i);
  };

  const onPressItem = (index) => {
    if (index < data.length - 1) {
      flatListRef.current.scrollToIndex({animated: true, index: index + 1});
    } else {
      props.navigation.navigate('LoginOptions');
    }
  };

  const _renderItem = ({item, index}) => {
    const labelBtn = index === data.length - 1 ? 'Get Started' : 'Next';
    return (
      <View style={[styles.pageWrapper, {width: WIDTH, height: HEIGHT}]}>
        <View style={styles.imgWrapper}>
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
            <Button
              mode="contained"
              uppercase={false}
              onPress={() => onPressItem(index)}
              style={styles.btn}
              labelStyle={styles.btnLabel}>
              {labelBtn}
            </Button>
          </View>
        </View>
      </View>
    );
  };
  return (
    <View style={styles.container}>
      <ContainerWithoutScrollView safeAreaTopStyle={styles.safeAreaTopStyle}>
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