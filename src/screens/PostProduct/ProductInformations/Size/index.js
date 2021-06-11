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
  navigation,
  defaultState = [],
  setModalVisible = () => {},
  setSelectedSizes = () => {},
}) => {
  const dispatch = useDispatch();

  const [isCheckAll, setIsCheckAll] = useState(false);
  const loading = useSelector((state) =>
    getListAttributesLoadingSelector(state),
  );
  const listAttributesSelector = useSelector(
    (state) => getListAttributesSelector(state),
    shallowEqual,
  );
  const listAttributes = listAttributesSelector.content || [];
  const attributesId =
    listAttributes.filter((v) => v.key === 'size')?.[0]?.id || 0;
  const listSize =
    listAttributes.filter((v) => v.key === 'size')?.[0]?.attributeOptions || [];

  const [activeItem, setActiveItem] = useState(null);
  const [selectedItem, setSelectedItem] = useState(defaultState);

  const _handleChecked = (item) => {
    let idx = selectedItem.findIndex((v) => v.id === item.id);
    if (idx === -1) {
      setSelectedItem([...selectedItem, item]);
    } else {
      let newSelectedList = [...selectedItem];
      newSelectedList.splice(idx, 1);
      setSelectedItem([...newSelectedList]);
    }
  };

  const onSubmitPress = () => {
    let submitData = [...selectedItem].map((v) => ({
      ...v,
      attributeId: attributesId || 0,
      attrValue: v?.value || '',
    }));
    setSelectedSizes(submitData);

    setModalVisible(false);
  };
  const isItemActive = (id) => {
    return selectedItem?.findIndex((v) => v.id === id) !== -1;
  };

  React.useEffect(() => {
    if (selectedItem.length < listSize.length) {
      setIsCheckAll(false);
    }
  }, [selectedItem]);

  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={styles.checkAllButton}
        onPress={() => {
          if (!isCheckAll) {
            setSelectedItem([...listSize]);
          } else {
            setSelectedItem([]);
          }
          setIsCheckAll(!isCheckAll);
        }}>
        <Text style={{color: '#823FFD', fontSize: 14}}>
          {!isCheckAll ? 'Chọn toàn bộ' : 'Bỏ chọn toàn bộ'}
        </Text>
      </TouchableOpacity>
      <View style={styles.wrapChip}>
        {loading ? (
          <ActivityIndicator />
        ) : (
          listSize.map((v, i) => (
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
          ))
        )}
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
