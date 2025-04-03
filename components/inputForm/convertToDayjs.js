import "dayjs/locale/ko";
import dayjs from "dayjs";

export const convertToDayjs = (obj, dateFields) => {
  const newObj = { ...obj };
  dateFields.forEach(field => {
    if (obj[field]) {
      newObj[field] = dayjs(obj[field]);
    }
  });
  return newObj;
};