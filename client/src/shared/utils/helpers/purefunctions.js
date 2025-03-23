export const formatPhoneNumber = (number) => {
  return number.replace(/(\d{4})(\d{3})(\d{4})/, "$1-$2-$3");
};

export const hasEmptyField = (data) => {
  return Object.values(data).some((value) => !value?.toString().trim());
};
