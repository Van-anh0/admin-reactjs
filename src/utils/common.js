import moment from "moment";

export const trimDate = (str) => {
  return moment(str).format("MM-DD-YYYY");
};

export const trimTime = (str) => {
  return moment(str).format("LT");
};

export const convertStringToTime = (str) => {
  var date = new Date(str),
    mnth = ("0" + (date.getMonth() + 1)).slice(-2),
    day = ("0" + date.getDate()).slice(-2);
  return [date.getFullYear(), mnth, day].join("-");
};

export const renameKeys = (obj) => {
  const keyValues = Object.keys(obj).map((key) => {
    const newKey = trimDate(key);
    return { [newKey]: obj[key] };
  });
  return Object.assign({}, ...keyValues);
};
