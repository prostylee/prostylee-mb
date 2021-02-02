import React from 'react';
import DateTimePickerModal from 'react-native-modal-datetime-picker';

const RnDateTimePicker = ({
  style,
  disabled,
  onValueChange,
  value,
  maxDate,
  minDate,
  format,
  mode,
  visible,
  onClose,
}) => (
  <DateTimePickerModal
    isVisible={visible}
    mode={mode ? mode : 'datetime'}
    onConfirm={onValueChange}
    onCancel={onClose}
    date={value}
    maximumDate={maxDate}
    minimumDate={minDate}
    dateFormat={format}
    headerTextIOS="Chọn thời gian"
    confirmTextIOS="Xác Nhận"
    cancelTextIOS="HỦY"
  />
);

export default RnDateTimePicker;
