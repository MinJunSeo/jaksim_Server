const generateRandomNumber = () => {
  return Math.floor(Math.random() * (10 - 0) + 0);
};

export const generateEmailAuthKey = () => {
  let authKey = '';

  for (let i = 0; i < 6; i++) {
    authKey += generateRandomNumber().toString();
  }

  return authKey;
};