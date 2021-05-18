import EStyleSheet from 'react-native-extended-stylesheet';

export default EStyleSheet.create({
  container: {
    width: '100%'
  },
  wrapBlockOne: {
    height: 45,
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  wrapBlockFilter: {
    height: 45,
    width: 105,
    alignItems: 'center',
    paddingRight: 16,
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  contentBlockOne: {
    height: 45,
    width: 80,
    alignItems: 'center',
    paddingLeft: 16,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  textSort: {
    lineHeight: 18,
    fontSize: 13,
    color: '#8B9399',
    marginLeft: 5,
  },
  textSpace: {
    lineHeight: 25,
    fontSize: 25,
    color: '#F4F5F5',
    marginRight: 10,
  },
  wrapBlockChips: {
    height: 45,
    width: '100%',
    alignItems: 'flex-start',
    paddingLeft: 16,
  },
  itemChips: {
    height: 32,
    marginTop: 5,
    marginRight: 10
  },
});
