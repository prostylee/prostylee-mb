import React, {useState} from 'react';
import {Dimensions, TouchableOpacity, View} from 'react-native';

import styles from './styles';

import {Header, ButtonRounded, HeaderBack} from 'components';
import {ActivityIndicator, Chip, Divider, Text} from 'react-native-paper';
import {Colors} from 'components';

import {useDispatch, useSelector, shallowEqual} from 'react-redux';
import {
  getListAttributesSelector,
  getListAttributesLoadingSelector,
} from 'redux/selectors/postProduct';
import {postProductActions} from 'redux/reducers';
const Size = ({
  defaultState = [],
  submitSelect = () => {},
  setModalVisible = () => {},
  data = {},
  allowSelectMultiple = false,
}) => {
  const attributesId = data?.id || 0;
  const listOptions = data?.attributeOptions || [];

  const [selectedItem, setSelectedItem] = useState(defaultState);

  const [isCheckAll, setIsCheckAll] = useState(false);

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
  const isItemActive = (id) => {
    return selectedItem?.findIndex((v) => v.id === id) !== -1;
  };

  React.useEffect(() => {
    if (allowSelectMultiple && selectedItem.length < listOptions.length) {
      setIsCheckAll(false);
    } else if (
      allowSelectMultiple &&
      selectedItem.length === listOptions.length
    ) {
      setIsCheckAll(true);
    }
  }, [selectedItem]);

  return (
    <View style={styles.container}>
      {allowSelectMultiple ? (
        <TouchableOpacity
          style={styles.checkAllButton}
          onPress={() => {
            if (!isCheckAll) {
              setSelectedItem([...listOptions]);
            } else {
              setSelectedItem([]);
            }
            setIsCheckAll(!isCheckAll);
          }}>
          <Text style={{color: '#823FFD', fontSize: 14}}>
            {!isCheckAll ? 'Chọn toàn bộ' : 'Bỏ chọn toàn bộ'}
          </Text>
        </TouchableOpacity>
      ) : null}

      <View style={styles.wrapChip}>
        {listOptions.map((v, i) => (
          <TouchableOpacity
            onPress={() => _handleChecked(v)}
            style={[
              styles.itemChips,
              {
                borderColor: isItemActive(v.id)
                  ? Colors['$purple']
                  : Colors['$line'],
              },
            ]}
            key={`${v}-${i}`}>
            <Text
              style={[
                styles.priceText,
                {
                  color: isItemActive(v.id)
                    ? Colors['$purple']
                    : Colors['$black'],
                },
              ]}>
              {v.name}
            </Text>
          </TouchableOpacity>
        ))}
        <Divider />
      </View>
      <View style={styles.button}>
        <TouchableOpacity onPress={onSubmitPress}>
          <ButtonRounded label="Chọn" />
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default Size;
