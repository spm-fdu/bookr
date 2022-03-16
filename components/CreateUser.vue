<template></template>
<script>
export default {
  name: "CreateUser",
  methods: {
    async createUser() {
      try {
        await this.$fire.auth.createUserWithEmailAndPassword(
          "foo@foo.foo",
          "test"
        );
      } catch (e) {
        handleError(e);
      }
    },
  },
};
</script>