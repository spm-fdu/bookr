<template>
  <div>
    <v-card flat outlined class="pl-4 pr-4 pb-4">
      <v-card-title>Booking Summary</v-card-title>
      <!-- <v-card-text>time</v-card-text> -->
      <v-card-text v-for="(slots, d, index) in bookings" :key="d" class="">
        <v-row>
          <v-col sm="1">
            <v-btn
              depressed
              fab
              x-small
              plain
              disabled
              class="mr-4"
              style="color: rgb(0, 0, 0) !important"
              >{{ index + 1 }}</v-btn
            >
          </v-col>
          <v-col class="ml-4" sm="10">
            <div class="font-weight-normal">
              {{ dayFull[d - 1] }} {{ week[d - 1] }}
            </div>

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

        <!-- <v-divider></v-divider> -->
      </v-card-text>

      <v-btn
        depressed
        block
        :disabled="disable"
        @click="
          moveNext();
        "
        >Continue</v-btn
      >
    </v-card>
  </div>
</template>

<script>
import { mapGetters } from "vuex";

export default {
  name: "BookrSeatBook",
  components: {},
  data() {
    return {
      disable: true,
      databaseUid: this.$store.state.databaseUid,
    };
  },
  computed: {
    ...mapGetters(["colors","time", "dayFull", "week", "year", "stepper"]),
    bookings() {
      var t = {},
        counts = {},
        indices = {},
        f = {};
      let ordered = this.reorder(this.$store.getters.timeslots),
        k = Object.keys(ordered);

      // 2 slots as 1 hour
      if (k.length >= 2) {
        this.disable = false;
      } else {
        this.disable = true;
      }

      k.forEach((key) => {
        let current = ordered[key].day,
          start = ordered[key].time.start,
          end = ordered[key].time.end,
          indicesKey = [];

        if (t[current] === undefined) {
          t[current] = [];
        }
        if (counts[current] === undefined) {
          counts[current] = {};
        }

        // count occurence
        counts[current][start] = counts[current][start]
          ? counts[current][start] + 1
          : 1;
        counts[current][end] = counts[current][end]
          ? counts[current][end] + 1
          : 1;
      });

      // continuously find the time of only one occurence so we ignore duplicates
      // i.e., (16:00 16:30) (16:30 17:00)
      // 16:00 -> 1       \
      // 16:30 -> 2       -==>   (16:00, 17:00)
      // 17:00 -> 1       /
      Object.keys(counts).forEach((current) => {
        let sIdx = Object.values(counts[current]).indexOf(1);
        while (sIdx != -1) {
          if (indices[current] === undefined) {
            indices[current] = [];
          }
          indices[current].push(sIdx);
          sIdx = Object.values(counts[current]).indexOf(1, sIdx + 1);
        }

        // finalize and retrieve unique time
        indices[current].forEach((idx) => {
          t[current].push(Object.keys(counts[current])[idx]);
        });

        for (let i = 0; i < t[current].length / 2; i++) {
          if (f[current] == undefined) {
            f[current] = [];
          }
          if (f[current][i] == undefined) {
            f[current][i] = {};
          }
          // f[current][i] = `${t[current][i]}-${t[current][i*2]}`;

          if (i == 0) {
            f[current][i] = `${t[current][i]}-${t[current][i + 1]}`;
          } else {
            f[current][i] = `${t[current][i * 2]}-${t[current][i * 2 + 1]}`;
          } // multiple of 2
        }
      });
      
      this.$store.commit('setBookingDetails', f);
      return f;
    },
  },
  methods: {
    reorder(obj) {
      return Object.keys(obj)
        .sort()
        .reduce((o, key) => {
          o[key] = obj[key];
          return o;
        }, {});
    },
    moveNext() {
      this.$store.commit("incrStepper");
    },
    dayIndexToString(dayIndex) {
      return this.dayFull[dayIndex - 1];
    },
    sendBookingsToDatabase() {
      let uniqueDays = [];
      for (let key in this.bookings) {
        for (const separateSlot of this.bookings[key]) {
          let startEndTimes = separateSlot.split("-");
          let dayMonth = this.week[key - 1].split("/");
          let year = this.year[key - 1];

          let docUid = year + "-" + dayMonth[1] + "-" + dayMonth[0];

          // we need to set a field (in this case the date) firstly, otherwise the snapshots won't return the whole collections
          if (uniqueDays.indexOf(docUid) == -1) {
            uniqueDays.push(docUid);

            this.$fire.firestore
              .collection("users")
              .doc(this.databaseUid)
              .collection("bookings")
              .doc(docUid) // we can previously generate and store a unique uid to be used after
              .set({
                // TODO: convert to timestamp
                date: docUid,
              });
          }

          this.$fire.firestore
            .collection("users")
            .doc(this.databaseUid)
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
            });
        }
      }
    },
    async sendMail() {
      await this.$axios.$post('/api/mailer', {
        email: 'gerardmarcosfreixas@gmail.com'
      })
      .then((res) => {

      })
      .catch((err) => {
        console.log("Err:", err);
      })
    },
  },
};
</script>