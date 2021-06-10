import React, {useCallback, useState} from 'react';
import {
  Dimensions,
  View,
  Text,
  Image,
  TouchableOpacity,
  SafeAreaView,
  FlatList,
} from 'react-native';
import styles from './style';
import Icon from 'react-native-vector-icons/Ionicons';
import {ThemeView, Header, ButtonRounded} from 'components';
import {
  IconButton,
  Searchbar,
  RadioButton,
  Divider,
  Chip,
} from 'react-native-paper';
import ListMessage from './ListMessage';
const WIDTH = Dimensions.get('window').width;

const Message = ({navigation}) => {
  const [searchQuery, setSearchQuery] = React.useState('');
  const onChangeSearch = (query) => {
    setSearchQuery(query);
    handlerSearch(query);
  };

  return (
    <SafeAreaView style={{flex: 1}}>
      <Header
        isDefault
        containerStyle={styles.headerContain}
        leftStyle={{
          height: 30,
          fontWeight: 'bold',
        }}
        middleComponent={<Text style={styles.middleComponent}>Tin nhắn</Text>}
      />
      <View style={{backgroundColor: 'white'}}>
        <Searchbar
          style={{
            width: '95%',
            backgroundColor: '#F4F5F5',
            height: 35,
            alignSelf: 'center',
            marginBottom: 5,
            elevation: -5,
          }}
          inputStyle={{
            backgroundColor: '#F4F5F5',
            fontSize: 14,
            marginLeft: -10,
          }}
          placeholder={'Tìm kiếm'}
          onChangeText={onChangeSearch}
          value={searchQuery}
        />
      </View>
      <ListMessage />
    </SafeAreaView>
  );
};
export default Message;
