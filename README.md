### ProStylee Application
## Author: Diep Bui
## Last update: 01/02/2021

*************************************************
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

*************************************************
## Site map Prostylee

Thư mục src nằm cùng cấp với folder Android & IOS
Chứa các file: 
* assets(chứa các thư mục hình ảnh - banner - logo -icon -font)
* navigator: Xử lý điều hướng các page trong app
* services/api: chứa hàm call api
* config: chứa path/url cấu hình gọi từ Server
* ultils: chứa các hàm sử lý format cho String - Number - Html - Url
* I18n: Khai báo hàm gọi đa ngôn ngữ
* store: redux store
* saga: redux saga
* reducers: config reducers
* data: chứa data cục bộ JSON - AsyncStorage
* components: Chứa các thành phần của cấu thành UI của app như Button - datepicker - header - sidebar - tabs …
* screens: Chứa các page UI của app như Home - Login - Profile …
* Index: Chứa các hàm xử lý firebase, login session, network ...

*************************************************
## UI Design Patterns
* Native Base
- Docs and Usage: https://docs.nativebase.io/Components.html#Components
* React native paper
- Docs and Usage: https://callstack.github.io/react-native-paper/getting-started.html
## Deploy app on Store