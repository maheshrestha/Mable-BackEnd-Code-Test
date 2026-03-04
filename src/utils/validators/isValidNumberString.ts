export const isValidNumberString = (value: string): boolean => {
  return /^-?\d+(\.\d+)?$/.test(value);
};
