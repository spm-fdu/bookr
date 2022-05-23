<template>
  <div align="center" justify="center" class="mt-16">
    <v-card flat fill-height outlined class="pa-16" max-width="65vw">
      <v-row>
        <v-col><h5>Slots No.</h5></v-col>
        <v-col><h5>Day of Week</h5></v-col>
        <v-col><h5>Date</h5></v-col>
        <v-col><h5>Timeslot</h5></v-col>
      </v-row>
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
      <v-row class="mt-10">
        <v-col cols="4" offset-md="8">
          <v-btn depressed class="mr-1" @click="moveBack()">modify</v-btn>
          <v-btn depressed class="ml-1" @click="makeBooking();">confirm</v-btn>
          <!-- <v-btn depressed class="ml-1" @click=" moveNext(); ">confirm</v-btn> -->
        </v-col>
      </v-row>
    </v-card>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';

export default {
  name: 'BookrBookingDetails',
  data() {
    return {
      databaseUid: this.$store.state.databaseUid,
    }
  },
  computed: {
    ...mapGetters(['colors','dayFull','week','year','stepper']),
    details () {
      return this.$store.getters.bookingDetails;
    }
  },
  methods: {
    moveBack () {
      this.$store.commit("decrStepper");
    },
    moveNext () {
      this.$store.commit("incrStepper");
    },
    dayIndexToString (dayIndex) {
      return this.dayFull[dayIndex - 1];
    },
    async makeBooking () {
      console.log(this.details);
      console.log(this.databaseUid);

      const userEmail = this.$fire.auth.currentUser.email;
      console.log(userEmail);

      const userUid = this.$fire.auth.currentUser.uid;
      console.log(userUid);

      let daysLength = Object.keys(this.details).length;
      let bookingsStrList = Array(daysLength);
      let bookingsMap = new Map();

      let uniqueDays = [];
      for (let key in this.details) {
        let dayMonth = this.week[key - 1].split("/");
        let year = this.year[key - 1];
        let docUid = year + "-" + dayMonth[1] + "-" + dayMonth[0];

        bookingsMap.set(docUid, []);

        for (const separateSlot of this.details[key]) {
          let startEndTimes = separateSlot.split("-");

          bookingsMap.get(docUid).push(separateSlot);

          // we need to set a field (in this case the date) firstly, otherwise the snapshots won't return the whole collections
          if (uniqueDays.indexOf(docUid) == -1) {
            uniqueDays.push(docUid);

            this.$fire.firestore
              .collection("users")
              .doc(userUid)
              .collection("bookings")
              .doc(docUid) // we can previously generate and store a unique uid to be used after
              .set({
                // TODO: convert to timestamp
                date: docUid,
              });
          }
          // console.log(startEndTimes, dayMonth, year, docUid);

          this.$fire.firestore
            .collection("users")
            .doc(userUid)
            .collection("bookings")
            .doc(docUid)
            .collection("data")
            .doc()
            .set({
              start: startEndTimes[0],
              end: startEndTimes[1],
              day: this.dayIndexToString(parseInt(key)),
              dayNumber: parseInt(dayMonth[0]),
              month: parseInt(dayMonth[1]),
              year: parseInt(year),
              checkin: false,
            }).then((res) => {

            });
        }
      }

      let bookingIndex = 0;
      console.log(bookingsMap);
      bookingsMap.forEach((value, i) => {
        console.log(value);
        console.log(i);
        console.log(bookingIndex);

        bookingsStrList[bookingIndex] = "Day " + i + ": ";

        value.forEach((v) => {
          bookingsStrList[bookingIndex] += v + " ";
        });

        ++bookingIndex;
      });


      let bookingsStrJoined = String();
      bookingsStrJoined = "Hi, this mail has been sent to you to confirm your recently made bookings. Please, see the bookings below: <br><br>";
      bookingsStrList.forEach((element) => {
        bookingsStrJoined += element;
        bookingsStrJoined += "<br>";
      });

      bookingsStrJoined += "<br>Sincerely,<br><br> SPM Fudan Team.";

      // Check if bookings have been made in order to send an email
      if(uniqueDays.length > 0) {
        /*this.$axios.$post('/api/mailer', {
          email: userEmail,
          content: bookingsStrJoined,
          })
          .then(_ => {

          })
          .catch((err) => {
            console.log("Err:", err);
          });*/

        // when email is sent, move to the next step
        this.moveNext();
      }
    }
  }
}
</script>