<template>
  <v-container fluid fill-height class="align-start">
    <v-row class="d-flex ma-10" align="center">
      <v-col>
        <v-card>
          <v-tabs center-active dark background-color="deep-purple accent-4" slider-color="red" v-model="defaultTab">
            <v-tab href="#upcoming">upcoming</v-tab>
            <v-tab href="#history">history</v-tab>

          </v-tabs>
          <v-tabs-items v-model="defaultTab">
            <!-- upcoming bookings -->
            <v-tab-item value="upcoming">
              <bookr-data-table :headers="headers" :data="data" title="Upcoming Bookings" :upcomingFlag="true" :bookingBtn="true"></bookr-data-table>
              <!-- <v-data-table :headers="headers" :items="data" item-key="no" :items-per-page="5" class="elevation-1">
                <template v-slot:top>
                  <v-toolbar flat>
                    <v-toolbar-title>Upcoming Booking</v-toolbar-title>

                  </v-toolbar>
                </template>
                <template v-slot:item.status="{ item }">
                  <v-chip label :color="getBookingStatusColor(item.status, item.date, item.start, item.end)" text-color="white" :value="item.status" :key="item.status" class="text-overline">
                    {{ item.status }}
                  </v-chip>
                </template>
                <template v-slot:item.action="{ item }">
                  <v-btn small outlined color="indigo" @click="editItem(item)" :disabled="disableButton(item.status)">
                    edit
                  </v-btn>
                  <v-btn small outlined color="error" @click="deleteItem(item)" :disabled="disableButton(item.status)">
                    cancel
                  </v-btn>
                </template>
              </v-data-table> -->
            </v-tab-item>
            <!-- history bookings -->
            <v-tab-item value="history">
              <bookr-data-table :headers="headers" :data="data" title="History Bookings" :upcomingFlag="false" :bookingBtn="false"></bookr-data-table>
            </v-tab-item>
          </v-tabs-items>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import BookrDataTable from '../components/BookrDataTable.vue'

export default {
  components: {
    BookrDataTable
  },
  data () {
    return {
      defaultTab: 'upcoming',
      headers: [
        {
          text: 'No.',
          value: 'no',
          align: 'center',
          sortable: false,
        },
        {
          text: 'Booking Ref.',
          value: 'id',
          // align: 'center',
          sortable: false
        },
        {
          text: 'Location',
          value: 'location',
          // align: 'center',
          sortable: false
        },
        {
          text: 'Date',
          value: 'date',
          // sortable: false
        },
        {
          text: 'Start',
          value: 'start',
          // sortable: false
        },
        {
          text: 'End',
          value: 'end',
          // sortable: false
        },
        {
          text: 'Booking Status',
          value: 'status',
          // sortable: false
        },
        {
          text: 'Action',
          value: 'action',
          // sortable: false
        },
      ],
      data: [],
      booking: null,
    }
  },
  methods: {
    getBookingStatusColor (status, date, start, end) {
      let today = new Date();
      // let bookingTime = `${date} ${end}`
      let todate = Date.parse(`${today.getFullYear()}-${today.getMonth()+1}-${today.getDate()}`)
      let time = new Date().toLocaleTimeString('en-US', { hour12: false,
                                          hour: "numeric",
                                          minute: "numeric"});
      date = Date.parse(date)

      if ((todate >= date) && (time > end) && status == 'booked') {
        return 'grey'
      } else if ((todate <= date)) {
        if (status == 'booked') {
          // upcoming booking
          return 'green'
        } else if (status == 'cancelled') {
          // cancelled booking
          return 'red'
        }
      }
    },
    disableButton (status) {
      if (status != 'booked') {
        return true
      } else {
        return false
      }
    },
  },
  created () {
    // async booking () {
      // const ref = await this.$fire.firestore
      //   .collection("users")
      //   .doc(this.$store.getters.persisted.uid)

      // ref.collection("bookings").get().then((bookingSnapshot) => {
      //   // console.log(docSnapshot.docs)
      //   if (!bookingSnapshot.docs.length > 0) {
      //     bookingSnapshot.forEach((booking) => {
      //       booking.ref.collection("data").get().then((detailSnapshot) => {

      //       })
      //     })
      //   }
      // })
        // .collection("bookings")
        // .get()
        // .then((bookingsSnapshot) => {
        //   bookingsSnapshot.forEach(bookings => {
        //     console.log(bookings.id, " => ", bookings.data());
        //     const ref2 = bookings.ref.collection("data").get().then(bookingSnapshot => {
        //       bookingSnapshot.forEach(booking => {
        //           console.log(booking.id, booking.data())
        //         });
        //     });
        //   });
        // });
    // }
  }
}
</script>

<style>

</style>