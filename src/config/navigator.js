export const bottomTabs = {
  newFeed: 'NewFeed',
  shop: "ProductCategory",
  account: "Account"
}

export const tabsSetting = {
  configs: {
    initialRouteName: bottomTabs['newFeed'],
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
      screen: bottomTabs['newFeed'],
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
      screen: bottomTabs['newFeed'],
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
      screen: bottomTabs['newFeed'],
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
      screen: bottomTabs['newFeed'],
      option: {
        tabBarIcon: 'AccountTab'
      }
    },
  ]
}