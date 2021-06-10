import EStyleSheet from 'react-native-extended-stylesheet';
export default EStyleSheet.create({
  flatlistStyle: {
    backgroundColor: '$white',
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
  },
  textSpace: {
    fontSize: 14,
    lineHeight: 20,
    color: '#8B9399',
    fontWeight: 'bold',
  },
  itemContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
    height: 48,
    borderTopWidth: 1,
  },
  itemText: {
    fontSize: 16,
    lineHeight: 24,
    color: '$black',
  },
});
