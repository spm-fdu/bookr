<template>
  <!-- <v-container fluid class="bookr__calendar pa-0"> -->
  <div class="bookr__calendar">
    <v-item-group multiple :max="conditions.max * 2" :style="'width:' + width">
      <!-- time -->
      <v-row no-gutters>
        <!-- first element and every even numbered element, color border -->
        <v-col
          v-for="n in numBox"
          :key="n"
          :class="n % 2 == 0 || n == 1 ? 'timeslots__side' : 'timeslots__norm'"
        >
          <template>
            <v-item v-if="n % 2 == 0">
              <v-sheet
                class="pt-4 pb-4 text-center justify-center"
                color="#eeeeee"
              >
                <b>{{ time[n / 2 - 1] }}</b>
              </v-sheet>
            </v-item>
          </template>
        </v-col>
      </v-row>

      <!-- selectors -->
      <v-row no-gutters v-for="i in 5" :key="i">
        <v-col v-for="n in numBox" :key="n" class="timeslots">
          <template>
            <v-item v-if="n != 1">
              <v-sheet
                @click="
                  toggle(i, n);

                "
                :color="getInitialColor(i, n)"
                style="height: 100%; width: 100%"
                :class="`align-center justify-center text-center timeslots__${i}_${n}`"
                align="center"
                justify="center"
              >
                <v-icon :color="getInitialColor(i,n)" class="text-center pt-5 pb-5"
                  >mdi-check</v-icon
                >
              </v-sheet>
            </v-item>
            <v-item v-else>
              <v-sheet
                class="pt-3 pb-3 text-center justify-center bookr__calendar_day align-center"
              >
                <span style="font-weight: bold">{{ dayShort[i - 1] }}</span>
                <span
                  >{{ week[i - 1] }}
                  <!-- /{{
                    getLastTwoDigitsYear(year[i - 1])
                  }} -->
                  </span
                >
              </v-sheet>
            </v-item>
          </template>
        </v-col>
      </v-row>
    </v-item-group>

    <!-- TOREMOVE: Testing -->
    <!-- <v-btn depressed block @click="fetchData()">FETCH</v-btn> -->

    <div class="bookr__calendar_conditions mt-4">
      <span class="font-weight-bold">min</span>
      <span class="mr-4 font-weight-normal"> {{ conditions.min }} hour</span>
      <span class="font-weight-bold">max</span>
      <span class="mr-4"> {{ conditions.max }} hours</span>
      <!-- <span class="mr-4"> {{ conditions.advance }} days in advance</span> -->
    </div>
  </div>
  <!-- </v-container> -->
</template>

<script>
import { mapGetters } from "vuex";

export default {
  name: "BookrCalendar",
  props: {
    width: {
      type: String,
      required: false,
    },
    conditions: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {
      // day: ['MON','TUE','WED','THU','FRI'],
      time: [
        "7 AM",
        "8 AM",
        "9 AM",
        "10 AM",
        "11 AM",
        "12 PM",
        "1 PM",
        "2 PM",
        "3 PM",
        "4 PM",
        "5 PM",
        "6 PM",
        "7 PM",
        "8 PM",
        "9 PM",
        "10 PM",
      ],
      timeslots: {},
      toggled: [],
      blockedDay: [],
      blockedSlot: {
        1: [],
        2: [],
        3: [],
        4: [],
        5: [],
      },
    };
  },
  created () {
    // check whether entire day is blocked (i.e. we cannot book in the past) or certain slots are booked and have to be blocked
    let today = new Date();

    this.week.forEach((date, index) => {
      let splitDate = date.split('/')
      let day = splitDate[0];
      let month = splitDate[1];

      // if today's date is greater than the date in the week, then it is not available
      // new month 
      if ((today.getMonth() + 1) > month) {
        this.blockedDay.push(index + 1);
        return;
      }

      // same month, but today is greater than the date in the week
      // console.log(today.getDate() > day && )
      if (((today.getMonth() + 1) == month) && (today.getDate() > day)) {
        this.blockedDay.push(index + 1);
        return;
      }

      // since we checked the month and date, now we only need to check if the slot within the day 
      if (today.getDate() <= day) {
        const ref = this.$fire.firestore.collection("rooms")
                                        .doc(this.$store.state.room.name)
                                        .collection(`${today.getFullYear()}-${month}-${day}`).get() 
        ref.then(snapshot => {
          if (snapshot.docs.length > 0) {
            // console.log(snapshot.docs);
            snapshot.forEach(doc => {
              this.blockedSlot[index + 1].push(parseInt(doc.id) + 1)
            })
          }

          let cmpDate = new Date()
          
          // get all the indices before current time so we can block off the slots ($store.state.time uses index-based hence index is needed)
          const getSlotsBeforeCurrentTime = (slots) => slots
            .filter(time => cmpDate.setHours(time.split(':')[0], time.split(':')[1], 0) <= today.setHours(today.getHours(), today.getMinutes(), 0))
          
          // all the slots before current time 
          let slotsBeforeCurrentTime = getSlotsBeforeCurrentTime(Object.values(this.$store.getters.time)).map((_, index) => { return index + 1 })
          slotsBeforeCurrentTime.push(slotsBeforeCurrentTime[slotsBeforeCurrentTime.length - 1] + 1) // add the last slot to the list

          // merge blocked slots before current time with existing bookings 
          this.blockedSlot[today.getDay()] = [...new Set([...this.blockedSlot[today.getDay()], ...slotsBeforeCurrentTime])]
        })
      }
    })
  },
  computed: {
    ...mapGetters(["dayShort"]),
    numBox() {
      return Array.from(Array(this.time.length * 2 + 1), (e, i) => i + 1);
    },
    week() {
      var current = new Date();
      var week = new Array();
      var year = new Array();
      current.setDate(current.getDate() - current.getDay() + 1);
      for (var i = 0; i < 5; i++) {
        let t = new Date(current);
        let y = t.getFullYear();
        let p = t.getDate() + "/" + (t.getMonth() + 1);
        // t = t.split(' ').slice(0,2);
        week.push(p);
        year.push(y);
        current.setDate(current.getDate() + 1);
      }
      this.$store.commit("setWeek", week);
      this.$store.commit("setYear", year);
      return week;
    },
  },
  methods: {
    getInitialColor (day, slot) {
      if (this.blockedDay.includes(day) || this.blockedSlot[day].includes(slot)) {
        return 'grey lighten-2';
      } else {
        return 'white'; 
      }
    },
    toggle (day, slot) {
      // toggle will verify and return appropriate color 

      if (this.toggled.includes(`${day}_${slot}`)) {
        document.getElementsByClassName(`timeslots__${day}_${slot}`)[0].style.setProperty('background-color', 'white', 'important');

        this.toggled = this.toggled.filter(e => e !== `${day}_${slot}`);
        this.updateList(day, slot);
        return;
      }

      if (!(this.blockedDay.includes(day) || this.blockedSlot[day].includes(slot))) {
        document.getElementsByClassName(`timeslots__${day}_${slot}`)[0].style.setProperty('background-color', '#3b47ec', 'important');
        this.toggled.push(`${day}_${slot}`)
        // console.log(day, slot)
        this.updateList(day, slot);
      }

    },
    updateList(day, time) {
      // timeslots {
      //   'key': {
      //     day: day,
      //     time: time,
      //   }
      // }

      if (Object.keys(this.timeslots).length > this.conditions.max * 2 - 1) {
        return;
      } // lets set a popup here

      // day: 1...5
      // time: 0...32 (33 in total)
      let k = day + "_" + time;
      // time = ((time-1) * 30 / 60) + 7; // minus one because it's 1-indexed; hours + beginning
      // console.log('before:' + this.$store.getters.timeslots);
      if (this.timeslots[k] !== undefined) {
        delete this.timeslots[k];
        this.$store.commit("removeTimeslots", k);
        this.$store.commit("updateHistory", "remove");
        // console.log('here man deleting ' + k)
      } else {
        // console.log('here man inserting ' + k)

        this.timeslots[k] = {
          day: day,
          time: {
            start: this.$store.getters.time[time - 1], // session start
            end: this.$store.getters.time[time], // session end
          },
        };
        this.$store.commit("setTimeslots", this.timeslots);
        this.$store.commit("updateHistory", "insert");
      }
      // console.log('after:' + this.$store.getters.timeslots);
    },
    getLastTwoDigitsYear(year) {
      const yearLastTwoDigits = String(year).slice(-2);
      return Number(yearLastTwoDigits);
    },
    async fetchData() {
      // TODO we should get user data with persistent and before that, via set with onAuthStateChanged(...args)
      const uid = this.$fire.auth.currentUser.uid;
      console.log(uid);

      const ref = await this.$fire.firestore
        .collection("users")
        .doc(uid)
        .collection("bookings")
        .get()
        .then((bookingsSnapshot) => {
          bookingsSnapshot.forEach(bookings => {
            console.log(bookings.id, " => ", bookings.data());
            const ref2 = bookings.ref.collection("data").get().then(bookingSnapshot => {
              bookingSnapshot.forEach(booking => {
                  console.log(booking.id, booking.data())
                });
            });
          });
        });
    },
  },
};
</script>

<style lang="scss">
@media (min-width: $small-screen-size) {
  .bookr__calendar_day {
    font-size: 0.7em;
  }
}
@media (min-width: $medium-screen-size) {
  .bookr__calendar_day {
    font-size: 0.8em;
  }
}
@media (min-width: $large-screen-size) {
  .bookr__calendar_day {
    font-size: 1em;
  }
}

.bookr__calendar_conditions * {
  font-family: -apple-system, BlinkMacSystemFont, "Helvetica Neue", "Arial",
    sans-serif;
  opacity: 0.9;
  font-size: 15px;
  font-family: "Roboto";
  text-transform: uppercase;
}
.timeslots {
  border-width: 0.5px;
  border-style: solid;
  border-color: #c5c5c5;
  background-color: #eeeeee;
}

.timeslots:hover {
  color: red;
}

.timeslots__norm {
  border-width: 0.5px;
  border-right-style: dashed;
  border-top-style: solid;
  border-color: #c5c5c5;
  background-color: #eeeeee;
}
.timeslots__side {
  border-width: 0.5px;
  border-left-style: dashed;
  border-top-style: solid;
  border-color: #c5c5c5;
  background-color: #eeeeee;
}
// :color="(active && (!blockedDay.includes(i)) && (!blockedSlot[i].includes(n))) ? '#3b47ec' : ''"
</style>