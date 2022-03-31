<template>
  <!-- <v-container fluid fill-height> -->
    <div>
      <v-row>
        <v-card-text class="text-overline">Guanghua Building</v-card-text>
      </v-row>
      <v-divider class="py-2"></v-divider>
      <v-row class="pb-4" justify="center" align="center">
        <v-card elevation="0">
          <ccv-pie-chart :data='data' :options='options'></ccv-pie-chart>  
        </v-card>
      </v-row>
    </div>
  <!-- </v-container> -->
</template>

<script>
export default {
  name: 'TestPie',
  props: {
    data: {
      type: Array,
      require: true
    },
    title: {
      type: String,
      require:true, 
    },
    height: {
      type: String,
      require: false,
    },
    width: {
      type: String,
      require: false,
    },
    colorGroup: {
      type: Object,
      require: false,
    }
  },
  // data () {
  //   return {
  //     data: [
  //         {
  //             "group": "2V2N 9KYPM version 1",
  //             "value": 20000
  //         },
  //         {
  //             "group": "L22I P66EP L22I P66EP L22I P66EP",
  //             "value": 65000
  //         },
  //         {
  //             "group": "JQAI 2M4L1",
  //             "value": 75000
  //         },
  //         {
  //             "group": "J9DZ F37AP",
  //             "value": 1200
  //         },
  //         {
  //             "group": "YEL48 Q6XK YEL48",
  //             "value": 10000
  //         },
  //         {
  //             "group": "Misc",
  //             "value": 25000
  //         }
  //     ],
  //   }
  // },
  computed: {
    options () {
      return {
          "title": this.title,
          "resizable": true,
          "legend": {
              "alignment": "center"
          },
          "pie": {
              "alignment": "center"
          },
          "color": {
            "scale": this.colorGroup || {}
          },
          "height": this.height || "200px",
          "width": this.width || "200px",
          "toolbar": {
            "enabled": false,
          }
      }
    }
  }
}
</script>