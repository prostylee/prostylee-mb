export const bottomTabs = {
  newFeed: 'NewFeed',
  shop: 'ProductCategory',
  account: 'Account',
};

export const tabsSetting = {
  configs: {
    initialRouteName: bottomTabs.newFeed,
    tabBarColor: '#ffffff',
    activeColor: '#823FFD',
    inactiveColor: 'gray',
  },
  tabsNavigator: [
    {
      title: {
        vn: '',
        en: '',
      },
      name: {
        vn: 'Trang chủ',
        en: 'New Feed',
      },
      screen: bottomTabs.newFeed,
      option: {
        tabBarIcon: 'NewFeedTab',
      },
    },
    {
      title: {
        vn: '',
        en: '',
      },
      name: {
        vn: 'Cửa hàng',
        en: 'Store',
      },
      screen: bottomTabs.newFeed,
      option: {
        tabBarIcon: 'StoreTab',
      },
    },
    {
      title: {
        vn: '',
        en: '',
      },
      name: {
        vn: 'Post News',
        en: 'Post News',
      },
      isTurnOfLabel: true,
      screen: bottomTabs.newFeed,
      option: {
        tabBarIcon: 'MainTab',
        tabBarIconFocused: 'MainTabFocused',
      },
    },
    {
      title: {
        vn: '',
        en: '',
      },
      name: {
        vn: 'Thông báo',
        en: 'Notification',
      },
      screen: bottomTabs.newFeed,
      option: {
        tabBarIcon: 'NotifTab',
      },
    },
    {
      title: {
        vn: '',
        en: '',
      },
      name: {
        vn: 'Tài khoản',
        en: 'Account',
      },
      screen: bottomTabs.account,
      option: {
        tabBarIcon: 'AccountTab',
      },
    },
  ],
};
