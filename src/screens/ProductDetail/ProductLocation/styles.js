import EStyleSheet from 'react-native-extended-stylesheet';
import {Dimensions} from 'react-native';

const {width: WIDTH} = Dimensions.get('window');

export default EStyleSheet.create({
  container: {
    width: WIDTH,
    paddingHorizontal: 16,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
  },
  locationName: {
    width: '100%',
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 8,
  },
  nameLeft: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  infoLogo: {
    width: 32,
    height: 32,
    borderRadius: 16,
  },
  infoNameText: {
    fontSize: 14,
    lineHeight: 20,
    color: '$black',
    paddingLeft: 8,
  },
  infoFollow: {
    paddingVertical: 8,
    paddingLeft: 16,
  },
  followText: {
    fontSize: 14,
    lineHeight: 20,
    color: '$purple',
  },
  mapPlaceholder: {
    width: '100%',
    height: 130,
    backgroundColor: '$bgColor',
  },
  locationDirection: {
    width: '100%',
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  directionText: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
  directionTextStyle: {
    fontSize: 11,
    lineHeight: 16,
    color: '$lightGray',
  },
  directionButton: {
    paddingVertical: 16,
    paddingLeft: 16,
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  directionButtonText: {
    fontSize: 11,
    lineHeight: 16,
    color: '$black',
    paddingLeft: 4,
  },
  directionTextStyleStrong: {
    fontSize: 11,
    lineHeight: 16,
    color: '$black',
  },
});
