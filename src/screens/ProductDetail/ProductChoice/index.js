import styles from './styles';

import React from 'react';
import {View, TouchableOpacity, Text} from 'react-native';

/*Hooks*/
import {useNavigation} from '@react-navigation/native';
import {useTheme} from '@react-navigation/native';

/*Translate*/
import i18n from 'i18n';

/*Configs*/
import envConfig from 'config';

/*Svg*/
import {Ruler} from 'svg/common';

/*Proptypes*/
import PropTypes from 'prop-types';

const ProductChoice = ({choiceSelect, choiceList}) => {
  const {colors} = useTheme();
  const navigation = useNavigation();

  const selectChoice = (item) => {
    let list = new Array(...choiceSelect);
    const existedChoice = choiceSelect.findIndex(
      (listItem) => listItem.id === item.id,
    );
    if (existedChoice >= 0) {
      list[existedChoice] = item;
      setChoiceSelect(list);
    } else {
      list = [...list, item];
      setChoiceSelect(list);
    }
  };

  return (
    <View style={styles.container}>
      {choiceList.length
        ? choiceList.map((item, index) => {
            return (
              <View
                key={`choice_${item.id}`}
                style={[
                  styles.choiceItem,
                  {
                    paddingTop: index > 0 ? 8 : 0,
                  },
                ]}>
                <View key={`choice_${index}`} style={styles.titleRow}>
                  <Text style={styles.itemLabel}>{item.label}</Text>
                  {item.key === 'kich_co' || item.key === 'size' ? (
                    <TouchableOpacity
                      style={styles.linkSupport}
                      onPress={() => {
                        navigation.navigate('SimpleWebView', {
                          url: envConfig.sizeHelp,
                          title: i18n.t('productDetail.sizeHelp'),
                        });
                      }}>
                      <Ruler color={colors['$linkBlue']} />
                      <Text style={styles.linkSupportText}>
                        {i18n.t('productDetail.sizeSupport')}
                      </Text>
                    </TouchableOpacity>
                  ) : (
                    <View />
                  )}
                </View>
                <View style={styles.choiceList}>
                  {item.productAttributeResponses.map(
                    (itemChoice, indexChoice) => {
                      let choiceButtonStyle = styles.choiceButton;
                      let choiceButtonTextStyle = styles.choiceButtonText;
                      const choiceIsSelected = choiceSelect.find(
                        (selectItem) => selectItem.value.id === itemChoice.id,
                      );
                      if (
                        choiceIsSelected &&
                        choiceIsSelected.value.id === itemChoice.id
                      ) {
                        choiceButtonStyle = [
                          styles.choiceButton,
                          {backgroundColor: colors['$purple']},
                        ];
                        choiceButtonTextStyle = [
                          styles.choiceButtonText,
                          {color: colors['$white']},
                        ];
                      }
                      return (
                        <View
                          key={`choice_value_${indexChoice}`}
                          style={styles.choiceButtonContainer}>
                          <TouchableOpacity
                            style={choiceButtonStyle}
                            onPress={() => {
                              selectChoice({...item, value: itemChoice});
                            }}>
                            <Text style={choiceButtonTextStyle}>
                              {itemChoice.attrValue}
                            </Text>
                          </TouchableOpacity>
                        </View>
                      );
                    },
                  )}
                </View>
              </View>
            );
          })
        : null}
    </View>
  );
};

ProductChoice.defaultProps = {
  choiceList: [],
  choiceSelect: [],
};

ProductChoice.PropType = {
  choiceSelect: PropTypes.array,
  choiceList: PropTypes.array,
  setChoiceSelect: PropTypes.func,
};

export default ProductChoice;
