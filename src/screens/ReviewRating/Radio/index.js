import React, {useState} from 'react';
import {StyleSheet, View, Text, Animated, TouchableOpacity} from 'react-native';

import {Divider} from 'react-native-paper';

import {CheckIcon} from 'svg/common';

const Select = ({defaultActive, onChange, data, isRating}) => {
  const [active, setActive] = useState(defaultActive);
  const [activeColor, setActiveColor] = useState(false);

  const onChoose = (item) => {
    setActive(item);
    onChange(item);
  };

  return (
    <Animated.View style={styles.container}>
      {data.map((item) => (
        <TouchableOpacity
          onPressIn={() => setActiveColor(item.value)}
          onPressOut={() => setActiveColor(null)}
          style={styles.wrapBlockOne}
          key={item.key}
          onPress={() => onChoose(item.value)}>
          {isRating ? (
            item.label
          ) : (
            <View style={styles.wrapBlockFilter}>
              <Text
                style={{
                  color:
                    active === item.value || activeColor === item.value
                      ? '#823ffd'
                      : '#303030',
                  ...styles.contentBlockOne,
                }}>
                {item.label}
              </Text>
            </View>
          )}

          {active === item.value && (
            <View style={styles.wrapBlockFilter}>
              <Text
                style={{
                  color: active === item.value ? '#823ffd' : '#303030',
                }}>
                <CheckIcon />
              </Text>
            </View>
          )}
        </TouchableOpacity>
      ))}
      <Divider />
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    marginTop: 5,
    marginBottom: 5,
  },
  wrapBlockOne: {
    height: 45,
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  wrapBlockFilter: {
    padding: 10,
    justifyContent: 'center',
    alignContent: 'center',
    alignItems: 'center',
    display: 'flex',
  },
  contentBlockOne: {
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
    flex: 1,
    display: 'flex',
    justifyContent: 'center',
  },
});

Select.defaultProps = {data: [], defaultActive: null, isRating: false};

export default Select;
