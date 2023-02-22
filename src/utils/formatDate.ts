const addZero = (value: number) => {
  return value < 10 ? `0${value}` : value;
};

export const formatDate = (date: Date) => {
  const day = addZero(date.getDate());
  const month = addZero(date.getMonth() + 1);
  const year = date.getFullYear();

  return `${year}-${month}-${day}`;
};
