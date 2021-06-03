import React, {useState} from 'react';
import {SafeAreaView, Text, View, TouchableOpacity} from 'react-native';
import {Divider, RadioButton} from 'react-native-paper';
import styles from './styles';
import Accordion from 'react-native-collapsible/Accordion';
import Icon from 'react-native-vector-icons/Ionicons';
import {
  getProductFilterAttributeListSelector,
  getProductFilterState,
} from 'redux/selectors/search/productFilter';
import {useDispatch, useSelector} from 'react-redux';
import {Colors} from 'components';
import {searchActions} from 'redux/reducers';

import BlockFilter from './BlockFilter';

const ConditionOfProductsFilter = () => {
  const [activeSections, setActiveSections] = useState([]);
  const [value, setValue] = React.useState(' ');

  const dispatch = useDispatch();

  const filterAttributeList = useSelector((state) =>
    getProductFilterAttributeListSelector(state),
  );

  const filterState = useSelector((state) => getProductFilterState(state));
  const attributeFilterState = filterState?.attributes;
  const categoryFilterState = filterState.category;

  const setSections = (sections) => {
    setActiveSections(sections.includes(undefined) ? [] : sections);
  };
  const _handleCheck = (attributeKey, optionsId, allowsMultipleSelection) => {
    let newFilterState = {...attributeFilterState};
    let currentAttributeStateItem = newFilterState[`${attributeKey}`];
    if (allowsMultipleSelection) {
      let flag =
        currentAttributeStateItem && currentAttributeStateItem.length
          ? currentAttributeStateItem.indexOf(optionsId)
          : -999;

      if (flag < 0) {
        newFilterState[`${attributeKey}`] =
          currentAttributeStateItem && currentAttributeStateItem.length
            ? [...currentAttributeStateItem, optionsId]
            : [optionsId];
      } else {
        currentAttributeStateItem.splice(flag, 1);
        //newFilterState[`${attribute.id}`] = currentAttributeStateItem;
      }
    } else {
      newFilterState[`${attributeKey}`] = optionsId;
    }

    dispatch(
      searchActions.setProductFilterState({
        ...filterState,
        attributes: {...newFilterState},
      }),
    );
  };

  const isItemActive = (itemId, state, allowsMultipleSelection) => {
    if (allowsMultipleSelection) {
      return state && state.length
        ? state.indexOf(itemId) !== -1
          ? true
          : false
        : false;
    } else {
      return state === itemId;
    }
  };

  const renderHeader = (section, _, isActive) => {
    return (
      <View
        duration={400}
        style={[styles.header, isActive ? styles.active : styles.inactive]}
        transition="backgroundColor">
        <Text style={styles.headerText}>{section.label}</Text>
        <Icon name="caret-down-outline" />
      </View>
    );
  };

  const renderContent = (section, _, isActive) => {
    return (
      <View
        duration={400}
        style={[styles.content, isActive ? styles.active : styles.inactive]}
        transition="backgroundColor">
        {section &&
        section.attributeOptions &&
        section.attributeOptions.length ? (
          section.attributeOptions.map((item, index) => (
            <View key={`${item?.id}-${index}`}>
              <RadioButton.Item
                onPress={() =>
                  _handleCheck(
                    section.key,
                    item.value,
                    section.allowsMultipleSelection,
                  )
                }
                color={Colors['$purple']}
                style={styles.itemContainer}
                value={item?.id}
                status={
                  isItemActive(
                    item?.id,
                    attributeFilterState[`${section.key}`],
                    section.allowsMultipleSelection,
                  )
                    ? 'checked'
                    : 'unchecked'
                }
                uncheckedColor={'#fff'}
                labelStyle={[
                  styles.labelStyle,
                  {
                    color:
                      // attributeFilterState?.[`${section.id}`] === item.id
                      isItemActive(
                        item?.id,
                        attributeFilterState[`${section.key}`],
                        section.allowsMultipleSelection,
                      )
                        ? Colors['$purple']
                        : Colors['$black'],
                  },
                ]}
                label={item.name}
                mode="android"
                position="leading"
                labelStyle={{
                  justifyContent: 'flex-start',
                  textAlign: 'left',
                }}
              />
              <Divider />
            </View>
          ))
        ) : (
          <Text style={{color: Colors['$lightGray']}}>Nothing</Text>
        )}
      </View>
    );
  };

  return (
    <SafeAreaView>
      {filterAttributeList && filterAttributeList.length
        ? filterAttributeList.map((v) =>
            v.type === 1 ? <BlockFilter attribute={v} /> : null,
          )
        : null}
      <View style={styles.wrapper}>
        <Accordion
          activeSections={activeSections}
          sections={
            filterAttributeList && filterAttributeList.length
              ? filterAttributeList?.filter((v) => v.type !== 1)
              : []
          }
          touchableComponent={TouchableOpacity}
          renderHeader={renderHeader}
          renderContent={renderContent}
          duration={200}
          onChange={setSections}
        />
      </View>
    </SafeAreaView>
  );
};
export default ConditionOfProductsFilter;
