<template>
    <!-- <v-container fluid class="bookr__calendar pa-0"> -->
    <div class="bookr__calendar">
      <v-item-group multiple :max="conditions.max * 2" :style="'width:' + width ">
        <!-- time -->
        <v-row no-gutters>
          <!-- first element and every even numbered element, color border -->
          <v-col v-for="n in numBox" :key="n" :class="((n%2==0) || (n==1) ? 'timeslots__side' : 'timeslots__norm')"> 
            <template>
              <v-item v-if="n%2==0">
                <v-sheet class="pt-4 pb-4 text-center justify-center" color="#eeeeee">
                  <b>{{ time[(n/2)-1]  }}</b>
                </v-sheet>
              </v-item>
            </template>
          </v-col>
        </v-row>

        <!-- selectors -->
        <v-row no-gutters v-for="i in 5" :key=i>
          <v-col v-for="n in numBox" :key="n" class="timeslots">
            <template>
              <v-item v-slot="{ active, toggle }" v-if="n!=1">
                <v-sheet @click="toggle(); updateList(i,n)" :color="active ? '#3b47ec' : ''" style="height:100%; width:100%;" class="align-center justify-center text-center" align="center" justify="center">
                  <v-icon color="white" class="text-center pt-5 pb-5">mdi-check</v-icon>
                </v-sheet>
              </v-item>
              <v-item v-else>
                <v-sheet class="pt-2 pb-2 text-center justify-center bookr__calendar_day">
                  <span style="font-weight: bold;">{{ dayShort[i-1] }}</span>
                  <span>{{ week[i-1] }}</span>
                </v-sheet>
              </v-item>
            </template>
          </v-col>
        </v-row>
      </v-item-group>

      <div class="bookr__calendar_conditions mt-4">
        <b>min</b><span class="mr-4 font-weight-normal"> {{ conditions.min }} hour</span>
        <b>max</b><span class="mr-4"> {{ conditions.max }} hours</span>
        <b>up to</b><span class="mr-4"> {{ conditions.advance }} days in advance</span>
      </div>
    </div>
    <!-- </v-container> -->
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  name: 'BookrCalendar',
  props: {
    width: {
      type: String, 
      required: false,
    },
    conditions: {
      type: Object,
      required: true,
    }
  },
  data () {
    return {
      // day: ['MON','TUE','WED','THU','FRI'],
      time: ['7 AM','8 AM','9 AM','10 AM','11 AM','12 PM','1 PM','2 PM','3 PM','4 PM','5 PM','6 PM','7 PM','8 PM','9 PM','10 PM'],
      timeslots: {}
    }
  },
  computed: {
    ...mapGetters(['dayShort']),
    numBox () {
      return Array.from((Array((this.time.length*2)+1)), (e,i)=>i+1)
    },
    week () {
      var current = new Date();
      var week = new Array();
      current.setDate((current.getDate() - current.getDay() +1));
      for (var i = 0; i < 5; i++) {
        let t = new Date(current);
        let p = t.getDate() + '/' + (t.getMonth()+1);
        // t = t.split(' ').slice(0,2)
          week.push(p); 
          current.setDate(current.getDate() +1);
      }
      this.$store.commit('setWeek', week);
      return week
    }

  },
  methods: {
    updateList (day, time) {
      // timeslots {
      //   'key': {
      //     day: day,
      //     time: time,
      //   }
      // }
      

      if (Object.keys(this.timeslots).length > (this.conditions.max*2)-1 ) { return } // lets set a popup here 

      // day: 1...5 
      // time: 0...32 (33 in total) 
      let k = day + '_' + time;
      // time = ((time-1) * 30 / 60) + 7; // minus one because it's 1-indexed; hours + beginning 
      // console.log('before:' + this.$store.getters.timeslots);
      if (this.timeslots[k] !== undefined) { 
        delete this.timeslots[k];
        this.$store.commit('removeTimeslots', k);
        this.$store.commit('updateHistory', 'remove' );
        // console.log('here man deleting ' + k)
      }
      else { 
        // console.log('here man inserting ' + k)

        this.timeslots[k] = {
          'day': day, 
          'time': { 
            'start': this.$store.getters.time[time-1], // session start 
            'end': this.$store.getters.time[time] // session end 
            }
          } 
        this.$store.commit('setTimeslots', this.timeslots);
        this.$store.commit('updateHistory', 'insert' )
      }
      // console.log('after:' + this.$store.getters.timeslots);
    }
  }
}
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
      font-size: 1em
    }
  }

  .bookr__calendar_conditions * {
    font-family: -apple-system, BlinkMacSystemFont, "Helvetica Neue", "Arial", sans-serif;
    opacity: 0.9;
    font-size: 15px;
    font-family: 'Roboto';
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

</style>