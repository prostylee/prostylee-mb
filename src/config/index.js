import * as config_dev from './development';
import * as config_dis from './distribution';

const DEV = true;

const config = DEV ? config_dev : config_dis;

export default config;
