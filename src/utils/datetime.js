export const convertUnixTime = (UNIX_TIMESTAMP) => {
  const a = new Date(UNIX_TIMESTAMP);
  const months = [
    '01',
    '02',
    '03',
    '04',
    '05',
    '06',
    '07',
    '08',
    '09',
    '10',
    '11',
    '12',
  ];
  const days = [
    'Chủ nhật',
    'Thứ 2',
    'Thứ 3',
    'Thứ 4',
    'Thứ 5',
    'Thứ 6',
    'Thứ 7',
  ];
  const year = a.getFullYear();
  const month = months[a.getMonth()];
  let date = a.getDate();
  if (parseInt(date) < 10) {
    date = '0' + date;
  }
  const day = days[a.getDay()];

  const time = `${day}, ${date}/${month}/${year}`;
  return time;
};

export const convertISODate = (isoDate) => {
  let date = new Date(isoDate);
  return (
    checkValue(date.getDate()) +
    '/' +
    checkValue(date.getMonth() + 1) +
    '/' +
    date.getFullYear()
  );
};

export const getToday = () => {
  const t = new Date();
  const d = t.getDate();
  const m = t.getMonth() + 1;
  const y = t.getFullYear();
  const today = checkValue(d) + '/' + checkValue(m) + '/' + y;

  return today;
};

const checkValue = (value) => {
  if (value < 10) {
    return '0' + value;
  }
  return value;
};
