import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {TextInput} from 'react-native-paper';
import styles from './styles';

const TextInputFloatingLabel = ({errorText, ...props} = props) => {
  return (
    <View style={customStyles.container}>
      <TextInput
        {...props}
        style={[{...props.style}, customStyles.input]}
        mode="flat"
      />
      {errorText ? <Text style={styles.errMsg}>{errorText}</Text> : null}
    </View>
  );
};

const customStyles = StyleSheet.create({
  container: {
    width: '100%',
    marginVertical: 12,
  },
  input: {
    backgroundColor: 'white',
  },
});

export default TextInputFloatingLabel;
