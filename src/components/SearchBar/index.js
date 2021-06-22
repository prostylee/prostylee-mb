import React from 'react';
import {View, TextInput, TouchableOpacity, Text} from 'react-native';
import {Search, ClearTextInput} from 'svg/common';
import styles from './styles';
const SearchBar = (props) => {
  const inputRef = React.useRef();
  const [state, setState] = React.useState('');
  const _handleChangeText = (text) => {
    setState(text);
  };
  const _handleClear = () => {
    if (inputRef && inputRef.current) {
      inputRef.current.clear();
      setState('');
      if (props.onClear) {
        props.onClear();
      }
    }
  };
  return (
    <View style={[styles.container, {...props.style}]}>
      <View style={styles.searchIcon}>
        <Search width={16} height={16} />
      </View>
      <TextInput
        ref={inputRef}
        {...props}
        style={[
          styles.inputStyle,
          props.color
            ? {
                color: props.color,
              }
            : null,
        ]}
        onChangeText={(value) => {
          _handleChangeText(value);
          if (props && props?.onChangeText) {
            props.onChangeText(value);
          }
        }}
        blurOnSubmit={true}
        multiline={false}
      />
      <TouchableOpacity style={styles.clearIcon} onPress={_handleClear}>
        {state && state.length ? <ClearTextInput color="#fff" /> : null}
      </TouchableOpacity>
    </View>
  );
};

export default SearchBar;
