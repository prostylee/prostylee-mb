import React, {useState} from 'react';
import {TextInput as Input} from 'react-native-paper';
import {CustomTextInput} from '../index';

const CustomSecureInput = (props) => {
  const [isSecureTextEntry, setSecureEntry] = useState(true);
  return (
    <CustomTextInput
      {...props}
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
  );
};

export default CustomSecureInput;
