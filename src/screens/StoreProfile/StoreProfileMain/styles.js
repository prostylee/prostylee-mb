import {Dimensions, Platform} from 'react-native';
import EStyleSheet from 'react-native-extended-stylesheet';
import {center, flexRow} from 'theme/style';

const WIDTH = Dimensions.get('window').width - 30;
export default EStyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '$bgColor',
  },
  contentWrapper: {
    backgroundColor: '$bgColor',
    // paddingTop: Platform.OS === 'android' ? '78rem' : '80rem',
  },
  headerContainer: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    // alignItems: 'center',
    backgroundColor: '#333333',
    borderBottomWidth: 0,
    paddingTop: 20,
  },
  headerWrap: {
    ...flexRow,
    paddingVertical: 10,
    width: WIDTH * 0.7,
  },
  headerLeftContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
    height: 35,

    // borderWidth: 1,
  },
  headerRightContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
    paddingHorizontal: 10,
    width: 80,
    height: 35,

    // borderWidth: 1,
    // borderColor: '#fff',
  },
  locationText: {
    fontSize: 14,
    color: '$white',
    marginLeft: 5,
    fontWeight: '500',
  },
  searchBarContainer: {
    width: '100%',
    paddingHorizontal: 16,
    // height: 32,
    marginBottom: 8,
  },
});
