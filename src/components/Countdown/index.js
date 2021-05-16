import React, {memo} from 'react';
import {Text} from 'react-native';
import styles from '../../screens/Auth/ResetPassword/styles';
import I18n from 'i18n';
import PropTypes from 'prop-types';

const COUNT = 60;

const Countdown = ({showCountdown, count, onCountDown}) => {
  const [countLeft, setCountLeft] = React.useState(count);

  const intervalRef = React.useRef(null);

  React.useEffect(() => {
    if (showCountdown) {
      setCountLeft(count);
    }
  }, [showCountdown]);

  React.useEffect(() => {
    // exit early when we reach 0
    if (!countLeft) {
      if (onCountDown) {
        onCountDown();
      }
      return;
    }

    intervalRef.current = setInterval(() => {
      setCountLeft(countLeft - 1);
    }, 1000);

    // clear interval on re-render to avoid memory leaks
    return () => clearInterval(intervalRef.current);
  }, [countLeft]);

  return (
    showCountdown && (
      <Text style={styles.countDown}>{`(${I18n.t(
        'after',
      )} ${countLeft}s)`}</Text>
    )
  );
};

Countdown.defaultProps = {
  showCountdown: true,
  count: COUNT,
  onCountDown: () => console.log('onCountdown'),
};

Countdown.propTypes = {
  count: PropTypes.number,
  onCountDown: PropTypes.func,
  showCountdown: PropTypes.bool,
};

export default memo(Countdown);
