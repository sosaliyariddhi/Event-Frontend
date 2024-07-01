const MONTHS = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

export const generateDate = (utcDate) => {
  if (utcDate) {
    const date = new Date(utcDate);
    let dd = date.getDate();
    let mm = date.getMonth();
    let yyyy = date.getFullYear();
    const formatedDate = `${dd} ${MONTHS[mm]}, ${yyyy} `;
    return formatedDate;
  }
  return "";
};
