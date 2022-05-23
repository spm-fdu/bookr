<template>
  <div justify="center" align="center" class="mt-16" v-if="$store.getters.stepper === 3">
    <!-- ALERT USER FOR AUTO-REDIRECTING -->
    <v-snackbar v-model="snackbar" timeout="-1" top>
      Auto redirecting in {{ timeout }} seconds.
    </v-snackbar>


    <v-card outlined class="pa-16" max-width="65vw">
      <h1 class="font-weight-bold">
        <span>fdu</span>//bookr.
      </h1>
      <v-btn small fab top right absolute depressed class="mt-12 mr-8" @click="reset()"><v-icon>mdi-close</v-icon></v-btn>
      <!-- <v-spacer class="pt-10 pb-10"></v-spacer> -->
      <v-divider class="mt-6 mb-6" style="margin-left: 10vw; margin-right: 10vw;"></v-divider>
      <v-card outlined rounded-xl max-width="50vw" class="pa-10">

        <h2 class="font-weight-medium text-uppercase text-xl-h4">
          🎊 successful booking 🎉
          <!-- <v-btn fab depressed plain> -->
            <!-- <v-icon x-large color="#4de123">mdi-check</v-icon> -->
          <!-- </v-btn> -->
        </h2>
        <div class="text-left ml-16 mt-16">
          <span class="text-button">user: </span><span>{{ email }}</span>
          <v-spacer></v-spacer>
          <span class="text-button">booking id: </span><span>#BOOKINGIDGOESHERE</span>
          <v-spacer></v-spacer>
          <span class="text-button">booking time: </span><span>{{ timestamp }}</span>
        </div>
        <v-row v-for="(slots, d, index) in details" :key="index" class="mt-10">
          <!-- numbering -->
          <v-col>
            {{ index + 1}}
            <!-- <v-btn fab small depressed plain>{{ index + 1 }}</v-btn> -->
          </v-col>
          <!-- actual day -->
          <v-col>{{ dayFull[d-1] }}</v-col>
          <!-- actual date -->
          <v-col>{{ week[d-1] }}/{{ year[d-1] }}</v-col>
          <!-- actual time slot -->
          <v-col>
            <span v-for="(slot, index) in slots" :key="index">
              <span
                :style="
                  'background-color: ' + colors[d - 1] + '; color: white;'
                "
                class="pl-3 pr-3 mr-2"
                >{{ slot }}</span
              >
              <v-spacer v-if="(index + 1) % 3 === 0"></v-spacer>
            </span>
          </v-col>
        </v-row>
        <v-card-text class="mt-16 text-caption">A booking confirmation email will be sent to your registered email. Should you have any questions, feel free to reach out to us at spm.fudan@gmail.com.</v-card-text>
      </v-card>
    </v-card>
  </div>
</template>


<script>
import { mapGetters } from 'vuex'

export default {
  data () {
    return {
      snackbar: true,
      timeout: 10, // 10 seconds 
    }
  },
  computed: {
    ...mapGetters(['colors','dayFull','week','year','stepper']),
    details () {
      return this.$store.getters.bookingDetails;
    },
    email () {
      return this.$store.getters.persisted.email;
    },
    timestamp () {
      return new Date();
    }
    // async confirmation () {
    //   // confirm that booking data has been successfully injected into the backend 
    //   const bookingSnapshot = await this.$fire.firestore.collection("users").doc(this.$store.getters.databaseUid).collection("bookings").get() 
    //   bookingSnapshot.forEach((bookingDate) => {
    //     console.log(bookingDate.data())
    //   })
    // }
  },
  methods: {
    reset () {
      this.$router.go('/booking');
      // this.$store.commit('reset');
    },
  },
  watch: {
    stepper: {
      handler(v) {
        // console.log(this.$store.getters.stepper);
        if (v === 3 && this.timeout > 0) {
          setInterval(() => {
            if (this.timeout > 0) {
              this.timeout -= 1
            }
            if (this.timeout <= 0) {
              this.reset()
            }
          }, 1000);
        }
      },
      immediate: true
    }
  }
}
</script>