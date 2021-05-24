import {Dimensions} from 'react-native';
import EStyleSheet from 'react-native-extended-stylesheet';
import {center, flexRow} from 'theme/style';

const WIDTH = Dimensions.get('window').width - 30;
export default EStyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '$white',
  },
  item: {
    justifyContent: 'center',
    alignItems: 'center',
    borderLeftWidth: 4,
    backgroundColor: '$white',
    borderLeftColor: '$white',
    height: 80,
  },
  itemActive: {
    backgroundColor: '$purpleActive',
    borderLeftColor: '$purple',
  },
  title: {
    marginTop: 8,
    lineHeight: 11,
    fontSize: 9,
    fontFamily: '$font1',
    fontWeight: '500',
    fontStyle: 'normal',
    textAlign: 'center',
    color: '$black',
  },
  imageThumbnail: {
    justifyContent: 'center',
    alignItems: 'center',
    height: 24,
    width: 24,
  },
  viewFooter: {
    marginBottom: 6,
  },
});
