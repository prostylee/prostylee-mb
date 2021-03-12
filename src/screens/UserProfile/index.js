import React from 'react';

import styles from './styles';

import {ThemeView} from 'components';

const UserProfile = (props) => {
  return (
    <ThemeView style={styles.container} isFullView>
    </ThemeView>
  );
};

UserProfile.defaultProps = {};

UserProfile.propTypes = {};

export default UserProfile;
