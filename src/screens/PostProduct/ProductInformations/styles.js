import {StyleSheet, Dimensions} from 'react-native';
const {width, height} = Dimensions.get('window');
export default StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 10,
    height: '100%',
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
    paddingVertical: 20,
    paddingHorizontal: 15,
    marginBottom: 6,
  },

  inputPrice: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    height: 46,
    paddingHorizontal: 16,
  },
  input: {
    width: '100%',
    height: '100%',
    borderBottomWidth: 0.3,
    padding: 0,
    borderColor: '#BBC0C3',
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
    position: 'absolute',
    bottom: 0,
    left: 0,
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
    alignItems: 'flex-start',
  },
  viewStatus: {
    borderColor: 'black',
    borderWidth: 1,
    borderRadius: 5,
    paddingVertical: 5,
    paddingHorizontal: 10,
    marginRight: 5,
    marginBottom: 5,
  },
  headerModal: {
    flexDirection: 'row',
    justifyContent: 'center',
    paddingHorizontal: 16,
    paddingVertical: 16,
    borderBottomWidth: 0.5,
    borderColor: '#F4F5F5',
  },
  titleModal: {
    textAlign: 'center',
    fontSize: 15,
    fontWeight: '500',
  },
  button: {
    width: '90%',
    alignSelf: 'center',
    paddingVertical: 20,
  },
  currencyUnitText: {
    textDecorationLine: 'underline',
    fontSize: 14,
    fontWeight: '400',
    marginLeft: 5,
  },
  verticalLine: {
    color: '#333333',
    fontSize: 14,
    fontWeight: '400',
  },
  closeButton: {
    position: 'absolute',
    top: 15,
    right: 15,
  },
  selectItemContainer: {
    maxWidth: width - 132,
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'flex-end',
  },
});
