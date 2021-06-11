import EStyleSheet from 'react-native-extended-stylesheet';
export default EStyleSheet.create({
  container: {
    width: 240,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  messLeft: {
    flexDirection: 'column',
    paddingVertical: 30,
  },
  messContentLeft: {
    flexDirection: 'row',
    paddingVertical: 20,
  },
  img: {
    alignItems: 'center',
    width: 20,
    height: 20,
    borderRadius: 50,
  },
  contentLeft: {
    backgroundColor: 'white',
    padding: 5,
    marginBottom: 5,
    borderRadius: 5,
  },
  imgContent: {
    width: 100,
    height: 100,
    borderRadius: 5,
    marginBottom: 5,
  },
  messRight: {
    justifyContent: 'flex-start',
    paddingRight: 10,
  },
  contentRight: {
    backgroundColor: '#823FFD',
    padding: 5,
    borderRadius: 5,
    marginBottom: 5,
  },
});
