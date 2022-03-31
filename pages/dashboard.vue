<template>
  <v-container fill-height fluid class="pa-16">
    <!-- {{ $store.state.auth.user }} -->
    <v-row>
      <!-- upcoming booking details -->
      <v-col cols="4">
        <v-card elevation="1" max-width="500">
          <v-card-title>
            <v-icon class="ma-6">mdi-calendar-month-outline</v-icon>
            <span>Upcoming appointment</span>
          </v-card-title>
          <v-divider></v-divider>
          <v-row justify="center">
            <v-col cols="4" class="pr-0 pb-0">
              <v-card elevation="0" style="height:100%" class="text-center justify-center align-center pa-4 pb-0">
                  <h1 class="font-weight-bold" style="font-size:2vw">MARCH</h1>
                  <h1 class="font-weight-black" style="font-size:5vw">18</h1>
              </v-card>
            </v-col>

            <v-divider class="mx-1 mt-3" vertical></v-divider>

            <v-col class="pb-0">
              <v-card elevation="0" style="height:100%" class="pa-0 pt-4">
                <v-card-subtitle class="text-overline pb-0">Ref No.: {{ upcoming.ref }}</v-card-subtitle>
                <v-card-subtitle class="text-overline pb-0">Location: {{ upcoming.location }}</v-card-subtitle>
                <v-card-subtitle class="text-overline">Time: {{ upcoming.time }}</v-card-subtitle>
              </v-card>
            </v-col>
          </v-row>

        </v-card>
      </v-col>
      <v-col cols="8">
        <v-card elevation="1">
          <v-card-title>
            <v-icon class="ma-6">mdi-heart-flash</v-icon>
            <span>Today's Availability</span>
          </v-card-title>
          <v-divider></v-divider>
          <v-row>
            <v-col>
              <!-- <test-gauge :title="'Some Bar Chart'"></test-gauge> -->
            </v-col>
            <v-divider class="mx-1 mt-3" vertical></v-divider>
            <v-col justify="center" align="center">
              <test-pie :data="pie.data" :colorGroup="pie.colorGroup"></test-pie>
              <!-- <v-row>
                <v-card-text class="text-overline">Guanghua Building</v-card-text>
              </v-row>
              <v-divider class="py-2"></v-divider>
              <v-row class="pb-4" justify="center" align="center">
                <test-pie :data="pie.data" :colorGroup="pie.colorGroup"></test-pie>
              </v-row> -->
            </v-col>
            <v-divider class="mx-1 mt-3" vertical></v-divider>
            <v-col></v-col>
          </v-row>
        </v-card>
      </v-col>
    </v-row>
    {{ $store.state.persisted }}
  </v-container>
</template>

<script>
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
      upcoming: {
        ref: '#12345',
        time: '14:00',
        type: 'room',
        location: 'Guanghua Building'
      },
      pie: {
        data: [
          {
            "group": "Available",
            "value": 20
          },
          {
            "group": "Unavailable",
            "value": 10
          },
          {
            "group": "In Use/Booked",
            "value": 50
          },
        ],
        colorGroup: {
          "Available": "#5dba00",
          "Unavailable": "#4f4f4f",
          "In Use/Booked": "#ffba24"
        }
      }
    }
  }
}
</script>
