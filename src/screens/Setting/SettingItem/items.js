import i18n from 'i18n';

const list = [
    {
        title: i18n.t('setting.myaccount'),
        list: [
            {
                title: i18n.t('setting.myaccount'),
                screen: 'SettingMyAccount'
            },
            {
                title: i18n.t('setting.address'),
                screen: 'SettingAddress'
            },
        ]
    },
    {
        title: i18n.t('setting.setting'),
        list: [
            {
                title: i18n.t('setting.settingChat'),
                screen: 'SettingChat'
            },
            {
                title: i18n.t('setting.settingNotification'),
                screen: 'SettingNotification'
            },
            {
                title: i18n.t('setting.settingLanguage'),
                screen: 'SettingLanguage'
            },
        ]
    }
]

export default list;