import i18n from 'i18n';

export const bottomTabs = {
  newFeed: 'NewFeed',
  shop: 'ProductCategory',
  account: 'Account',
  store: 'Stores',
  notification: 'Notifications',
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
      title: '',
      name: i18n.t('bottomTab.newFeed'),
      screen: bottomTabs.newFeed,
      option: {
        tabBarIcon: 'NewFeedTab',
        tabBarIconSolid: 'NewFeedTabSolid',
      },
    },
    {
      title: '',
      name: i18n.t('bottomTab.store'),
      screen: bottomTabs.store,
      option: {
        tabBarIcon: 'StoreTab',
        tabBarIconSolid: 'StoreTabSolid',
      },
    },
    {
      title: '',
      name: i18n.t('bottomTab.post'),
      isTurnOfLabel: true,
      screen: bottomTabs.newFeed,
      option: {
        tabBarIcon: 'MainTab',
        tabBarIconFocused: 'MainTabFocused',
      },
    },
    {
      title: '',
      name: i18n.t('bottomTab.notification'),
      screen: bottomTabs.notification,
      option: {
        tabBarIcon: 'NotifTab',
        tabBarIconSolid: 'NotifTabSolid',
      },
    },
    {
      title: '',
      name: i18n.t('bottomTab.account'),
      screen: bottomTabs.account,
      option: {
        tabBarIcon: 'AccountTab',
        tabBarIconSolid: 'AccountTabSolid',
      },
    },
  ],
};
