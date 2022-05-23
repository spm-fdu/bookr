<template></template>

<script>
import { mapActions } from 'vuex';

export default {
  methods: {
    ...mapActions(['clearPersist'])
  },
  
  mounted () {
    this.$fire.auth.signOut(this.$fire.auth).then(() => {
      this.clearPersist();
      if (process.client) { localStorage.removeItem('vuex') }
      this.$router.push('/');
    }).catch((e) => {
      console.log('Sign out failed.');
      console.log(`Error message: ${e}`);
    })
  }
}
</script>