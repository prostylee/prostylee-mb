import React from 'react';

import EStyleSheet from 'react-native-extended-stylesheet';
import {TouchableOpacity, View, Text} from 'react-native';

const Title = ({
  title,
  subTitle,
  onPress,
  subTitleComponent,
  style,
  containerStyle,
  textStyle,
}) => {
  return (
    <View style={[styles.container, containerStyle && containerStyle]}>
      <Text medium style={[styles.textTitle, style && style]}>
        {title}
      </Text>
      {subTitleComponent ? (
        subTitleComponent
      ) : subTitle ? (
        <TouchableOpacity onPress={onPress} style={styles.touchSubtitle}>
          <Text style={[styles.textStyle, textStyle && textStyle]}>
            {subTitle}
          </Text>
        </TouchableOpacity>
      ) : null}
    </View>
  );
};

const styles = EStyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  textTitle: {
    flex: 1,
  },
  touchSubtitle: {
    paddingVertical: 5,
    justifyContent: 'center',
  },
  textStyle: {
    color: '$purple',
  },
});

Title.defaultProps = {
  onPress: () => {},
};

export default Title;
