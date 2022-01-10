import {Dimensions} from 'react-native';
import EStyleSheet from 'react-native-extended-stylesheet';

const WIDTH = Dimensions.get('window').width;

export default EStyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '$white',
  },
  titleStyle: {
    fontSize: 16,
    lineHeight: 24,
    fontFamily: '$font1',
    fontWeight: '500',
  },
  headerLeft: {
    width: 80,
    height: '100%',
    paddingLeft: 20,
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
  headerRight: {
    width: 80,
    height: '100%',
    paddingRight: 20,
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-end',
  },
  headerText: {
    fontFamily: '$font1',
    fontSize: 16,
    lineHeight: 24,
    fontWeight: '500',
    color: '$purple',
  },
  headerTextDisabled: {
    fontFamily: '$font1',
    fontSize: 16,
    lineHeight: 24,
    fontWeight: '500',
    color: '$lightGray',
  },
  contentContainer: {
    flex: 1,
  },
  paddingTop12: {
    paddingTop: 12,
  },
  imageViewButton: {
    backgroundColor: 'rgba(0, 0, 0, 0.4)',
    paddingVertical: 9,
    borderRadius: 100,
    paddingHorizontal: 16,
    marginTop: 10,
    marginBottom: 32,
  },
  imageViewButtonText: {
    color: '$white',
    paddingLeft: 8,
  },
  buttonView: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  imageView: {
    width: WIDTH,
    backgroundColor: '$white',
    alignItems: 'center',
    justifyContent: 'center',
  },
  inputView: {
    paddingHorizontal: 16,
    position: 'relative',
  },
  bottomActions: {
    paddingTop: 8,
    paddingBottom: 34,
    flexDirection: 'column',
  },
  bottomActionsBtn: {
    padding: 12,
    paddingVertical: 6,
  },
  bottomActionsText: {
    fontFamily: '$font1',
    fontSize: 16,
    lineHeight: 20,
    fontWeight: '400',
    color: '$purple',
  },
  pickerContainer: {
    position: 'absolute',
    opacity: 0,
    zIndex: -1,
    bottom: -100,
  },
  avatar: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginTop: 16,
  },
});
