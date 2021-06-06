import React from 'react';
import {Text, View, TouchableOpacity} from 'react-native';
import styles from './styles';
import {Divider} from 'react-native-paper';

const ResultProductSearchResultItem = ({item, index, navigation}) => {
  return (
    <View style={styles.wrapItems}>
      <TouchableOpacity
        onPress={() => {
          navigation.navigate('SearchProducts');
        }}>
        <View style={styles.item}>
          <Text style={styles.title}>{item}</Text>
        </View>
      </TouchableOpacity>
      <View style={{paddingLeft: 16, paddingRight: 16}}>
        <Divider />
      </View>
    </View>
  );
};

ResultProductSearchResultItem.defaultProps = {};

ResultProductSearchResultItem.propTypes = {};

export default ResultProductSearchResultItem;
