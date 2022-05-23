export default function ({ store, redirect, route }) {
  let payload = localStorage.getItem('vuex');
  if (payload) {
    payload = JSON.parse(payload)['persisted'];
  } else {
    // first time logging in 
    // return redirect('/login')
    return Promise.resolve();
  }

  // signed in before but signed out 
  if (payload.authenticated === false && store.state.persisted.authenticated === false) {
    return Promise.resolve();
  } else {
    // user is authenticated 
    // reinject into store 
    store._actions['persist'][0](payload);

    // source 
    if (route.fullPath == '/login' || route.fullPath == '/signup') {
      return redirect('/dashboard')
    }

    return Promise.resolve();
  }

}
