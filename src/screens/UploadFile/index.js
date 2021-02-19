import React from 'react';
import {Image, View} from 'react-native';

import {ButtonOutlined} from 'components';
import {Auth, Storage} from 'aws-amplify';
import * as ImagePicker from 'react-native-image-picker';
import {useDispatch} from 'react-redux';
import {commonActions} from '../../redux/reducers';
import RootNavigator from '../../navigator/rootNavigator';

const Index = () => {
  const dispatch = useDispatch();
  const [photo, setPhoto] = React.useState(null);
  const [uploadedPhoto, setUploadedPhoto] = React.useState(null);
  const [currentUserName, setCurrentUserName] = React.useState('');

  React.useEffect(() => {
    Auth.currentAuthenticatedUser()
      .then((user) => {
        // console.log('USER ' + JSON.stringify(user));
        setCurrentUserName(user.username);
      })
      .catch((err) => console.log(err));
  }, []);

  const chooseFile = () => {
    const options = {
      noData: true,
    };

    ImagePicker.launchImageLibrary(options, (response) => {
      if (response.uri) {
        setPhoto(response);
      }
    });
  };

  const uploadToStorage = async () => {
    console.log('uploadToStorage ');
    try {
      if (!photo || !photo.uri) {
        return;
      }
      console.log('photo ' + JSON.stringify(photo));
      dispatch(commonActions.toggleLoading(true));

      Storage.configure({level: 'protected'}); // public | protected | private
      const response = await fetch(photo.uri);

      const blob = await response.blob();

      Storage.put(
        photo.fileName || new Date().getMilliseconds() + '.jpg',
        blob,
        {
          contentType: 'image/jpeg',
        },
      )
        .then((result) => {
          console.log('Uploaded with result = ' + JSON.stringify(result));

          getUrl(result.key);
        })
        .catch((err) => console.log(err));

      console.log('Upload successfully');
      dispatch(commonActions.toggleLoading(false));
    } catch (err) {
      console.log(err);
    }
  };

  const getUrl = async (key) => {
    const signedURL = await Storage.get(key);
    setUploadedPhoto(signedURL);
    console.log('signedURL ' + signedURL);
  };

  return (
    <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
      {photo && (
        <Image
          source={{uri: photo.uri}}
          style={{width: 250, height: 250, margin: 20}}
        />
      )}

      <View style={{flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', width: '90%', padding: 10}}>
        <ButtonOutlined label="Back" onPress={() => RootNavigator.goBack()} />
        <ButtonOutlined label="Choose" onPress={chooseFile} />
        <ButtonOutlined label="Upload" onPress={uploadToStorage} />
      </View>

      {uploadedPhoto && (
        <Image
          source={{uri: uploadedPhoto}}
          style={{width: 250, height: 250, margin: 20}}
        />
      )}
    </View>
  );
};

export default Index;
