<template></template>

<script>
import { mapActions } from 'vuex';

export default {
  methods: {
    ...mapActions(['clearPersist'])
  },
  
  mounted () {
    console.log('logging out...')
    this.$fire.auth.signOut(this.$fire.auth).then(() => {
      this.clearPersist();
      this.$router.push('/');
    }).catch((e) => {
      console.log('Sign out failed.');
      console.log(`Error message: ${e}`);
    })
  }
}
</script>