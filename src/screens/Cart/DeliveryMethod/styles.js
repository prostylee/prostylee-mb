import {Dimensions} from 'react-native';
import EStyleSheet from 'react-native-extended-stylesheet';

const {height, width} = Dimensions.get('window');

export default EStyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: '$bgColorTwo',
  },
  wrapContent: {
    flex: 1,
    flexDirection: 'column',
  },
  wrapBody: {
    backgroundColor: '$white',
  },
  wrapFooter: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'flex-end',
    padding: 10,
  },
  wrapRadioGroup: {
    flexDirection: 'row',
    backgroundColor: '$white',
  },
  wrapRadioButton: {
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderColor: '#F4F5F5',
    backgroundColor: '$white',
  },
  wrapRadio: {
    width: '100%',
    flexDirection: 'column',
    justifyContent: 'space-between',
  },
  wrapInfo: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  wrapRadioTitle: {
    flexDirection: 'column',
  },

  wrapRadioSub: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'flex-end',
  },
  iconRadioSub: {
    marginLeft: 5,
  },
  titleRadio: {
    color: '#333333',
    fontWeight: '400',
    fontSize: 14,
    lineHeight: 20,
  },
  priceRadio: {
    color: '#ED2727',
    fontWeight: '400',
    fontSize: 14,
    lineHeight: 20,
  },
  contentRadio: {
    color: '#8B9399',
    fontWeight: '400',
    fontSize: 14,
    lineHeight: 20,
  },
  wrapLabelDelivery: {
    padding: 10,
  },
  button: {marginTop: '30rem', marginBottom: '20rem', width: '100%'},
  labelDelivery: {
    color: '#8B9399',
    fontWeight: '400',
    fontSize: 14,
    lineHeight: 20,
  },
});
