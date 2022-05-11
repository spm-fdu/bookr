export default {
  userLoggedIn (state, user) {
    state.user.authenticated = true;
    state.user.uid = user.uid;
  }
}