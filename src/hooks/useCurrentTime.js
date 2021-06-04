import React, {useEffect, useState} from 'react';
import useCurrentMillis from './useTimer';
const useCurrentTime = () => {
  const currentTimer = useCurrentMillis();
  let date = new Date(currentTimer);
  let h = date.getHours();
  let m = date.getMinutes();
  let s = date.getSeconds();
  return {
    hour: h < 10 ? `0${h}` : h,
    minutes: m < 10 ? `0${m}` : m,
    seconds: s < 10 ? `0${s}` : s,
  };
};
export default useCurrentTime;
