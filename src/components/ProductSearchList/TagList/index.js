import {FlatList, View} from 'react-native';
import React from 'react';
import {Chip} from 'react-native-paper';
import {Colors} from 'components';
import styles from './styles';

const MockTag = [
  {
    label: 'Best seller',
    value: {
      bestSeller: true,
    },
  },
  {
    label: 'Gần đây',
    icon: 'map-marker',
    value: {
      atitude: 10.806406363857086,
      longitude: 106.6634168400805,
    },
  },
  {
    label: 'Sale',
    value: {
      sale: true,
    },
  },
];
const TagList = ({onTagPress}) => {
  const [active, setActive] = React.useState(null);
  return (
    <View style={styles.wrapList}>
      <FlatList
        style={styles.wrapChip}
        horizontal
        showsHorizontalScrollIndicator={false}
        data={MockTag}
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
