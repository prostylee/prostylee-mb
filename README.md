### ProStylee Application

## Author: Diep Bui

## Last update: 01/02/2021

---

## Running the project

Assuming you have all the requirements installed, you can setup and run the project by running:

- `npm install` to install the dependencies
- Run the following steps

* Android

- `cd android`
- `./gradlew clean` to clear file cache/build
- `react-native run-android` to run the Android application (remember to start a simulator or connect an Android phone)

* iOS

- `cd ios`
- `pod install` to install pod dependencies (remember to clear file Pods/Podfile.lock first)
- `react-native run-ios` to run the iOS application (remember to start a simulator or connect an iPhone phone)

---

## Site map Prostylee

Thư mục src nằm cùng cấp với folder Android & IOS
Chứa các file:

- assets(chứa các thư mục hình ảnh - banner - logo -icon -font)
- navigator: Xử lý điều hướng các page trong app
- services/api: chứa hàm call api
- config: chứa path/url cấu hình gọi từ Server
- ultils: chứa các hàm sử lý format cho String - Number - Html - Url
- I18n: Khai báo hàm gọi đa ngôn ngữ
- store: redux store
- saga: redux saga
- reducers: config reducers
- data: chứa data cục bộ JSON - AsyncStorage
- components: Chứa các thành phần của cấu thành UI của app như Button - datepicker - header - sidebar - tabs …
- screens: Chứa các page UI của app như Home - SignIn - Profile …
- theme: Chứa file config cho UI app (Light/Dark theme)
- Index: Chứa các hàm xử lý firebase, signIn session, network ...

---

## UI Design Patterns

- Native Base

* Docs and Usage: https://docs.nativebase.io/Components.html#Components

- React native paper

* Docs and Usage: https://callstack.github.io/react-native-paper/getting-started.html

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

## Deploy app on Store

TODO