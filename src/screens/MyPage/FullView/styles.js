import EStyleSheet from 'react-native-extended-stylesheet';

export default EStyleSheet.create({
  scrollView: {
    backgroundColor: '$bgColor'
  },
  subText: {
    color: '#8B9399'
  },
  firstRowView: {
    flex: 5,
    flexDirection: 'column',
    backgroundColor: 'white', 
    justifyContent:'space-around'
  },
  subTextCheckin: {
    flexDirection: 'row', 
    justifyContent: 'space-around', 
    alignItems: 'center'
  },
  followView: {
    flex: 2, 
    flexDirection: 'row', 
    justifyContent: 'flex-end', 
    alignItems: 'center'
  },
  storeName: {
    flexDirection: 'row', 
    backgroundColor: '#000000', 
    opacity: 0.7,
    position: 'absolute',
    bottom: 10, 
    left: 10,
    borderRadius: 100, 
    padding: 8, 
    justifyContent: 'space-around', 
    alignItems: 'center'
  },
  horizontalDot: {
    flex: 2, 
    flexDirection: 'row', 
    justifyContent: 'flex-end', 
    alignItems: 'center'
  }
});
