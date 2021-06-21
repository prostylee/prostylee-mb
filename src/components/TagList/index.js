import {FlatList, View} from 'react-native';
import React from 'react';
import {Chip} from 'react-native-paper';
import styles from './styles';
import PropTypes from 'prop-types';
import {FILTER_TAGS} from 'constants';

const TagList = ({onTagPress, options}) => {
  const [active, setActive] = React.useState(null);
  return (
    <View style={styles.wrapList}>
      <FlatList
        style={styles.wrapChip}
        horizontal
        showsHorizontalScrollIndicator={false}
        data={options}
        renderItem={({item, index}) => (
          <Chip
            icon={item.icon}
            //selected={index === active}
            small
            onPress={() => {
              setActive(index);
              onTagPress(item.value);
            }}
            //selectedColor="#fff"
            style={[
              styles.itemChips,
              {
                backgroundColor: active === index ? '#333333' : '#F4F5F5',
              },
            ]}
            textStyle={{
              color: active === index ? '#ffffff' : '#333333',
            }}
            key={`${item.label}-${index}`}>
            {item.label}
          </Chip>
        )}
      />
    </View>
  );
};
TagList.defaultProps = {
  onTagPress: () => {},
  options: [],
};

TagList.propTypes = {
  onTagPress: PropTypes.func.isRequired,
  options: PropTypes.array.isRequired,
};
export default TagList;
