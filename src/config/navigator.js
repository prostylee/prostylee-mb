import i18n from 'i18n';

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
      title: '',
      name: i18n.t('bottomTab.newFeed'),
      screen: bottomTabs.newFeed,
      option: {
        tabBarIcon: 'NewFeedTab',
      },
    },
    {
      title: '',
      name: i18n.t('bottomTab.store'),
      screen: bottomTabs.newFeed,
      option: {
        tabBarIcon: 'StoreTab',
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
      screen: bottomTabs.newFeed,
      option: {
        tabBarIcon: 'NotifTab',
      },
    },
    {
      title: '',
      name: i18n.t('bottomTab.account'),
      screen: bottomTabs.account,
      option: {
        tabBarIcon: 'AccountTab',
      },
    },
  ],
};
