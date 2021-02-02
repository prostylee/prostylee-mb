import I18n from 'react-native-i18n';

import en from './locales/en';
import vn from './locales/vn';

I18n.fallbacks = true;

I18n.locale = 'vn';

I18n.translations = {
  vn,
  en,
};

export default I18n;
