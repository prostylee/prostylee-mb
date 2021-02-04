import React from 'react';
import {View, Text, FlatList} from 'react-native';
import {Image, Container} from 'components';

import styles from './styles';

import {onboarding as data} from 'data/localJson';

import {dim} from 'utils/common';

const WIDTH = dim.width;
const HEIGHT = dim.height;

const Index = (props) => {
  const _renderItem = ({item, index}) => {
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
          <Text style={styles.title}>{item.title}</Text>
        </View>
      </View>
    );
  };
  return (
    <View style={styles.container}>
      <Container>
        <View style={styles.mainWrapper}>
          <FlatList
            data={data}
            renderItem={_renderItem}
            keyExtractor={(item, index) => `${index}`}
            extraData={props}
            horizontal
            pagingEnabled={true}
            bounces={false}
            // snapToInterval
          />
        </View>
      </Container>
    </View>
  );
};

export default Index;
