import {FlatList, View} from 'react-native';
import React from 'react';
import {Chip} from 'react-native-paper';
import {Colors} from 'components';
import styles from './styles';
import {FILTER_TAGS} from 'constants';

const TagList = ({onTagPress}) => {
  const [active, setActive] = React.useState(null);
  return (
    <View style={styles.wrapList}>
      <FlatList
        style={styles.wrapChip}
        horizontal
        showsHorizontalScrollIndicator={false}
        data={FILTER_TAGS}
        renderItem={({item, index}) => (
          <Chip
            icon={item.icon}
            selectedColor={Colors?.['$purple']}
            selected={index === active}
            small
            onPress={() => {
              setActive(index);
              onTagPress(item.value);
            }}
            style={styles.itemChips}
            key={`${item.label}-${index}`}>
            {item.label}
          </Chip>
        )}
      />
    </View>
  );
};
export default TagList;
