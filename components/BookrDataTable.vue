<template>
  <v-data-table
    :headers="headers"
    :items="data"
    :loading="loading"
    :search="search"
    item-key="no"
    :items-per-page="5"
    class="elevation-1 pl-4 pr-4 pt-4"
    multi-sort
    :sort-by="['date','start']"
    :sort-desc="[false, false]"
    >
    <template v-slot:top>
      <v-toolbar flat>
        <!-- <v-toolbar-title class="text-h4 ma-4">Booking History</v-toolbar-title> -->
        <v-toolbar-title>{{ title }}</v-toolbar-title>
        <v-spacer></v-spacer>
        <v-text-field
          v-model="search"
          append-icon="mdi-magnify"
          label="Search booking"
          single-line
          hide-details
          class="mr-6"
        ></v-text-field>
        <v-btn x-small fab depressed @click="getBookingsData()"><v-icon>mdi-refresh</v-icon></v-btn>
        <v-btn outlined color="#6200ea" v-show="bookingBtn">
          <nuxt-link to="booking" class="text-decoration-none text-overline" style="color:#6200ea">new booking</nuxt-link>
        </v-btn>

      </v-toolbar>
    </template>
    <template v-slot:item.status="{ item }">
      <v-chip label :color="getBookingStatusColor(item.status, item.date, item.start, item.end)" text-color="white" :value="item.status" :key="item.status" class="text-overline">
        {{ item.status }}
      </v-chip>
    </template>

    <template v-slot:item.action="{ item }">
      <!-- admin cannot reschedule for user, only user able to do so -->
      <v-btn color="primary" depressed class="mr-1" @click="setCheckIn(item)" :disabled="disableButton(item.status)">Check In</v-btn>
      <v-btn small outlined color="indigo" @click="editItem(item)" :disabled="disableButton(item.status)" v-show="!$store.state.persisted.admin">
        edit
      </v-btn>
      <v-btn small outlined color="error" @click="deleteItem(item)" :disabled="disableButton(item.status)">
        cancel
      </v-btn>
    </template>
  </v-data-table>
</template>

<script>
export default {
  created() {
    console.log("created");
    this.getBookingsData();
  },
  props: {
    headers: {
      type: Array,
      require: true
    },
    data: {
      type: Array,
      require: true
    },
    title: {
      type: String,
      require: true
    },
    loading: {
      type: Boolean,
      require: true,
    },
    search: {
      type: String,
      require: true,
    },
    bookingBtn: {
      type: Boolean,
      require: true
    },
    upcomingFlag: {
      type: Boolean,
      require: true
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
        // upcoming booking
        if (status == 'booked') {
          // valid booking
          return 'green'
        } else if (status == 'cancelled') {
          // cancelled booking
          return 'red'
        } else {
          // unexpected error of some kind
          return 'grey'
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
    editItem(item) {

    },
    async deleteItem(item) {
      item.status = "cancelled";

      const userUid = this.$fire.auth.currentUser.uid;
      const ref = await this.$fire.firestore
        .collection("users")
        .doc(userUid)
        .collection("bookings")
        .doc(item.date)
        .collection("data")
        .where("start", "==", item.start)
        .get()
        .then((snap) => {
          snap.forEach((doc) => {
            console.log(doc.id, " => ", doc.data());
            doc.ref.update({
              status: "cancelled",
            });
          });
        });
    },
    async setCheckIn(item) {
      const today = new Date();
      console.log(today);
      var dd = String(today.getDate());
      var mm = String(today.getMonth() + 1);
      var yyyy = today.getFullYear();
      let todayDate = yyyy + '-' + mm + '-' + dd;
      console.log(todayDate);

      var hoursMinutesToday = String(today.getHours()).padStart(2, '0') + ':' + String(today.getMinutes()).padStart(2, '0');
      console.log(hoursMinutesToday);

      const bookingDate = item.date;
      console.log(bookingDate);

      const hoursMinutesBooking = item.start;
      console.log(hoursMinutesBooking);


      let todayArray = hoursMinutesToday.split(":");
      let bookingArray = hoursMinutesBooking.split(":");
      todayArray[0] = todayArray[0] * 60 * 60;
      bookingArray[0] = bookingArray[0] * 60 * 60;
      todayArray[1] = todayArray[1] * 60;
      bookingArray[1] = bookingArray[1] * 60;

      let todaySeconds = todayArray[0] + todayArray[1];
      let bookingSeconds = bookingArray[0] + bookingArray[1];

      console.log(todaySeconds);
      console.log(bookingSeconds);

      if(today == bookingDate) {
        if(todaySeconds > bookingSeconds - 15 * 60) {
          item.status = "Checked In";
          item.checkin = !item.checkin;
          let newCheckin = item.checkin;

          const userUid = this.$fire.auth.currentUser.uid;
          const ref = await this.$fire.firestore
            .collection("users")
            .doc(userUid)
            .collection("bookings")
            .doc(item.date)
            .collection("data")
            .where("start", "==", item.start)
            .get()
            .then((snap) => {
              snap.forEach((doc) => {
                console.log(doc.id, " => ", doc.data());
                doc.ref.update({
                  checkin: newCheckin,
                });
              });
          });

          const ref2 = await this.$fire.firestore
            .collection("users")
            .doc(userUid)
            .collection("bookings")
            .doc(item.date)
            .collection("data")
            .where("start", "==", item.start)
            .get()
            .then((snap) => {
              snap.forEach((doc) => {
                console.log(doc.id, " => ", doc.data());
                doc.ref.update({
                  status: "Checked In",
                });
              });
          });
        }
      }
    },
    async getBookingsData() {
      this.data = [];
      const userUid = this.$fire.auth.currentUser.uid;
      let counter = 1;
      if(this.upcomingFlag) {
        const ref = await this.$fire.firestore
          .collection("users")
          .doc(userUid)
          .collection("bookings")
          .get()
          .then((bookingsSnapshot) => {
            bookingsSnapshot.forEach((bookings) => {
              let bookingDate = new Date(bookings.data()["date"]);
              console.log(bookingDate);
              let todayDate = new Date();
              console.log(todayDate);

              if(bookingDate >= todayDate) {
                const bookingDayRef = bookings.ref.collection("data").get().then((bookingDaySnapshot) => {
                  bookingDaySnapshot.forEach((booking, index) => {
                    let newData = new Map(Object.entries(booking.data()));

                    let date = newData.get("year") + "-" + newData.get("month") + "-" + newData.get("dayNumber");
                    newData.set("date", date);
                    newData.set("no", counter);

                    newData.delete("year");
                    newData.delete("month");
                    newData.delete("dayNumber");
                    newData.delete("day");

                    let newDataObj = Object.fromEntries(newData);
                    counter++;

                    this.data.push(newDataObj);
                  });
                });
              }
            });
          });
      }
      else {
        const ref = await this.$fire.firestore
          .collection("users")
          .doc(userUid)
          .collection("bookings")
          .get()
          .then((bookingsSnapshot) => {
            bookingsSnapshot.forEach((bookings) => {
              let bookingDate = new Date(bookings.data()["date"]);
              console.log(bookingDate);
              let todayDate = new Date();
              console.log(todayDate);

              if(bookingDate < todayDate) {
                const bookingDayRef = bookings.ref.collection("data").get().then((bookingDaySnapshot) => {
                  bookingDaySnapshot.forEach((booking, index) => {
                    let newData = new Map(Object.entries(booking.data()));

                    let date = newData.get("year") + "-" + newData.get("month") + "-" + newData.get("dayNumber");
                    newData.set("date", date);
                    newData.set("no", counter);

                    newData.delete("year");
                    newData.delete("month");
                    newData.delete("dayNumber");
                    newData.delete("day");

                    let newDataObj = Object.fromEntries(newData);
                    counter++;

                    this.data.push(newDataObj);
                  });
                });
              }
            });
          });
      }
    },
  },
}
</script>


<style>
/* .v-data-table-header th {
  white-space: nowrap;
} */
.v-data-table > .v-data-table__wrapper > table > thead > tr > th {
  padding: 10px !important;
  font-weight: bold !important;
  font-size: 0.9rem;
}
.v-data-table > .v-data-table__wrapper > table > tbody > tr > td {
  padding: 10px 10px 10px 10px !important;
}

tbody tr:nth-of-type(odd) {
   background-color: rgba(0, 0, 0, .05);
 }

</style>