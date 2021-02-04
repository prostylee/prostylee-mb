export const bottomTabs = {
  home: 'Home',
  shop: "ProductCategory",
  account: "Account"
}

export const tabsSetting = {
  configs: {
    initialRouteName: bottomTabs['home'],
    tabBarColor: '#ffffff',
    activeColor: '#823FFD',
    inactiveColor: 'gray'
  },
  tabsNavigator: [
    {
      title: {
        vi: '',
        en: '',
      },
      name: {
        vi: 'New Feed',
        en: 'New Feed'
      },
      screen: bottomTabs['home'],
      option: {
        tabBarIcon: 'NewFeedTab'
      }
    },
     {
      title: {
        vi: '',
        en: '',
      },
      name: {
        vi: 'Cửa hàng',
        en: 'Store'
      },
      screen: bottomTabs['home'],
      option: {
        tabBarIcon: 'StoreTab'
      }
    },
    {
      title: {
        vi: '',
        en: '',
      },
      name: {
        vi: 'Thông báo',
        en: 'Notification'
      },
      screen: bottomTabs['home'],
      option: {
        tabBarIcon: 'NotifTab'
      }
    },
    {
      title: {
        vi: '',
        en: '',
      },
      name: {
        vi: 'Tài khoản',
        en: 'Account'
      },
      screen: bottomTabs['home'],
      option: {
        tabBarIcon: 'AccountTab'
      }
    },
  ]
}