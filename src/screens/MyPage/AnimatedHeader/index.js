import React from 'react';
import { Animated, View, Image } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

const AnimatedHeader = ({ animatedValue, headerHeightConst }) => {
  const insets = useSafeAreaInsets();

  const headerHeight = animatedValue.interpolate({
    inputRange: [0, headerHeightConst + insets.top],
    outputRange: [headerHeightConst + insets.top, insets.top],
    extrapolate: 'clamp'
  });

  return (
    <Animated.Image source={{uri: 'https://reactjs.org/logo-og.png'}} 
      style={{
        width: 500, 
        height: 500,
        position: 'absolute',
        top: 0,
        zIndex: 10,
        alignItems: 'center',
        height: headerHeight,
        backgroundColor: 'lightblue'
      }} 
    />
  );
};

{/* <AnimatedHeader animatedValue={offset} headerHeightConst={HEADER_HEIGHT}/>
      
<ScrollView
  onScroll={Animated.event(
    [{ nativeEvent: { contentOffset: { y: offset } } }],
    { useNativeDriver: false }
  )}
  style={{zIndex: 9, backgroundColor: 'white'}}
>
  {DATA.map(item => (
      <View
        key={item.id}
        style={{
          marginBottom: 20
        }}
      >
        <Text style={{ color: '#101010', fontSize: 32 }}>
          {item.title}
        </Text>
      </View>
    ))}
</ScrollView> */}

export default AnimatedHeader;