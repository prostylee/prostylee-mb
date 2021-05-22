import {Dimensions} from 'react-native';
import EStyleSheet from 'react-native-extended-stylesheet';

export default EStyleSheet.create({
  container: {
    flex: 1,
    borderRadius: 8,
    paddingLeft: 5,
    paddingRight: 5,
    marginTop: 5,
    marginBottom: 5,
  },
  header: {
    height: 45,
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
  author: {
    margin: 5,
  },

  content: {margin: 5},

  textAuthor: {
    color: '#333333',
    fontSize: 14,
    fontWeight: '500',
  },
  textContent: {
    color: '#8B9399',
  },
  images: {
    height: 60,
    width: Dimensions.get('window').width,
    alignItems: 'center',
    marginTop: 10,
    margin: 5,
    flexDirection: 'row',
    flexWrap: 'wrap',
    display: 'flex',
    flex: 0,
  },
  imageChild: {
    width: 60,
    height: 60,
    display:'flex',
    flex:0,
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  img_modal: {
    height: Dimensions.get('window').height,
    width: Dimensions.get('window').width,
    resizeMode: 'contain',
  },
});
