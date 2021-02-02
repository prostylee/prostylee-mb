import EStyleSheet from 'react-native-extended-stylesheet';

export default EStyleSheet.create({
  datePicker: {
    width: '99.8%',
    height: '30rem',
    borderWidth: 1,
    borderColor: '$borderColor',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: '6rem',
  },
  dateTouchBody: {
    // height: '30rem',
  },
  dateInput: {
    // height: '30rem',
    paddingLeft: '4%',
    borderRadius: '6rem',
    borderWidth: 0,
  },
  dateText: {
    color: '$gray',
    fontSize: '11rem',
    fontFamily: '$font1',
    fontWeight: 'bold',
    marginTop: '-2rem',
  },
  datePickerCustom: {
    justifyContent: 'center',
  },
});
