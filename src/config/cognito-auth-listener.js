import {Hub, Logger} from 'aws-amplify';

const logger = new Logger('My-Logger');

const listener = (data) => {
  logger.info('CognitoAuthListener ' + JSON.stringify(data));
  switch (data.payload.event) {
    case 'signIn':
      logger.info('user signed in');
      break;
    case 'signUp':
      logger.info('user signed up');
      break;
    case 'signOut':
      logger.info('user signed out');
      break;
    case 'signIn_failure':
      logger.error('user sign in failed');
      break;
    case 'tokenRefresh':
      logger.info('token refresh succeeded');
      break;
    case 'tokenRefresh_failure':
      logger.error('token refresh failed');
      break;
    case 'configured':
      logger.info('the Auth module is configured');
      break;
    default:
      logger.info('Other event');
      break;
  }
};

export const listenAuth = () => {
  Hub.listen('auth', listener);
};