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
  console.log('FILTER STATE', filterState);

  // const attributeFilterState = {};
  // const categoryFilterState = -1;

  const setSections = (sections) => {
    setActiveSections(sections.includes(undefined) ? [] : sections);
  };
  const _handleCheck = (sectionId, attributeId) => {
    let newFilterState = {...attributeFilterState};
    newFilterState[`${sectionId}`] = attributeId;
    // setFilterState(newFilterState);
    dispatch(
      searchActions.setProductFilterState({
        attributes: {...newFilterState},
        category: categoryFilterState,
      }),
    );
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
        <RadioButton.Group
          onValueChange={(newValue) => _handleCheck(section.id, newValue)}
          value={attributeFilterState?.[`${section.id}`]}>
          {section &&
          section.attributeOptions &&
          section.attributeOptions.length ? (
            section.attributeOptions.map((item, index) => (
              <View key={`${item?.id}-${index}`}>
                <RadioButton.Item
                  color={Colors['$purple']}
                  style={styles.itemContainer}
                  value={item?.id}
                  uncheckedColor={'#fff'}
                  labelStyle={[
                    styles.labelStyle,
                    {
                      color:
                        attributeFilterState?.[`${section.id}`] === item.id
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
        </RadioButton.Group>
      </View>
    );
  };

  return (
    <SafeAreaView>
      <View style={styles.wrapper}>
        <Accordion
          activeSections={activeSections}
          sections={
            filterAttributeList && filterAttributeList.length
              ? filterAttributeList?.filter(
                  (v) => v.key !== 'kich_co' && v.key !== 'Size',
                )
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
