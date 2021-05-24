import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {TextInput} from 'react-native-paper';
import styles from '../../theme/form-style';

const CustomTextInput = (props) => {
  const {
    field: {name, onBlur, onChange, value},
    form: {errors, touched, setFieldTouched},
    ...inputProps
  } = props;

  const hasError = errors[name] && touched[name];

  return (
    <View style={customStyles.container}>
      <TextInput
        style={[
          customStyles.textInput,
          props.multiline && {height: props.numberOfLines * 40},
        ]}
        value={value}
        onChangeText={(text) => onChange(name)(text)}
        onBlur={() => {
          setFieldTouched(name);
          onBlur(name);
        }}
        mode="flat"
        error={hasError}
        {...inputProps}
      />
      {hasError && <Text style={styles.errMsg}>{errors[name]}</Text>}
    </View>
  );
};

const customStyles = StyleSheet.create({
  container: {
    width: '100%',
    marginVertical: 12,
  },
  textInput: {
    backgroundColor: 'white',
  },
});

export default CustomTextInput;
