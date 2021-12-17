import {Dimensions} from 'react-native';
import EStyleSheet from 'react-native-extended-stylesheet';

const WIDTH = Dimensions.get('window').width - 100;
export default EStyleSheet.create({
  container: {
    flex: 1,
    borderRadius: 8,
    backgroundColor: '$white',
  },
  loadingContainer: {
    flex: 1,
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  wrapList: {borderRadius: 8},
  wrapItems: {
    width: WIDTH / 3,
    flexDirection: 'column',
    alignItems: 'flex-start',
  },
  item: {
    justifyContent: 'center',
    alignItems: 'center',
    height: 100,
    width: WIDTH / 3,
    backgroundColor: 'transparent',
  },
  imageThumbnail: {
    justifyContent: 'center',
    alignItems: 'center',
    height: 50,
    width: 50,
    borderRadius: 25,
    borderWidth: 1,
    borderColor: '$borderColor',
  },
  title: {
    marginTop: 8,
    lineHeight: 16,
    fontSize: 11,
    fontFamily: '$font1',
    fontWeight: '500',
    fontStyle: 'normal',
    textAlign: 'center',
    color: '$black',
  },
  viewFooter: {
    marginBottom: 6,
  },
});
