const randomString = (characters, length) => {
  let result = '';
  for (let i = 0; i < length; i += 1) {
    result += characters.charAt(Math.floor(Math.random() * characters.length));
  }
  return result;
};

export const randomKey = (length) => randomString(
  'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789',
  length,
);

export const randomNumber = (length) => randomString(
  '0123456789',
  length,
);
