<template>
   <!-- <div class="align-center text-center" style="width: 10vw;"> -->
    <v-card flat tile max-width="8vw" class="text-center mr-6">
      <v-icon outlined large :color="color">{{ icon }}</v-icon>
      <p class="pa-0 text-overline">{{ title }}</p>
    </v-card>
    <!-- </div> -->
</template>

<script>
export default {
  name: 'BookrSeatIcon',
  props: {
    icon: {
      type: String,
      require: true,
    },
    title: {
      type: String, 
      require: true,
    },
    color: {
      type: String, 
      require: false, 
      default: '#c5c5c5'
    }
  },
}
</script>