import {Dimensions} from 'react-native';
import EStyleSheet from 'react-native-extended-stylesheet';
import {center, flexRow} from 'theme/style';

const WIDTH = Dimensions.get('window').width - 30;
export default EStyleSheet.create({
  container: {
    flex: 1,
    borderRadius: 8,
    backgroundColor: '$white',
  },
  wrapItems: {
    flex: 1,
    flexDirection: 'column',
    margin: 1,
  },
  item: {
    justifyContent: 'center',
    alignItems: 'center',
    height: 100,
    backgroundColor: 'transparent',
  },
  imageThumbnail: {
    justifyContent: 'center',
    alignItems: 'center',
    height: 50,
    width: 50,
    borderRadius: 50,
    borderWidth: 1,
    borderColor: '#E9EAEB',
  },
  title: {
    lineHeight: 16,
    fontSize: 11,
    fontFamily: '$font1',
    fontWeight: 'normal',
    fontStyle: 'normal',
    textAlign: 'center',
    color: '$black',
  },
  viewFooter: {
    marginBottom: 6,
  },
});
