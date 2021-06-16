import React from 'react';
import {Dimensions, View} from 'react-native';
import i18n from 'i18n';

import styles from './styles';

import {ThemeView, Header, TextInputRounded} from 'components';
import {Chip, Divider, Text} from 'react-native-paper';
import {Trending} from 'svg/common';
const WIDTH = Dimensions.get('window').width;
const Search = ({navigation}) => {
  return (
    <>
      <View style={styles.wrapHeader}>
        <Text style={styles.title}>{i18n.t('Search.topSearch')}</Text>
      </View>
      <View style={styles.wrapChip}>
        <Chip
          small
          avatar={<Trending />}
          onPress={() => console.log('Pressed')}
          style={styles.itemChips}>
          Thời trang nam
        </Chip>
        <Chip
          small
          avatar={<Trending />}
          onPress={() => console.log('Pressed')}
          style={styles.itemChips}>
          Phụ kiện da
        </Chip>
        <Chip
          small
          avatar={<Trending />}
          onPress={() => console.log('Pressed')}
          style={styles.itemChips}>
          Sale
        </Chip>
        <Chip
          small
          avatar={<Trending />}
          onPress={() => console.log('Pressed')}
          style={styles.itemChips}>
          Giày da
        </Chip>
        <Chip
          small
          onPress={() => console.log('Pressed')}
          style={styles.itemChips}>
          Best-seller
        </Chip>
        <Chip
          small
          onPress={() => console.log('Pressed')}
          style={styles.itemChips}>
          Hoodie
        </Chip>
        <Chip
          small
          onPress={() => console.log('Pressed')}
          style={styles.itemChips}>
          Quần tây
        </Chip>
        <Chip
          small
          onPress={() => console.log('Pressed')}
          style={styles.itemChips}>
          Dép
        </Chip>
      </View>
      <Divider />
    </>
  );
};

Search.defaultProps = {};

Search.propTypes = {};

export default Search;
