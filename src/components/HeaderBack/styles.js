import EStyleSheet from 'react-native-extended-stylesheet';

export default EStyleSheet.create({
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: '3%',
    paddingVertical: '8rem',
    borderBottomWidth: '0.5rem',
    borderColor: '$line',
  },
  headerTitle: {
    fontSize: '$largeText',
    color: '$black',
    fontFamily: '$font1',
  },
  btnWrapper: {
    width: '30rem',
    height: '30rem',
    justifyContent: 'center',
    alignItems: 'center',
  },
});
