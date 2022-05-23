<template>
  <v-container fill-height fluid class="align-center justify-center text-center">
    <!-- <div> -->
      <!-- <h1> -->
        <!-- Profile -->
        <!-- <v-icon x-large>mdi-arrow-right-thin</v-icon> -->
        <!-- <span style="color: #cdcdcd">{{ seat.no }}</span> -->
      <!-- </h1> -->
    <!-- </div> -->
    
    <v-card width="70vw" height="45vh">
      <!-- <v-row>
        <v-col cols="4">
          <v-list-group>
            <v-list-item>
              <v-list-item-content>item 1</v-list-item-content>
              <v-list-item-content>item 1</v-list-item-content>
              <v-list-item-content>item 1</v-list-item-content>
            </v-list-item>
          </v-list-group>
        </v-col>
        <v-divider vertical class="mx-6"></v-divider>
        <v-col cols="7"></v-col>
      </v-row> -->
      <v-row>
        <v-col cols="5">
          <img
            src="../static/male.svg"
            alt="avatar"
            height="250px"
            class="ma-16"
          >
        </v-col>
        <v-col align="left" class="mt-6" cols="6">
          <v-row class="mt-12">
            <v-col>
              <span class="text-button">First Name: </span>
              <span>{{ $store.state.persisted.fname }}</span>
            </v-col>
            <!-- <v-col class="text-left"></v-col> -->
          </v-row>
          <v-row>
            <v-col>
              <span class="text-button">Last Name: </span>
              <span>{{ $store.state.persisted.lname }}</span>
            </v-col>
          </v-row>
          <v-row>
            <v-col>
              <span class="text-button">Email: </span>
              <span>{{ $store.state.persisted.email }}</span>
            </v-col>
          </v-row>
          <v-row>
            <v-col>
              <span class="text-button">Last Sign In Time: </span>
              <span>{{ $store.state.persisted.lastSignInTime }}</span>
            </v-col>
          </v-row>
        </v-col>
      </v-row>
    </v-card>
  </v-container>
</template>

<script>
export default {
}
</script>

<style>
.fill-height {
  height: 80% !important;
}
</style>