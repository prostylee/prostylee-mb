import EStyleSheet from 'react-native-extended-stylesheet';

export default EStyleSheet.create({
  container: {
    flexDirection: 'column',
    alignItems: 'flex-start',
    padding: 5,
  },
  wrapHeader: {
    flexDirection: 'column',
  },
  wrapTitle: {
    color: '#8B9399',
    fontWeight: '500',
    fontSize: 14,
    lineHeight: 20,
  },
  wrapContent: {
    flexDirection: 'row',
  },
  radioButton: {
    borderWidth: 1,
    borderRadius: 4,
    padding: 10,
    margin: 5,
  },
  radioLabel: {
    fontSize: 14,
    lineHeight: 20,
    alignItems: 'center',
    textAlign: 'center',
  },
});
