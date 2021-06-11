import React, {useState} from 'react';
import {TextInput, Text, View, TouchableOpacity, FlatList} from 'react-native';
import {CheckBox} from 'react-native-elements';

import styles from './styles';

import {
  getProductDeliveryTypeSelector,
  getProductDeliveryTypeLoadingSelector,
} from 'redux/selectors/postProduct';
import {useSelector} from 'react-redux';
import {Checkbox} from 'react-native-paper';

const ColorInfor = ({
  setSelectedDeliveryType = () => {},
  selectedDeliveryType = [],
}) => {
  const [isCheckAll, setIsCheckAll] = useState(false);

  const loading = useSelector((state) =>
    getProductDeliveryTypeLoadingSelector(state),
  );
  const deliveryTypeSelector = useSelector((state) =>
    getProductDeliveryTypeSelector(state),
  );
  const listDeliveryType = deliveryTypeSelector.content || [];

  const _handleChecked = (item) => {
    let idx = selectedDeliveryType.findIndex((v) => v.id === item.id);
    if (idx === -1) {
      if (selectedDeliveryType.length + 1 === listDeliveryType.length) {
        setIsCheckAll(true);
      }
      setSelectedDeliveryType([...selectedDeliveryType, item]);
    } else {
      let newSelectedList = [...selectedDeliveryType];
      newSelectedList.splice(idx, 1);

      setSelectedDeliveryType([...newSelectedList]);
    }
  };

  const isActiveItems = (item) => {
    return selectedDeliveryType.findIndex((v) => v.id === item.id) !== -1;
  };

  React.useEffect(() => {
    if (selectedDeliveryType.length < listDeliveryType.length) {
      setIsCheckAll(false);
    }
  }, [selectedDeliveryType]);

  const renderItem = ({item}) => {
    return (
      <TouchableOpacity
        style={styles.item}
        onPress={() => _handleChecked(item)}>
        <Checkbox.Android
          color="#3470FB"
          status={isActiveItems(item) ? 'checked' : 'unchecked'}
        />

        <Text style={styles.itemTitle}>{item.name}</Text>
      </TouchableOpacity>
    );
  };
  return (
    <>
      <View style={styles.status}>
        <Text style={styles.title}>Phương thức vận chuyển</Text>
        <TouchableOpacity
          onPress={() => {
            if (!isCheckAll) {
              setSelectedDeliveryType([...listDeliveryType]);
            } else {
              setSelectedDeliveryType([]);
            }
            setIsCheckAll(!isCheckAll);
          }}>
          <Text style={styles.rightTitle}>
            {!isCheckAll ? 'Chọn toàn bộ' : 'Bỏ chọn toàn bộ'}
          </Text>
        </TouchableOpacity>
      </View>
      <FlatList
        data={listDeliveryType}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        style={{paddingTop: 10, marginHorizontal: -20}}
      />
    </>
  );
};
export default ColorInfor;
