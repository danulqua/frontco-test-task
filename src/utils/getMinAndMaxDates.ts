export const getMinAndMaxDates = () => {
  const today = new Date();

  const maxDate = new Date(
    today.getFullYear(),
    today.getMonth() + 1,
    today.getDate()
  );

  const minDate = new Date(
    today.getFullYear(),
    today.getMonth() - 1,
    today.getDate()
  );

  return { minDate, maxDate };
};
