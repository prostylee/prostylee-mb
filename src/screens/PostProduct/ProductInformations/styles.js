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
    fontSize: 16,
    color: 'gray',
    lineHeight: 20,
  },

  nameProduct: {
    flexDirection: 'row',
  },
  boxWrap: {
    backgroundColor: 'white',
    flexDirection: 'column',
    marginVertical: 4,
    paddingVertical: 20,
    paddingHorizontal: 15,
  },
  input: {
    width: '90%',
  },
  inputPrice: {
    borderBottomWidth: 0.3,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  modalBox: {
    overflow: 'hidden',
    alignItems: 'center',
    justifyContent: 'center',
    height: '200%',
    width,
    backgroundColor: 'transparent',
  },
  content: {
    bottom: 0,
    width,
    height: '60%',
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    backgroundColor: 'white',
  },
  contentColors: {
    bottom: 0,
    width,
    height: '70%',
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    backgroundColor: 'white',
  },
  textStyle: {
    fontSize: 22,
  },
  status: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  viewStatus: {
    borderColor: 'black',
    borderWidth: 1,
    borderRadius: 5,
    paddingVertical: 5,
    paddingHorizontal: 10,
  },
  headerModal: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 15,
    paddingVertical: 15,
  },
  titleModal: {
    textAlign: 'center',
    fontSize: 15,
    fontWeight: 'bold',
  },
  button: {
    width: '90%',
    alignSelf: 'center',
    paddingVertical: 20,
  },
});
