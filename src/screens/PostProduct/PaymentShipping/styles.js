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
    paddingBottom: 10,
    borderBottomWidth: 0,
    height: 50,
  },
  middleComponent: {
    textAlign: 'center',
    fontSize: 18,
    fontWeight: 'bold',
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
    paddingVertical: 15,
  },
});
