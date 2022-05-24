<template>
  <v-container fluid fill-height>
    <v-row v-if="rooms.length == 0">
      <v-col cols="4">
        <v-sheet>
          <v-skeleton-loader type="card" class="mx-auto"></v-skeleton-loader>
          <v-skeleton-loader
          type="article, actions"
        ></v-skeleton-loader>
        </v-sheet>
      </v-col>
      <v-col>
        <v-sheet>
            <v-skeleton-loader
              type="card-avatar, article, actions"
            ></v-skeleton-loader>
        </v-sheet>
      </v-col>
    </v-row>
    <v-row v-else>
      <v-col v-for="(room, index) in rooms" :key="index" cols="4">
        <v-card class="pa-5">
          <v-img :src="require(`../static/discussionroom${index+1}.jpg`)"></v-img>
          <v-card-title class="font-weight-black">{{ room.name }}</v-card-title>
          <v-card-subtitle>Location: {{ room.floor }}</v-card-subtitle>
          <v-card-text class="text-body-1">{{ room.description }}</v-card-text>
          <v-btn depressed class="ma-4" @click="bookRoom(room)">
            book this room
            <v-icon>mdi-arrow-right-thin</v-icon>
          </v-btn>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  name: 'BookrRoom',
  // props: {
  //   rooms: {
  //     type: Array,
  //     required: false
  //   },
  // },
  data () {
    return {
      rooms: [], 
    }
  },
  methods: {
    bookRoom(room) { 
      // console.log(room);
      this.$store.commit('setRoom', room);
    }
  },
  mounted () {
    // console.log('BookrRoom created')
    const ref = this.$fire.firestore.collection("rooms").get().then(snapshot => {
      snapshot.forEach(doc => {
        let data = doc.data();
        let room = {
          name: doc.id, 
          description: data.description,
          floor: data.floor,
          power: data.power, 
          projector: data.projector,
        }
        this.rooms.push(room); 
      })
    })
  },
}
</script>