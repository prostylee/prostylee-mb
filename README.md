# Mobile App for Buyer | ProStylee

## Prerequisite

Setting up the development environment: https://reactnative.dev/docs/environment-setup

- Node
- React Native CLI
- JDK
- Android Studio + AVD
- Xcode

---

## Build and Run at local

Assuming you have all the requirements installed, you can set up and run the project by running:

- `npm install` to install the dependencies
- Run the following steps

### Android

- `cd android`
- `./gradlew clean` to clear file cache/build
- `react-native run-android` to run the Android application (remember to start a simulator or connect an Android phone)

### iOS

- `cd ios`
- `pod install` to install pod dependencies (remember to clear file Pods/Podfile.lock first)
- `react-native run-ios` to run the iOS application (remember to start a simulator or connect an iPhone phone)

---

## Directory structure

```
.
├── android
├── ios
├── src
│   ├── assets
│   ├── components
│   ├── config
│   ├── constants
│   ├── i18n
│   ├── navigators
│   ├── redux
│   ├── screens
│   ├── services
│   ├── svg
│   ├── theme
│   ├── utils
│   └── index.js
├── app.json
├── App.js
├── index.js
├── package.json
└── yarn.lock
```


### src/assets/

Just as the name implies, this contains static files (e.g images, videos,) used in the application.

### src/components/

Shared components used across features are placed in this directory. 

### src/config/

Keep all the configurations including environment specific config for dev and prod, aws, ...

### src/constants/

Where all required static values are stored.

### src/i18n/

Multi-language translation.

### src/navigators/

The base navigation goes here. You can create stack navigator and export it to the application.

### src/redux/

This holds all the redux files, using react-redux for managing state. Inside redux folder you have actions, reducers, store which can easily manage your redux files

redux/saga: All the action files which are using around redux goes here.

redux/reducers: All the reducers which are using around redux goes here.

redux/store: You can put your store inside this redux store folder.

### src/screens/

This directory will hold all the screen components which contain business logic and states in them.

### src/services/

This folder contains logic related to external API communications, it includes:

constants.js - where all required static values are stored.

helper.js - for storing reusable logic.

individual feature files — Each feature file contains api communication logic for a particular feature.

### src/svg/

The global styles defined in your project you can put it over here like colors, font styles like things.

### src/theme/

Contains them config for UI app like Light/Dark theme, font, color, size, ...

### src/utils/

Contains utilities for the app, for example, convert date-time, currency, string, ...

---

## Libraries

- React Native: https://reactnative.dev/

- React native paper: https://callstack.github.io/react-native-paper/getting-started.html

- React Native Formik: https://formik.org/docs/guides/react-native

- AWS Amplify:

    - https://docs.amplify.aws/start/q/integration/react
    - https://docs.amplify.aws/guides/q/platform/js

---

## Build standalone file

### Build Android (APK)

At root folder run command:

> react-native bundle --platform android --dev false --entry-file index.js --bundle-output android/app/src/main/assets/index.android.bundle --assets-dest android/app/src/main/res

Next go to android folder:

> cd android

Then run command:

> ./gradlew assembleDebug

Check generated apk file at: android/app/build/outputs/apk/debug/app-debug.apk

### Build iOS (IPA)

TODO

---

## Deploy app on Store

TODO

## Code push
Sign up account in CodePush https://appcenter.ms

Add new app ios & android

Go to Distribute -> CodePush -> create standard deployment

Get list apps
> appcenter apps list

Get key 
> appcenter codepush deployment list -a ownerName/appName -k

Change key At file
IOS
> prostylee-mb/ios/prostylee/Info.plist
> At <key>CodePushDeploymentKey</key>

Android
> prostylee-mb/android/app/src/main/res/values/strings.xml
> At name="CodePushDeploymentKey"

Deploy
> appcenter codepush release-react -a sunshinesoftware.vn-gmail.com/prostylee-mb-ios -d Staging

