const getTokens = () => {
  const accessToken = window.localStorage.getItem("ghat");
  const refreshToken = window.localStorage.getItem("ghrt");
  return {
    accessToken,
    refreshToken,
  };
};

const setToken = (token, tokenType) => {
  if (tokenType === "ACCESS_TOKEN") window.localStorage.setItem("ghat", token);
  else if (tokenType === "REFRESH_TOKEN")
    window.localStorage.setItem("ghrt", token);
};

module.exports = {
  getTokens,
  setToken,
};
