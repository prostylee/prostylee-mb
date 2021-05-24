/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {View, TextInput} from 'react-native';

import styles from './styles';

const ic_search = require('assets/icons/search.png');

import Image from '../Image';

const SearchBox = ({
  value,
  placeholder,
  onChangeText,
  style,
  editable,
  onSearch,
  onFocus,
  autoFocus,
  inputRef,
  returnKeyType,
  showIcon,
}) => (
  <View style={styles.container} pointerEvent="box-only">
    <TextInput
      style={[
        styles.textInput,
        {backgroundColor: editable === false ? '#f2f2f2' : 'transparent'},
        style,
      ]}
      placeholder={placeholder}
      value={value}
      onChangeText={onChangeText}
      editable={editable}
      placeholderTextColor="#828282"
      returnKeyType={returnKeyType ? returnKeyType : 'search'}
      onSubmitEditing={onSearch}
      onFocus={onFocus}
      autoFocus={autoFocus}
      ref={inputRef}
    />
    {showIcon && (
      <Image
        source={ic_search}
        style={styles.ic_search}
        resizeMethod="resize"
        tintColor="#828282"
      />
    )}
  </View>
);

export default SearchBox;
