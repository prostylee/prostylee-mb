import React, {useState} from 'react';
import {TextInput, TextInput as Input} from 'react-native-paper';
import {StyleSheet, Text, View} from 'react-native';
import styles from '../TextInputFloatingLabel/styles';

const SecureInput = ({errorText, ...props} = props) => {
  const [isSecureTextEntry, setSecureEntry] = useState(true);
  return (
    <View style={customStyles.container}>
      <TextInput
        {...props}
        style={[{...props.style}, customStyles.input]}
        mode="flat"
        secureTextEntry={isSecureTextEntry}
        right={
          <Input.Icon
            name={isSecureTextEntry ? 'eye' : 'eye-off'}
            onPress={() => {
              setSecureEntry(!isSecureTextEntry);
            }}
          />
        }
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

export default SecureInput;
