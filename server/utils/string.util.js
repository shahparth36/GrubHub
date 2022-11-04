const generateRandomAlphanumericString = () => {
  return Math.random().toString(36).slice(7).toUpperCase();
};

const generateUsername = (name) => {
  const firstLetter = name.slice(0, 1);
  const lastLetter = name.slice(-1);
  const randomNumber = parseInt(Math.random() * 10000 + 1);
  const milliSeconds = new Date().getMilliseconds();

  const username = `${firstLetter}${lastLetter}${randomNumber}${milliSeconds}`;
  return username;
};

module.exports = {
  generateRandomAlphanumericString,
  generateUsername,
};
