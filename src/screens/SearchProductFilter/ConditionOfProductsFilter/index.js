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

const ConditionOfProductsFilter = ({
  onSelect = () => {},
  defaultState = {},
}) => {
  const [activeSections, setActiveSections] = useState([]);

  const filterAttributeList = useSelector((state) =>
    getProductFilterAttributeListSelector(state),
  );

  const attributeFilterState = defaultState?.attributes;

  const [state, setState] = useState(attributeFilterState);

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
      }
    } else {
      newFilterState[`${attributeKey}`] = optionsId;
    }

    onSelect('attributes', {...newFilterState});
    setState({...newFilterState});
  };
  React.useEffect(() => {
    setState(attributeFilterState);
  }, [attributeFilterState]);
  const isItemActive = (itemId, currentState, allowsMultipleSelection) => {
    if (allowsMultipleSelection) {
      return currentState && currentState.length
        ? currentState.indexOf(itemId) !== -1
          ? true
          : false
        : false;
    } else {
      return currentState === itemId;
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
                    item?.value,
                    state[`${section.key}`],
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
                        item?.value,
                        state[`${section.key}`],
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
            v.type === 1 ? (
              <BlockFilter
                onSelect={onSelect}
                attribute={v}
                defaultState={defaultState}
              />
            ) : null,
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
