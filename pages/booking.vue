<template>
    <div fill-height fluid class="booking ml-16 mr-16 mb-16 mt-12">
      <template>
        <v-row>
          <v-col>
            <h1>
              Bookings
              <v-icon x-large v-if="room.name.length > 0">mdi-arrow-right-thin</v-icon>
              <span style="color: #cdcdcd" v-if="room.name.length > 0">{{ room.name }}</span>
            </h1>
          </v-col>
          <v-col class="d-flex align-center" v-if="room.name.length > 0">
            <v-btn depressed class="ml-auto" @click="cancelBooking()" color="error">cancel booking</v-btn>
          </v-col>
        </v-row>
      </template>

      <template v-if="room.name.length === 0">
        <bookr-room></bookr-room>
      </template>
    
      <template v-if="room.name.length > 0">
        <v-stepper flat width="500" class="booking__stepper font-weight-bold" v-model="stepper">
          <v-stepper-header>
              <v-stepper-step class="pl-0" step="1" :color="stepper > 1 ? '#4de123' : '#3b47ec'" :complete="stepper > 1" complete-icon="mdi-check">SCHEDULING</v-stepper-step>
            <v-divider></v-divider>
              <v-stepper-step step="2" :color="stepper > 2 ? '#4de123' : '#3b47ec'" :complete="stepper > 2" complete-icon="mdi-check">DETAILS</v-stepper-step>
            <v-divider></v-divider>
              <v-stepper-step :color="stepper >= 3 ? '#4de123' : '#3b47ec'"  step="3" :complete="stepper >= 3">FINISH</v-stepper-step>
          </v-stepper-header>
        </v-stepper>
  
        <div v-show="stepper == 1">
          <bookr-calendar :conditions="cond" class="ma-0 ma-auto"></bookr-calendar>
          <div class="booking__seats mt-8">
            <v-row>
              <v-col sm="7">
                <bookr-seat-desc :data="room"></bookr-seat-desc>
              </v-col>
              <v-col md="4" offset-sm="1">
                <bookr-seat-book></bookr-seat-book>
              </v-col>
            </v-row>
          </div>
        </div>
  
        <div v-show="stepper == 2">
          <bookr-booking-details></bookr-booking-details>
        </div>
        <div v-show="stepper == 3">
          <bookr-booking-confirmation></bookr-booking-confirmation>
        </div>
      </template>
    </div>
</template>

<script>
import { mapGetters } from 'vuex';
import BookrRoom from '../components/BookrRoom.vue';
import BookrCalendar from '../components/BookrCalendar.vue';
import BookrSeatDesc from '../components/BookrSeatDesc.vue';
import BookrSeatBook from '../components/BookrSeatBook.vue';
import BookrBookingDetails from '../components/BookrBookingDetails.vue';
import BookrBookingConfirmation from '../components/BookrBookingConfirmation.vue'

export default {
  components: {
    BookrRoom,
    BookrCalendar,
    BookrSeatDesc,
    BookrSeatBook,
    BookrBookingDetails,
    BookrBookingConfirmation
  },
  middleware: 'authenticated',
  data () {
    return {
      // stepper: 1, // step 1 
      cond: {
        max: 4, // 2 box to 1 hour 
        min: 1, 
        advance: 2,
      },
      // seat: {
      //   no: 341,
      //   availability: true, 

      //   equipments: {
      //     power: {
      //       status: 1 // 1:yes, 0:no, -1:broken
      //     },
      //     projector: {
      //       status: -1
      //     },
      //   },
      //   location: "Guanghua Building Room 232",
      //   description: "s simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum."
      // }
    }
  },
  methods: {
    cancelBooking() {
      let room = {
        name: '',
        floor: '',
        description: '', 
        power: null, 
        projector: null,
      }
      this.$store.commit('setRoom', room); // reset 
    }
  },
  created () {
    // this.$store.commit('setId', this.seat.no);
    // console.log(this.$store.state.room);
  },
  computed: {
    width () {
      if (process.client) return window.innerWidth * 0.95 + 'px'
      else return '100%'
    },
    ...mapGetters(["timeslots","stepper","room"]),
  },
  watch: {
    room: {
      handler(nv) {
        return nv
      },
      deep: true,
      immediate: true
    }
  }
  
}
</script>

<style>
  .booking__stepper {
    font-size: 15px;
    font-family: 'Roboto', serif
    /* font-family: 'Playfair Display', serif; */
  }

  /* .booking__seats * {
    padding: 0;
  } */

</style>
