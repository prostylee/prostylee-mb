import React, {memo} from 'react';
import PropTypes from 'prop-types';
import SmoothPinCodeInput from 'react-native-smooth-pincode-input';
import styles from './style';

export const CODE_LENGTH = 6;

const CustomPinCodeInput = (props) => {
  const {name, value, onChange, onFulfill, ...inputProps} = props;

  const inputRef = React.useRef(null);

  React.useEffect(() => {
    inputRef.current.focus();
  }, []);

  return (
    <SmoothPinCodeInput
      ref={inputRef}
      cellStyle={styles.cellStyle}
      cellStyleFocused={styles.cellStyleFocused}
      textStyle={styles.textStyle}
      textStyleFocused={styles.textStyleFocused}
      cellSpacing={8}
      codeLength={CODE_LENGTH}
      autoFocus={true}
      onFulfill={onFulfill}
      {...inputProps}
      name={name}
      value={value}
      onTextChange={onChange}
    />
  );
};

CustomPinCodeInput.defaultProps = {
  name: 'code',
  value: '',
  onFulfill: () => console.log('Already fulfilled'),
  onChange: (text) => console.log('onTextChange ' + text),
};

CustomPinCodeInput.propTypes = {
  name: PropTypes.string,
  value: PropTypes.string,
  onFulfill: PropTypes.func,
  onChange: PropTypes.func,
};

export default memo(CustomPinCodeInput);
