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
    height: 45,
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 10,
    margin: 5,
  },
  imageChild: {
    width: 60,
    height: 60,
    marginRight: 5,
  },
});
