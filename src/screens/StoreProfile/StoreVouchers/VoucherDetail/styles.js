import EStyleSheet from 'react-native-extended-stylesheet';
import {Dimensions} from 'react-native';
const width = Dimensions.get('window').width;
const styles = EStyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
  },
  topBrackdrop: {
    flex: 2,
    backgroundColor: '#333333',
    position: 'relative',
  },
  bottomBackdrop: {
    flex: 5,
    backgroundColor: '$bgColorTwo',
  },
  ticketContainer: {
    width: width - 32,
    height: '110%',
    position: 'absolute',
    alignSelf: 'center',
    bottom: 0,
    alignItems: 'center',
    backgroundColor: '$white',
    borderTopLeftRadius: 8,
    borderTopRightRadius: 8,
  },

  closeButton: {
    position: 'absolute',
    left: 10,
    top: 60,
    justifyContent: 'center',
    alignItems: 'center',
  },

  topSideWrapper: {
    width: '100%',

    // minHeight: 130,

    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
  },

  bottomSideWrapper: {
    flex: 1,
    width: '100%',
    backgroundColor: '$white',
    borderBottomLeftRadius: 8,
    borderBottomRightRadius: 8,
    paddingVertical: 20,
    paddingHorizontal: 16,
    flexDirection: 'column',
  },
  voucherInfoContainer: {
    backgroundColor: '$white',
    borderTopLeftRadius: 8,
    borderTopRightRadius: 8,
    padding: 16,
    paddingTop: 36,
    position: 'relative',
    width: '100%',
  },
  voucerDetailWrapper: {
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
  voucherImgWrapper: {
    position: 'absolute',
    top: -28,
    alignSelf: 'center',
    width: 60,
    height: 60,
    backgroundColor: '$white',
    padding: 4,
    borderRadius: 30,
    overflow: 'hidden',
  },
  voucherImg: {
    width: '100%',
    height: '100%',
    borderRadius: 28,
  },

  leftCutPoint: {
    width: 20,
    height: 20,
    position: 'absolute',
    top: -10,
    left: -10,
    borderRadius: 10,
    backgroundColor: '$bgColorTwo',
  },
  rightCutPoint: {
    width: 20,
    height: 20,
    position: 'absolute',
    top: -10,
    right: -10,
    borderRadius: 10,
    backgroundColor: '$bgColorTwo',
  },
  descriptionWrapper: {
    flex: 7,
  },
  description: {
    width: '100%',
    height: '100%',
  },
  takeButtonWrapper: {
    width: '100%',
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 16,
  },
  takeButton: {
    width: '100%',
    backgroundColor: '$purple',
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 10,
    paddingHorizontal: 100,
  },
  voucherContent: {
    fontSize: 20,
    lineHeight: 28,
    color: '$black600',
    fontWeight: '500',
    textAlign: 'center',
  },
  title: {
    fontSize: 14,
    fontWeight: '500',
    lineHeight: 20,
    color: '$black600',
  },
  subTitle: {
    fontSize: 14,
    fontWeight: '400',
    lineHeight: 20,
    color: '$lightGray',
  },
  buttonText: {
    color: '$white',
    fontSize: 14,
    fontWeight: '500',
    lineHeight: 20,
  },
});

export default styles;
