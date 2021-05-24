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
  infoTitle: {
    width: '100%',
    paddingVertical: 16,
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  infoLeft: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  infoTitleText: {
    fontSize: 14,
    lineHeight: 20,
    color: '$black',
    paddingLeft: 8,
  },
  infoContent: {
    padding: 16,
    width: WIDTH,
  },
  infoContentText: {
    fontSize: 14,
    lineHeight: 20,
    color: '$lightGray',
  },
});
