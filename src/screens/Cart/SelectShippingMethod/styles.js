import {Dimensions} from 'react-native';
import EStyleSheet from 'react-native-extended-stylesheet';

const {height, width} = Dimensions.get('window');

export default EStyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '$bgColorTwo',
  },
  wrapContent: {
    flex: 1,
  },
  contentContainer: {
    flex: 1,
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: width,
  },

  wrapList: {
    width: '100%',
  },

  wrapAccordion: {
    flex: 1,
    width: '100%',
    flexDirection: 'column',
    marginBottom: 5,
    marginTop: 5,
  },
  titleCollapseHeader: {
    backgroundColor: '$white',
    color: '$lightGray',
    fontSize: 14,
    lineHeight: 20,
    fontWeight: '400',
    padding: 16,
  },
  wrapRadioGroup: {
    display: 'flex',
    flexDirection: 'column',
    backgroundColor: '$white',
    justifyContent: 'center',
    alignItems: 'center',
  },
  wrapRadioButton: {
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderColor: '#F4F5F5',
    backgroundColor: '$white',
  },
  wrapLabelRadioButton: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'flex-start',
    textAlign: 'left',
  },
  wrapRadio: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
  },

  wrapRadioTitle: {
    flexDirection: 'column',
  },

  wrapRadioSub: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'flex-end',
  },
  wrapPrice: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-end',
  },

  titleRadio: {
    color: '#333333',
    fontWeight: '400',
    fontSize: 11,
    lineHeight: 16,
  },
  priceRadio: {
    color: '$red',
    fontWeight: '400',
    fontSize: 11,
    lineHeight: 16,
  },
  contentRadio: {
    color: '#8B9399',
    fontWeight: '400',
    fontSize: 11,
    lineHeight: 16,
  },

  bottomButton: {
    height: 72,
    padding: 16,
    width: '100%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  btnCheckout: {
    width: '100%',
  },
});
