import EStyleSheet from 'react-native-extended-stylesheet';

export default EStyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '$white',
  },
  safeAreaTopStyle: {
    backgroundColor: '$bgColor',
  },
  mainWrapper: {
    flex: 1,
    position: 'relative',
  },
  searchBoxContainer: {
    width: '100%',
    paddingHorizontal: 16,
    marginVertical: 8,
  },
  searchBox: {
    borderWidth: 0,
    borderColor: 'transparent',
    backgroundColor: '$bgColor',
  },
  listContainer: {
    flex: 1,
  },
  listContent: {
    paddingHorizontal: 16,
  },
  storeWrapper: {
    width: '100%',
    height: 78,
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderBottomWidth: 0.5,
    borderBottomColor: '$bgColor',
  },
  storeLogo: {
    width: 46,
    height: 46,
  },
  storeInfo: {
    flex: 1,
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-start',
    justifyContent: 'space-between',
    paddingVertical: 20,
    paddingHorizontal: 12,
  },
  storeName: {
    fontSize: 14,
    lineHeight: 20,
    fontWeight: 'bold',
    color: '$black',
  },
  storeLocation: {
    fontSize: 11,
    lineHeight: 16,
    color: '$lightGray',
  },
  storeIcon: {
    width: 12,
    height: '100%',
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-end',
  },
});
