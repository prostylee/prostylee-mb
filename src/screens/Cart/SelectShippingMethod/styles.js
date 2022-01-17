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
    paddingHorizontal: 16,
    backgroundColor: '$white',
  },

  wrapAccordion: {
    flex: 1,
    width: '100%',
    flexDirection: 'column',
    marginBottom: 5,
    marginTop: 5,
  },
  titleTop: {
    paddingVertical: 12,
    paddingLeft: 26,
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
    backgroundColor: '$white',
  },
  titleCollapseHeader: {
    color: '$black',
    fontSize: 14,
    lineHeight: 20,
    fontWeight: '400',
    paddingLeft: 6,
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
    alignItems: 'flex-start',
    backgroundColor: '$white',
  },
  wrapLabelRadioButton: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'flex-start',
    textAlign: 'left',
    width: '100%',
    paddingBottom: 0,
    height: 40,
  },
  wrapRadio: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
  },

  wrapRadioTitle: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },

  wrapRadioSub: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'flex-end',
  },
  wrapInfo: {
    flex: 1,
    width: width - 108,
  },
  wrapPrice: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-end',
  },

  titleRadio: {
    fontFamily: '$font1',
    fontSize: 14,
    lineHeight: 20,
    fontWeight: '400',
    color: '$black',
  },
  priceRadio: {
    color: '$red',
    fontWeight: '400',
    fontSize: 14,
    lineHeight: 20,
    fontFamily: '$font1',
  },
  contentRadio: {
    fontFamily: '$font1',
    fontSize: 14,
    lineHeight: 20,
    fontWeight: '400',
    color: '$lightGray',
    paddingTop: 4,
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
