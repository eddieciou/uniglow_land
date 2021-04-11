const getUser = (state) => state.authentication.user;
const getLoggingIn = (state) => state.authentication.loggingIn;
const getAPIPosting = (state) => state.authentication.apiPosting;

const authSelectors = {
  getUser,
  getLoggingIn,
  getAPIPosting,
};

export default authSelectors;
