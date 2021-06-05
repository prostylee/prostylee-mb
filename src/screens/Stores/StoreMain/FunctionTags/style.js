import {Dimensions} from 'react-native';
import EStyleSheet from 'react-native-extended-stylesheet';
import {center, flexRow} from 'theme/style';

const WIDTH = Dimensions.get('window').width;
export default EStyleSheet.create({
  container: {
    width: '100%',
    height: 88,
    paddingHorizontal: 16,
    marginBottom: 8,
    // backgroundColor: '#F7F7F7',
  },
  tagListContainer: {
    backgroundColor: '$white',
    borderRadius: 8,
    height: '100%',
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
  },
  tagItem: {
    flex: 1,
    height: '100%',
    flexDirection: 'column',
    justifyContent: 'flex-start',
    alignItems: 'center',
    paddingTop: 15,
  },
  tagName: {
    fontSize: 10,
    color: '$black',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 10,
    paddingHorizontal: 10,
    textAlign: 'center',
  },
});
