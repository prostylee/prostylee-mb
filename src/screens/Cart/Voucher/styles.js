import {Dimensions} from 'react-native';
import EStyleSheet from 'react-native-extended-stylesheet';

const {height, width} = Dimensions.get('window');

export default EStyleSheet.create({
  buttonWrapper: {
    backgroundColor: '$purple',
  },
  button: {
    height: '30rem',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: '4rem',
  },

  disabledButton: {
    backgroundColor: '$line',
  },

  labelStyle: {
    fontSize: 14,
    lineHeight: 20,
    fontFamily: '$font1',
    textAlign: 'center',
    color: '$white',
  },
  container: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: '$bgColorTwo',
  },
  wrapContent: {
    flex: 1,
    flexDirection: 'column',
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

  wrapItems: {
    padding: 5,
    flexDirection: 'row',
    backgroundColor: '$white',
    marginBottom: 5,
  },
  productItem: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  wrapImageThumbnail: {
    position: 'relative',
  },
  wrapTextContent: {
    flex: 1,
    marginLeft: 5,
    justifyContent: 'space-between',
    alignItems: 'flex-start',
  },
  wrapInfo: {
    alignItems: 'flex-start',
  },
  wrapAmount: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  wrapTextSale: {
    position: 'absolute',
    bottom: 8,
    left: 8,
    padding: 4,
    borderRadius: 3,
  },
  cardItem: {
    marginBottom: 10,
  },
  wrapCardItem: {
    flexDirection: 'column',
    justifyContent: 'space-between',
    flex: 1,
    padding: 10,
  },
  wrapContentVoucher: {
    flexDirection: 'row',
  },
  wrapExpiredVoucher: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  wrapInfo: {
    flexDirection: 'column',
    flex: 1,
    paddingLeft: 10,
    paddingRight: 10,
  },
  wrapExpiredText: {
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'column',
  },

  dashedLine: {
    borderStyle: 'dashed',
    borderWidth: 1,
    borderColor: '#E9EAEB',
    marginLeft: 20,
    marginRight: 20,
  },
  imageThumbnail: {
    justifyContent: 'center',
    alignItems: 'center',
    height: 48,
    width: 48,
    borderRadius: 24,
    borderWidth: 1,
    borderColor: '#E9EAEB',
  },
  textCategory: {
    color: '#8B9399',
    fontSize: 13,
    lineHeight: 18,
    fontWeight: '400',
  },
  textDescription: {
    color: '#333333',
    fontWeight: '500',
    fontSize: 14,
    lineHeight: 20,
  },
  textExpired: {
    color: '#8B9399',
    fontSize: 13,
    lineHeight: 18,
    fontWeight: '400',
  },
});
