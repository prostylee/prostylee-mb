import React, {useState} from 'react';
import {
  TextInput,
  Text,
  View,
  TouchableOpacity,
  SafeAreaView,
  FlatList,
} from 'react-native';
import {ActivityIndicator, Checkbox} from 'react-native-paper';

import {Header, ButtonRounded, HeaderBack} from 'components';
import styles from './styles';
import Icon from 'react-native-vector-icons/AntDesign';
import {useDispatch, useSelector, shallowEqual} from 'react-redux';
import {
  getListAttributesSelector,
  getListAttributesLoadingSelector,
} from 'redux/selectors/postProduct';
import {postProductActions} from 'redux/reducers';

const Item = ({item, onPress = () => {}, active}) => {
  return (
    <TouchableOpacity style={styles.item} onPress={onPress}>
      <Checkbox.Android
        status={active ? 'checked' : 'unchecked'}
        color="#3470FB"
      />
      <Text>{item.name}</Text>
    </TouchableOpacity>
  );
};
const CheckBoxAttributes = ({
  defaultState = [],
  submitSelect = () => {},
  setModalVisible = () => {},
  data = {},
  allowSelectMultiple = false,
}) => {
  const attributesId = data?.id || 0;
  const listOptions = data?.attributeOptions || [];

  const [selectedItem, setSelectedItem] = useState(defaultState);

  const _handleChecked = (item) => {
    let idx = selectedItem.findIndex((v) => v.id === item.id);
    if (allowSelectMultiple) {
      if (idx === -1) {
        setSelectedItem([...selectedItem, item]);
      } else {
        let newSelectedList = [...selectedItem];
        newSelectedList.splice(idx, 1);
        setSelectedItem([...newSelectedList]);
      }
    } else if (idx === -1) {
      setSelectedItem([item]);
    } else {
      setSelectedItem([]);
    }
  };

  const onSubmitPress = () => {
    let submitData = [...selectedItem].map((v) => ({
      ...v,
      attributeId: attributesId || 0,
      attrValue: v?.value || '',
    }));
    submitSelect(data?.key, submitData);
    setModalVisible(false);
  };

  const renderItem = ({item}) => {
    return (
      <Item
        item={item}
        active={selectedItem.findIndex((v) => v.id === item.id) !== -1}
        onPress={() => {
          _handleChecked(item);
        }}
      />
    );
  };
  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        data={[...listOptions, {name: 'Khác', id: -1}] || []}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        extraData={selectedItem}
        style={styles.listWrapper}
        ListFooterComponent={
          selectedItem.indexOf(-1) !== -1 ? (
            <View style={styles.inputContainer}>
              <TextInput
                style={styles.input}
                placeholder="Placeholder"
                keyboardType="numeric"
              />
            </View>
          ) : null
        }
      />

      <View style={styles.button}>
        <TouchableOpacity onPress={onSubmitPress}>
          <ButtonRounded label="Chọn" />
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};
export default CheckBoxAttributes;
