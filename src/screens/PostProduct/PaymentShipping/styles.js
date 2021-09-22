import {StyleSheet, Dimensions} from 'react-native';
const {width, height} = Dimensions.get('window');
export default StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 10,
  },
  wrapper: {
    marginTop: 15,
    backgroundColor: 'white',
    padding: 15,
  },
  headerContain: {
    // paddingBottom: 10,
    // borderBottomWidth: 0,
    // height: 50,
  },
  middleComponent: {
    textAlign: 'center',
    fontSize: 18,
  },
  title: {
    fontSize: 14,
    color: 'gray',
  },
  rightTitle: {
    color: '#823FFD',
    fontSize: 14,
  },
  location: {
    width: '60%',
    paddingTop: 5,
  },
  nameProduct: {
    flexDirection: 'row',
  },

  boxWrap: {
    backgroundColor: 'white',
    flexDirection: 'column',
    marginVertical: 4,
    paddingTop: 10,
    paddingBottom: 10,
    paddingHorizontal: 15,
  },
  status: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  button: {
    width: '90%',
    alignSelf: 'center',
    paddingBottom: 20,
  },
  notiContainer: {
    alignItems: 'center',
    backgroundColor: '#333333',
    paddingLeft: 10,
    height: width / 7,
  },
  notiTitle: {fontSize: 13, fontWeight: '500', color: '#fff'},
  notiSubTitle: {fontSize: 13, fontWeight: '400', color: '#8B9399'},
  notiImage: {
    width: width / 7 - 16,
    height: width / 7 - 16,
    aspectRatio: 1,
    borderRadius: 4,
    marginRight: 12,
  },
  loadingContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
    backgroundColor: 'transparent',
    flexDirection: 'column',
  },
  loadingText: {
    color: '#fff',
    fontSize: 18,
    marginTop: 15,
  },
});
