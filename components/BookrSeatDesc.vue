<template>
  <div>
    <v-card flat class="pl-0 pr-0">
      <v-card-title class="pl-0 pr-0">Seat #{{ data.no }}</v-card-title>
      <v-card-subtitle class="pl-0 pr-0">{{ data.location }}</v-card-subtitle>
      <v-card-text class="pl-0 pr-0">{{ data.description }}</v-card-text>
    </v-card>

    <v-card class="d-flex mt-4" flat >
      <template v-for="(i,index) in icons" >
        <bookr-seat-icon :icon="i.icon" :color="i.color" :title="i.title" :key="index"></bookr-seat-icon>
      </template>

      <v-tooltip right>
        <template v-slot:activator="{ on, attrs }">
          <v-btn fab x-small depressed plain v-bind="attrs" v-on="on"><v-icon>mdi-information-outline</v-icon></v-btn>
        </template>
        <span>Equipment availability</span>
      </v-tooltip>
    </v-card>
  </div>
</template>

<script>
import BookrSeatIcon from './BookrSeatIcon.vue'

export default {
  name: 'BookrSeatDesc',
  components: {
    BookrSeatIcon
  },
  props: {
    data: Object
  },
  data () {
    return this.data 
  },
  computed: {
    icons () { // List of dictionaries 
      let arr = Array();
      Object.keys(this.data.equipments).forEach(key => {
        let d = {}
        if (key == 'power') { 
          d['icon'] = 'mdi-power-socket';
          d['title'] = 'Power Socket';
        }
        else if (key == 'projector') {
           d['icon'] = 'mdi-projector';
           d['title'] = 'Projector'
        } 

        d['color'] = this.getColorFromStatus(this.data.equipments[key].status)
        arr.push(d);
      });

      return arr
    },
  },
  methods: {
    getColorFromStatus (status) {
      if (status == 1) { return '#4de123' } 
      else if (status == 0) { return 'grey' }
      else { return 'red' }
    }
  }
}
</script>