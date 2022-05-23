<template>
  <v-container fluid fill-height class="align-start">
    <v-row class="d-flex ma-10" align="center">
      <v-col>
        <v-card>
          <bookr-data-table :headers="headers" :data="bookings" :bookingBtn="false" :loading="loading" :search="search" title="All Bookings"></bookr-data-table>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>;
import BookrDataTable from '../components/BookrDataTable.vue';

export default {
  components: {
    BookrDataTable
  },
  middleware ({ store, redirect }) {
    if (!store.state.persisted.admin) {
      // force reroute if non-admin
      redirect('/dashboard')
    }
  },
  data () {
    return {
      search: '',
      headers: [
        {
          text: 'User ID',
          value: 'uid',
          // align: '',
          // sortable: ''
        },
        {
          text: 'Booking ID',
          value: 'bid',
        },
        {
          text: 'Booking Date',
          value: 'date',
          align: 'center',
        },
        {
          text: 'Session Start',
          value: 'start',
          align: 'center',
        },
        {
          text: 'Session End',
          value: 'end',
          align: 'center',
        },
        {
          text: 'Location',
          value: 'location',
          align: 'center',
        },
        {
          text: 'Booking Status',
          value: 'status',
          align: 'center',
        },
        {
          text: 'Action',
          value: 'action'
        }
      ],
      loading: true, // initial loading state
      users: [],
      bookings: []
    }
  },
  methods: {
    async getNonAdminBookings () {
      const ref = await this.$fire.firestore
        .collection("users")
        .where("admin", "==", false)
        .get()
        .then((usersSnapshot) => {
          usersSnapshot.forEach((doc) => {
            let uid = doc.id;
            // user
            // console.log(doc.id, " => ", doc.data());
            const bookingsRef = doc.ref.collection("bookings").get().then((bookingsSnapshot) => {
              // date 
              bookingsSnapshot.forEach((bookings) => {
                let date = bookings.id;
                // console.log(bookings.id, " => ", bookings.data());
                const bookingDayRef = bookings.ref.collection("data").get().then((bookingDaySnapshot => {
                  // booking details 
                  // let bid, start, end, location, status;
                  bookingDaySnapshot.forEach(booking => {
                    // console.log(booking.id, " => ", booking.data())
                    let data = booking.data();
                    // bid = booking.id; 
                    // start = data.start;
                    // end = data.end;
                    // location = data.location;
                    // status = data.status;

                    this.bookings.push({
                      uid: uid,
                      bid: booking.id,
                      date: date,
                      start: data.start,
                      end: data.end,
                      location: data.room,
                      status: data.status ? data.status : 'unknown',
                    });
                  });
                }));
              });
            });
            this.loading = false; // completed data pulling 
          });
        });
    }
  },
  created () {
    this.getNonAdminBookings();
  }

    // async bookings () { 
    //   // all bookings 
    //   let b = {}
    //   let promises = []

    //   let user = this.$fire.firestore.collection("users");
    //   let userSnapshot = await user.get();


    //   for (const userDoc in userSnapshot) {
    //     // user doc is user id 
    //     let booking = user.doc(userDoc).collection("bookings");
    //     let bookingSnapshot = await booking.get();

    //     for (const bookingDoc in bookingSnapshot) {
    //       let bookingDate = booking.doc(bookingDoc).collection("data");
    //       let bookingDateSnapshot = await bookingDate.get();

    //       bookingDateSnapshot.forEach((doc) => {
    //         console.log(doc.data() )
    //       })

    //       // for (let bookingIdDoc in bookingDateSnapshot) {

    //       //   console.log(bookingIdDoc.data());
    //       //   // promises.push(bookingIdDoc.data())
    //       //   // promises.push(bookingDate.doc(bookingIdDoc).data());
    //       // }
    //     }
    //   }

    //   // Promise.all(promises).then((val) => {
    //   //   console.log(val);
    //   // })
    //   // userSnapshot.forEach((userDoc) => {
    //   //   // user doc is user id 
    //   //   let booking = user.doc(userDoc).collection("bookings");
    //   //   let bookingSnapshot = await booking.get();

    //   //   bookingSnapshot.forEach((bookingDoc) => {
    //   //     // booking doc is date 
    //   //     let bookingId = booking.doc(bookingDoc).collection("data");
    //   //     let bookingIdSnapshot = await bookingId.get();

    //   //     bookingIdSnapshot.forEach((bookingIdDoc) => {
    //   //       // bookingIdDoc is booking id (randomly generated)
    //   //       console.log(bookingIdDoc.get().data())
    //   //       // if (b[userDoc] && b[userDoc].length > 1) {
    //   //       //   b[userDoc].push(bookingId.doc(bookingIdDoc).get().data())
    //   //       // }
    //   //       // b[userDoc] = []
    //   //     })
    //     // })
    //   // })

    //   // this.$fire.firestore.collection("users").get().then((userSnapshot) => {
    //   //   userSnapshot.forEach((userDoc) => {
    //   //     this.$fire.firestore.collection("users").doc(userDoc.id).collection("bookings").get().then((bookingSnapshot) => {
    //   //       bookingSnapshot.forEach((bookingDoc) => {

    //   //         console.log(bookingDoc.data())
    //   //       })
    //   //     })
    //   //   })
    //   //     // console.log(doc);
    //   //     // console.log(doc.listCollections())
    //   // })

    //   // console.log(await this.$fire.firestore.collection("users").listCollections())
    //   // await this.$fire.firestore.collection("users").get().then((snapshot) => {
    //   //   console.log(snapshot.docs.map(doc => doc.data()));
    //   // })


    // //   return await this.$fire.firestore.collection("users").get().then(async (snapshot) => {
    // //     const promises = [];
    // //     snapshot.forEach((doc) => {
    // //       // const document = { [doc.id]: doc.data() };
    // //       promises.push(doc.data())
    // //       // documents.push(document);
    // //     })

    // //     Promise.all(promises).then((arr) => {
    // //       arr.forEach(ss => {
            
    // //       })
    // //     })
    // //     // return documents;
    // //   })
    // //   // const documents = [];
    // //   // snapshot.forEach((doc) => {
    // //   //   const document = { [doc.id]: doc.data() };
    // //   //   documents.push(document);
    // //   // })
    // //   // console.log(documents);
    // //   // return documents;
    // }
}
</script>