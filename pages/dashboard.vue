<template>
  <v-container fluid class="pa-16">
    <v-row>
      <!-- upcoming booking details -->
      <v-col cols="4">
        <v-card elevation="1" max-width="500" max-height="350px">
          <v-card-title>
            <v-icon class="ma-6">mdi-calendar-month-outline</v-icon>
            <span>Upcoming appointment</span>
          </v-card-title>
          <v-divider></v-divider>
          <!-- if no appointments -->
          <v-row justify="center" v-if="upcomingAppt.day === null">
            <v-col>
              <v-card-text class="text-button mt-16 mb-16 ml-8">no upcoming appointment</v-card-text>
            </v-col>
          </v-row>
          <!-- if there is appointment -->
          <v-row justify="center" v-else>
            <v-col cols="4" class="pr-0 pb-0">
              <v-card elevation="0" style="height:100%" class="text-center justify-center align-center pt-8 pb-0">
                  <h1 class="font-weight-bold" style="font-size:2vw">{{ upcomingAppt.month }}</h1>
                  <h1 class="font-weight-black" style="font-size:5vw">{{ upcomingAppt.day }}</h1>
              </v-card>
            </v-col>

            <v-divider class="mx-1 mt-3" vertical></v-divider>

            <v-col class="pb-0">
              <v-card elevation="0" style="height:100%" class="pa-0 pt-4">
                <v-card-subtitle class="text-overline pb-0">Booking No.: #{{ upcomingAppt.ref }}</v-card-subtitle>
                <v-card-subtitle class="text-overline pb-0">Location: {{ upcomingAppt.room }}</v-card-subtitle>
                <v-card-subtitle class="text-overline">Time: {{ upcomingAppt.start }} - {{ upcomingAppt.end }}</v-card-subtitle>
              </v-card>
            </v-col>
          </v-row>
        </v-card>
      </v-col>
      <!-- other room availability for today -->
      <v-col cols="8">
        <v-card elevation="1">
          <v-card-title>
            <v-icon class="ma-6">mdi-heart-flash</v-icon>
            <span>Today's Room/Seat Availability</span>
          </v-card-title>
          <v-divider></v-divider>
          <v-row>
            <!-- <v-col> -->
              <!-- <test-gauge :title="'Some Bar Chart'"></test-gauge> -->
            <!-- </v-col> -->
            <v-col justify="center" align="center">
              <test-pie :roomTitle="pie1.roomTitle" :data="pie1.data" :colorGroup="pie1.colorGroup"></test-pie>
            </v-col>
            <v-divider class="mt-3" vertical></v-divider>
            <v-col justify="center" align="center">
              <test-pie :roomTitle="pie2.roomTitle" :data="pie2.data" :colorGroup="pie2.colorGroup"></test-pie>
            </v-col>
            <v-divider class="mt-3" vertical></v-divider>
            <v-col justify="center" align="center">
              <test-pie :roomTitle="pie3.roomTitle" :data="pie3.data" :colorGroup="pie3.colorGroup"></test-pie>
            </v-col>
          </v-row>
        </v-card>
      </v-col>
    </v-row>

    <!--  -->
    <v-row class="mt-16">
      <v-col>
        <v-card elevation="1">
          <v-card-title>
            <v-icon class="ma-6">mdi-heart-flash</v-icon>
            <span>Today's Equipment Availability</span>
          </v-card-title>
          <v-divider></v-divider>
          <v-row>
            <v-col justify="center" align="center">
              <test-pie :roomTitle="pie1.roomTitle" :data="pie1.data" :colorGroup="pie1.colorGroup" height="200px" width="500px"></test-pie>
            </v-col>
            <v-divider class="mt-3" vertical></v-divider>
            <v-col justify="center" align="center">
              <test-pie :roomTitle="pie2.roomTitle" :data="pie2.data" :colorGroup="pie2.colorGroup" height="200px" width="500px"></test-pie>
            </v-col>
            <v-divider class="mt-3" vertical></v-divider>
            <v-col justify="center" align="center">
              <test-pie :roomTitle="pie3.roomTitle" :data="pie3.data" :colorGroup="pie3.colorGroup" height="200px" width="500px"></test-pie>
            </v-col>
          </v-row>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import { mapActions, mapState } from 'vuex'
// import TestGauge from '../components/TestGauge.vue'
import TestPie from '../components/TestPie.vue'
// import AvailabilityPieChart from '../components/AvailabilityPieChart.vue'

export default {
  components: {
    TestPie,
    // AvailabilityPieChart
  },
  middleware: 'authenticated',
  data () {
    return {
      // upcoming: {
      //   ref: '#12345',
      //   time: '14:00',
      //   type: 'room',
      //   location: 'Guanghua Building'
      // },
      upcomingAppt: {
          ref: null,
          start: null,
          end: null,
          room: null,
          month: null,
          day: null,
          year: null,
      },
      pie1: {
        roomTitle: 'GHB001',
        data: [
          {
            "group": "Available",
            "value": 0
          },
          {
            "group": "Unavailable",
            "value": 1
          },
          {
            "group": "In Use/Booked",
            "value": 0
          },
        ],
        colorGroup: {
          "Available": "#8be800",
          "Unavailable": "#adadad",
          "In Use/Booked": "#db1d00"
        }
      },
      pie2: {
        roomTitle: 'GHB002',
        data: [
          {
            "group": "Available",
            "value": 0
          },
          {
            "group": "Unavailable",
            "value": 1
          },
          {
            "group": "In Use/Booked",
            "value": 0
          },
        ],
        colorGroup: {
          "Available": "#8be800",
          "Unavailable": "#adadad",
          "In Use/Booked": "#db1d00"
        }
      },
      pie3: {
        roomTitle: 'GHB003',
        data: [
          {
            "group": "Available",
            "value": 0
          },
          {
            "group": "Unavailable",
            "value": 3
          },
          {
            "group": "In Use/Booked",
            "value": 0
          },
        ],
        colorGroup: {
          "Available": "#8be800",
          "Unavailable": "#adadad",
          "In Use/Booked": "#db1d00"
        }
      }
    }
  },
  created () {
    let today = new Date();
    let date = `${today.getFullYear()}-${today.getMonth()+1}-${today.getDate()}`
    let time = new Date().toLocaleTimeString('en-US', { hour12: false,
                                          hour: "numeric",
                                          minute: "numeric"});

    // should retrieve upcoming (soonest) appointment
    const ref = this.$fire.firestore.collection("users").doc(this.$store.state.persisted.uid)
    ref.collection("bookings").get().then((ss)=>{ console.log(ss.docs.length )})
    // ref.collection("bookings").get().then((snapshot) => {
    //   if (snapshot.docs.length > 0) {
    //     snapshot.forEach(bookings => {
    //       // ascending order
    //       bookings.ref.collection("data").orderBy("start", "asc").get().then((snapshot) => {
    //         if (snapshot.docs.length > 0) {
    //           snapshot.forEach(booking => {
    //             if (booking.data().start.toDate().getTime() > today.getTime()) {
    //               this.upcomingAppt.ref = booking.ref.id;
    //               this.upcomingAppt.start = booking.data().start.toDate().toLocaleTimeString('en-US', { hour12: false,
    //                                                                                       hour: "numeric",
    //                                                                                       minute: "numeric"});
    //               this.upcomingAppt.end = booking.data().end.toDate().toLocaleTimeString('en-US', { hour12: false,
    //                                                                                       hour: "numeric",
    //                                                                                       minute: "numeric"});
    //               this.upcomingAppt.room = booking.data().room;
    //               this.upcomingAppt.month = booking.data().start.toDate().getMonth();
    //               this.upcomingAppt.day = booking.data().start.toDate().getDate();
    //               this.upcomingAppt.year = booking.data().start.toDate().getFullYear();
    //             }
    //           })
    //         }
    //       })
    //     })
    //   }
    // })

                                          // .then((bookingsSnapshot) => {
                                          //   bookingsSnapshot.forEach(bookings => {
                                          //     // ascending order
                                          //     bookings.ref.collection("data")
                                          //     .where("start", ">=", time)
                                          //     .orderBy("start","dayNumber","month","year")
                                          //     .limit(1)
                                          //     .get()
                                          //     .then((appts) => {
                                          //       appts.forEach((apptData) => {
                                          //         const appt = apptData.data()
                                          //         this.upcomingAppt.start = appt.start;
                                          //         this.upcomingAppt.end = appt.end;
                                          //         this.upcomingAppt.room = appt.room;

                                          //         let month = new Date()
                                          //         month.setMonth(appt.month-1)
                                          //         this.upcomingAppt.month = month.toLocaleString('en-US', {month: 'short'});
                                          //         this.upcomingAppt.day = appt.dayNumber;
                                          //         this.upcomingAppt.year = appt.year;

                                          //       })
                                          //     })
                                          //   });
                                          // });
  },
}
</script>
