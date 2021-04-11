import lodash from 'lodash';

const weekStrArray = ['星期日', '星期一', '星期二', '星期三', '星期四', '星期五', '星期六'];

export const getFirstDateStrOfWeekByDate = (dateObject) => {
  const minusDate = dateObject.getDay() ? (dateObject.getDay() - 1) : 6;
  const firstDayOfWeek = dateObject.setDate(dateObject.getDate() - minusDate);
  return new Date(firstDayOfWeek);
};

export const getEndDateStrOfWeekByDate = (dateObject) => {
  const plusDate = dateObject.getDay() ? (7 - dateObject.getDay()) : 0;
  const firstDayOfWeek = dateObject.setDate(dateObject.getDate() + plusDate);
  return new Date(firstDayOfWeek);
};

export const getWeekDateStrArrayByDate = (dateObject) => {
  let initDateObject = getFirstDateStrOfWeekByDate(dateObject);
  return lodash.range(7).map((part, index) => {
    if (index) {
      initDateObject = new Date(initDateObject.setDate(initDateObject.getDate() + 1));
    }
    return convertYYMMDDofDatetimeObject(initDateObject);
  });
};

export const convertYYMMDDofDatetimeObject = (datetimeObject, divider = '-') => `\
${datetimeObject.getFullYear()}${divider}\
${lodash.padStart(datetimeObject.getMonth() + 1, 2, '0')}${divider}\
${lodash.padStart(datetimeObject.getDate(), 2, '0')}\
`;

export const convertToChineseDateStr = (datetimeObject) => `\
${datetimeObject.getFullYear()}年\
 ${datetimeObject.getMonth() + 1}月\
${datetimeObject.getDate()}日\
 ${weekStrArray[datetimeObject.getDay()]}`;

export const isToday = (dateStr) => {
  const d = new Date(dateStr.replace(/-/g, '/'));
  const todayDate = new Date();
  return d.setHours(0, 0, 0, 0) === todayDate.setHours(0, 0, 0, 0);
};

export const getToday = () => {
  const today = new Date();
  return new Date(today.getFullYear(), today.getMonth(), today.getDate(), 8);
};
