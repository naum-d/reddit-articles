export const mathRandom = (min, max) => {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

export const getUniqueKey = () => {
  return new Date().getTime() + Math.random();
};
