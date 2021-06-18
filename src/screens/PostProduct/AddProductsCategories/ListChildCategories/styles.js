import EStyleSheet from 'react-native-extended-stylesheet';
export default EStyleSheet.create({
  container: {
    height: 250,
  },
  flatlistStyle: {
    backgroundColor: '$white',
    width: '100%',
  },
  contentStyle: {
    paddingHorizontal: 16,
  },
  spaceHeader: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-start',
    justifyContent: 'center',
    paddingHorizontal: 16,
    height: 48,
    width: '100%',
  },
  textSpace: {
    fontSize: 14,
    lineHeight: 20,
    color: '#8B9399',
    fontWeight: '500',
  },
  itemContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
    height: 48,
  },
  itemText: {
    fontSize: 14,
    lineHeight: 24,
    color: '$black',
    paddingLeft: 8,
    fontWeight: '500',
  },
  notFoundText: {
    fontWeight: '400',
    color: '$gray',
  },
  contentWrapper: {
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
  },
});
