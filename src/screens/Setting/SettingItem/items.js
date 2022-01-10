import i18n from 'i18n';

const list = [
  {
    title: i18n.t('setting.myaccount'),
    list: [
      {
        title: i18n.t('setting.profile'),
        screen: 'SettingMyAccount',
      },
      {
        title: i18n.t('setting.address'),
        screen: 'SettingAddress',
      },
      {
        title: i18n.t('setting.order'),
        screen: 'Orders',
        params: {
          status: 1,
        },
      },
    ],
  },
  {
    title: i18n.t('setting.setting'),
    list: [
      // {
      //   title: i18n.t('setting.settingChat'),
      //   screen: 'Home', // 'SettingChat',
      // },
      {
        title: i18n.t('setting.settingNotification'),
        screen: 'SettingNotification',
      },
      {
        title: i18n.t('setting.settingLanguage'),
        screen: '', // 'SettingLanguage',
      },
    ],
  },
];

export default list;
