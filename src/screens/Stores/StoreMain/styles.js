import {Dimensions} from 'react-native';
import EStyleSheet from 'react-native-extended-stylesheet';
import {center, flexRow} from 'theme/style';

const WIDTH = Dimensions.get('window').width - 30;
export default EStyleSheet.create({
  flex1: {
    flex: 1,
  },
  container: {
    flex: 1,
  },
  wrapper: {
    flex: 1,
    backgroundColor: '$white',
  },
  statusBar: {
    backgroundColor: '#F4F5F5',
  },
  headerContainer: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: 'transparent',
    borderBottomWidth: 0,
    paddingHorizontal: 16,
  },
  headerWrap: {
    ...flexRow,
    paddingVertical: 10,
    width: WIDTH * 0.7,
  },
  headerLeftContainer: {
    flexDirection: 'row',
  },
  headerLeftItem: {
    paddingRight: 16,
  },
  headerTitle: {
    fontFamily: '$font1Bold',
    fontSize: 18,
    lineHeight: 24,
    fontWeight: 'bold',
  },
  headerRightContainer: {
    flexDirection: 'row',
  },
  headerRightItem: {
    paddingLeft: 8,
  },
  locationText: {
    fontSize: 14,
    color: '$white',
    marginLeft: 5,
    fontWeight: '500',
  },
  searchBarContainer: {
    width: '100%',
    height: 35,
    borderRadius: 0,
    elevation: 0,
    paddingHorizontal: 16,
  },
  wrapSearchBar: {
    backgroundColor: '#F4F5F5',
  },
  wrapSearchBarInput: {
    height: '100%',
    fontSize: 14,
    // lineHeight: 16,
    elevation: 0,
    padding: 0,
    marginLeft: -15,
  },
  animatedSearchBarContainer: {
    width: '100%',
    padding: 16,
    flexDirection: 'row',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.2,
    shadowRadius: 1.0,
    elevation: 1,
  },
  listFooterContainer: {
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 30,
    backgroundColor: '$white',
  },
});
