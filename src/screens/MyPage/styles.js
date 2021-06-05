import EStyleSheet from 'react-native-extended-stylesheet';
const HEADER_HEIGHT = 150;

export default EStyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '$bgColor',
    justifyContent: 'center',
    alignItems: 'center',
  },
  backgroundImageStyle: {
    width: 500, 
    height: 500,
    position: 'absolute',
    top: 0,
    alignSelf: 'center',
    backgroundColor: 'lightblue'
  },
  avatarStyle: {
    top: HEADER_HEIGHT-40, 
    zIndex: 10, 
    position: 'absolute', 
    alignSelf: 'center'
  },
  scrollViewStyle: {
    top: HEADER_HEIGHT, 
    backgroundColor: '$white', 
    alignSelf: 'stretch', 
    flex: 1, 
    borderTopRightRadius: 8, 
    borderTopLeftRadius: 8
  },
  followParentView: {
    paddingTop: 16, 
    flex: 3, 
    flexDirection: 'row', 
    justifyContent: "space-around"
  },
  followChildView: {
    flex: 1, 
    flexDirection: 'column', 
    alignItems: 'center'
  },
  viewType: {
    alignSelf: 'center', 
    borderRadius: 100, 
    backgroundColor: '$white', 
    width: 80, 
    bottom: 7
  },
  headerFull: {
    position: 'absolute', 
    top: 50, 
    zIndex: 11, 
    right: 7, 
    justifyContent: 'space-between', 
    flexDirection: 'row', 
    alignItems: 'center'
  }
});