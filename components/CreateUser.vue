<template></template>
<script>
export default {
  name: "CreateUser",
  methods: {
    async createUser() {
      try {
        await this.$fire.auth.createUserWithEmailAndPassword(
          "spm.fudan@gmail.com",
          "testing123"
        );
      } catch (e) {
        console.log(e);
      }
    },
  },
};
</script>