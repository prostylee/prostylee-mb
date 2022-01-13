import {FlatList, View} from 'react-native';
import React from 'react';
import {Chip} from 'react-native-paper';
import styles from './styles';

const TagList = ({onTagPress, options, defaultActiveIndex}, ref) => {
  const [active, setActive] = React.useState(defaultActiveIndex);
  React.useImperativeHandle(ref, () => ({
    active: active ? options?.[active] : {},
  }));
  return (
    <View style={styles.wrapList}>
      <FlatList
        style={styles.wrapChip}
        horizontal
        showsHorizontalScrollIndicator={false}
        data={options}
        keyExtractor={(item, index) => `${item.label}-${index}`}
        renderItem={({item, index}) => {
          const name = item.name ? item.name : '';
          return (
            <Chip
              icon={item.icon}
              small
              onPress={() => {
                setActive(index);
                onTagPress({categoryId: item.id});
              }}
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
              {name}
            </Chip>
          );
        }}
      />
    </View>
  );
};

export default React.forwardRef(TagList);
