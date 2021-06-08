import {StyleSheet, StatusBar} from 'react-native';
export default StyleSheet.create({
  container: {
    flex: 1,
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
  wrapperBorder: {
    flexDirection: 'row',
    paddingTop: 10,
    alignSelf: 'center',
  },
  title: {
    fontSize: 16,
    color: 'gray',
    lineHeight: 20,
  },
  shapes: {
    width: 90,
    height: 90,
    borderColor: 'gray',
    borderWidth: 1,
    borderRadius: 5,
    borderStyle: 'dashed',
    marginHorizontal: 5,
  },
  shapesSelected: {
    width: 90,
    height: 90,
    borderColor: 'gray',
    backgroundColor: '#F4F5F5',
    borderWidth: 1,
    borderRadius: 5,
    borderStyle: 'dashed',
    marginHorizontal: 5,
    alignItems: 'center',
    justifyContent: 'center',
  },
  textPrimary: {
    color: 'gray',
    fontSize: 15,
    paddingTop: 5,
    paddingHorizontal: 10,
  },
  nameProduct: {
    flexDirection: 'row',
  },
  boxWrap: {
    backgroundColor: 'white',
    flexDirection: 'column',
    marginVertical: 5,
    paddingVertical: 30,
    paddingHorizontal: 15,
  },
  imgSelected: {
    width: 90,
    height: 90,
  },
  brandWrap: {
    flexDirection: 'row',
    backgroundColor: 'white',
    justifyContent: 'space-between',
    marginVertical: 5,
    paddingVertical: 30,
    paddingHorizontal: 15,
  },
  brand: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  imgBrand: {
    width: 30,
    height: 30,
    borderRadius: 30,
    marginLeft: 5,
  },
  button: {
    width: '90%',
    alignSelf: 'center',
    paddingBottom: 20,
  },
});
