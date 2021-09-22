import {Dimensions, Platform} from 'react-native';
import EStyleSheet from 'react-native-extended-stylesheet';
import {center, flexRow} from 'theme/style';

const WIDTH = Dimensions.get('window').width - 30;
export default EStyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '$white',
  },
  contentWrapper: {
    backgroundColor: '$bgColor',
    // paddingTop: Platform.OS === 'android' ? '78rem' : '80rem',
  },
  headerContainer: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-around',
    // alignItems: 'center',
    backgroundColor: '#333333',
    // opacity: 0.79,
    borderBottomWidth: 0,
    paddingTop: 20,
    // zIndex: 99,
  },
  animatedHeader: {
    flexDirection: 'column',
    backgroundColor: '#fff',
  },
  animatedHeaderContent: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '100%',
    paddingVertical: 0,
  },
  headerSearchBar: {
    maxWidth: WIDTH - 160,
    backgroundColor: '#F4F5F5',
  },
  headerWrap: {
    ...flexRow,
    paddingVertical: 10,
    width: WIDTH * 0.7,
  },
  headerLeftContainer: {
    height: 35,
    width: '10%',
    justifyContent: 'center',
    alignItems: 'center',
    paddingLeft: 6,
  },
  headerSearchBarBlack: {
    maxWidth: WIDTH - 160,
    backgroundColor: 'rgba(255,255,255,0.1)',
    zIndex: 10,
  },
  headerRightContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
    paddingHorizontal: 10,
    maxWidth: 80,
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
