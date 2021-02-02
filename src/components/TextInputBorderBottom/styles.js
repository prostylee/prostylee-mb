import EStyleSheet from 'react-native-extended-stylesheet';

const styles = EStyleSheet.create({
  textInput: {
    flex: 1,
    fontFamily: '$font1',
    fontSize: '$normalText',
    padding: 0,
    borderColor: '#ccc',
    borderBottomWidth: 1,
    color: '$gray',
    height: '18rem',
  },
});

export default styles;
