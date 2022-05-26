/**
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
const firebase = require("@firebase/rules-unit-testing");
const fs = require("fs");
const http = require("http");

/**
 * The emulator will accept any project ID for testing.
 */
const PROJECT_ID = "bookr-c4524";

/**
 * The FIRESTORE_EMULATOR_HOST environment variable is set automatically
 * by "firebase emulators:exec"
 */
const COVERAGE_URL = `http://${process.env.FIRESTORE_EMULATOR_HOST}/emulator/v1/projects/${PROJECT_ID}:ruleCoverage.html`;


/**
 * Authentication 
 */
const genericAuth = {
  uid: "generic-user",
  role: "user"
}

const additionalGenericAuth = {
  uid: "additional-generic-user",
  role: "user"
}

const adminAuth = {
  uid: "admin-user",
  role: "admin"
}

/**
 * Creates a new client FirebaseApp with authentication and returns the Firestore instance.
 */
function getAuthedFirestore(auth) {
  return firebase
    .initializeTestApp({ projectId: PROJECT_ID, auth })
    .firestore();
}

beforeEach(async () => {
  // Clear the database between tests
  await firebase.clearFirestoreData({ projectId: PROJECT_ID });

  const admin = getAuthedFirestore(adminAuth);
  const room = {
    booker: null, 
    availability: "available"
  }

  // set room for testing 
  await admin.collection("rooms").doc("GHB213").collection("2022-01-01").doc("10").set(room)
});

before(async () => {
  // Load the rules file before the tests begin
  const rules = fs.readFileSync("firestore.rules", "utf8");
  await firebase.loadFirestoreRules({ projectId: PROJECT_ID, rules });

  console.log("The following test cases are designed to mock transactional behaviors of users against the Firestore database, and are separated into primarily rooms and bookings (read, update). `delete` is not supported as we design Bookr to modify the bookings by manipulating its field values i.e., changing booking statuses instead of complete deleting it from the database. This enables us to ensure records are kept for potential machine learning applications such as recommendation system and user-behavior learning.")
});

after(async () => {
  // Delete all the FirebaseApp instances created during testing
  // Note: this does not affect or clear any data
  await Promise.all(firebase.apps().map((app) => app.delete()));

  // Write the coverage report to a file
  const coverageFile = 'firestore-coverage.html';
  const fstream = fs.createWriteStream(coverageFile);
  await new Promise((resolve, reject) => {
      http.get(COVERAGE_URL, (res) => {
        res.pipe(fstream, { end: true });

        res.on("end", resolve);
        res.on("error", reject);
      });
  });

  console.log(`View firestore rule coverage information at ${coverageFile}\n`);
});

describe("create room", () => {
  it("should allow admin to create room", async () => {
    /**
     * Room should be structured as follows:
     * ROOMS -> ROOM_NUMBER -> DATE -> SLOT 
     * ROOM_NUMBER: room / seat number 
     * DATE: date 
     * SLOT: each slot is 30 minutes, starting from 07:00 to 22:00 
     */

    const admin = getAuthedFirestore(adminAuth);

    const roomFieldValues = {
      description: 'This is a basic description of the room.',
      power: 1, // equipment status availability
      projector: 0
    }

    // creates a room
    await firebase.assertSucceeds(
      admin.collection("rooms").doc("GHB213").set(roomFieldValues)
    );

    
  }); 
  
  it("should not allow non-admin to create room", async () => {
    const user = getAuthedFirestore(genericAuth); 
    
    const roomFieldValues = {
      description: 'This is a basic description of the room.',
      power: 1, // equipment status availability
      projector: 0
    }

    // user unable to create room 
    await firebase.assertFails(
      user.collection("rooms").doc("GHB213").set(roomFieldValues)
    )
  })
})

describe("update room field values", () => {
  beforeEach (async () => {
    const admin = getAuthedFirestore(adminAuth);

    const roomFieldValues = {
      description: 'This is a basic description of the room.',
      power: 1, // equipment status availability
      projector: 0
    }
  
    // set room for testing 
    await admin.collection("rooms").doc("GHB213").set(roomFieldValues);
  });

  it("should allow admin to update room field values", async () => {
    const admin = getAuthedFirestore(adminAuth);

    // update projector value to 1 (as working projector)
    await firebase.assertSucceeds(
      admin.collection("rooms").doc("GHB213").update({
        projector: 1
      })
    )
  });

  it("should not allow non-admin to update room field values", async () => {
    const user = getAuthedFirestore(genericAuth);

    // update projector value to 1 (as working projector)
    await firebase.assertFails(
      user.collection("rooms").doc("GHB213").update({
        projector: 1
      })
    )
  });
});

describe("read/query booking", () => {
  it("should allow authenticated users to read own bookings", async () => {
    const user = getAuthedFirestore(genericAuth); 
    const user2 = getAuthedFirestore(additionalGenericAuth); 

    var slotAvailability = (await user.collection("rooms").doc("GHB213").collection("2022-01-01").doc("10").get()).data().availability;

    // bookings -> USER_ID -> ROOM -> DATE -> (DATA only as collection) -> SLOT
    let bookingData = {
      day: "Tuesday",
      dayNumber: 3,
      end: "15:00",
      month: "1",
      start: "14:30",
      year: "2022",
      availability: slotAvailability,
      status: 'booked', // status should be booked, cancelled, checked-in
      booker: genericAuth.uid
    }

    // user making a booking 
    await firebase.assertSucceeds(
      user.collection("bookings").doc(genericAuth.uid).collection("GHB213").doc("2022-01-01").collection("data").doc("10").set(bookingData)
    );

    // user able to read own booking
    await firebase.assertSucceeds(
      user.collection("bookings").doc(genericAuth.uid).collection("GHB213").doc("2022-01-01").collection("data").doc("10").get()
    )

    // user2 attempting to read on user's bookings should fail
    await firebase.assertFails(
      user2.collection("bookings").doc(genericAuth.uid).get()
    )
  })

  it("should not let unauthenticated user query bookings", async () => {
    const user = getAuthedFirestore(genericAuth); 
    const unauthenticated = getAuthedFirestore(null); 

    var slotAvailability = (await user.collection("rooms").doc("GHB213").collection("2022-01-01").doc("10").get()).data().availability;

    // bookings -> USER_ID -> ROOM -> DATE -> (DATA only as collection) -> SLOT
    let bookingData = {
      day: "Tuesday",
      dayNumber: 3,
      end: "15:00",
      month: "1",
      start: "14:30",
      year: "2022",
      availability: slotAvailability,
      status: 'booked', // status should be booked, cancelled, checked-in
      booker: genericAuth.uid
    }

    // user making a booking 
    await firebase.assertSucceeds(
      user.collection("bookings").doc(genericAuth.uid).collection("GHB213").doc("2022-01-01").collection("data").doc("10").set(bookingData)
    );

    // unauthenticated user attempting to read on user's bookings should fail
    await firebase.assertFails(
      unauthenticated.collection("bookings").doc(genericAuth.uid).get()
    )
  });
})

describe("create booking", () => {
  it("should allow authenticated user to create a booking", async () => {
    const unauthenticated = getAuthedFirestore(null);
    const user = getAuthedFirestore(genericAuth);

    // retrieve time slot availability
    var slotAvailability = (await user.collection("rooms").doc("GHB213").collection("2022-01-01").doc("10").get()).data().availability;

    // bookings -> USER_ID -> ROOM -> DATE -> (DATA only as collection) -> SLOT
    let bookingData = {
      day: "Tuesday",
      dayNumber: 3,
      end: "15:00",
      month: "1",
      start: "14:30",
      year: "2022",
      availability: slotAvailability,
      status: 'booked', // status should be booked, cancelled, checked-in
      booker: genericAuth.uid
    }

    // unauthenticated user not allowed to make a booking 
    await firebase.assertFails(
      unauthenticated.collection("bookings").doc(genericAuth.uid).collection("GHB213").doc("2022-01-01").collection("data").doc("10").set(bookingData)
    );

    // authenticated user allowed to make a booking
    await firebase.assertSucceeds(
      user.collection("bookings").doc(genericAuth.uid).collection("GHB213").doc("2022-01-01").collection("data").doc("10").set(bookingData)
    );

    // update room availability to booked
    await firebase.assertSucceeds(
      user.collection("rooms").doc("GHB213").collection("2022-01-01").doc("10").update({ 
        booker: genericAuth.uid, 
        availability: "booked" 
      })
    );
  });

  it("should not allow unauthenticated user to make booking", async () => {
    const user = getAuthedFirestore(genericAuth);
    const unauthenticated = getAuthedFirestore(null); 

    // retrieve time slot availability
    var slotAvailability = (await user.collection("rooms").doc("GHB213").collection("2022-01-01").doc("10").get()).data().availability;

    // bookings -> USER_ID -> ROOM -> DATE -> (DATA only as collection) -> SLOT
    let bookingData = {
      day: "Tuesday",
      dayNumber: 3,
      end: "15:00",
      month: "1",
      start: "14:30",
      year: "2022",
      availability: slotAvailability,
      status: 'booked', // status should be booked, cancelled, checked-in
      booker: genericAuth.uid
    }

    /**  TESTING STARTS HERE */
    await firebase.assertFails(
      unauthenticated.collection("bookings").doc(genericAuth.uid).collection("GHB213").doc("2022-01-01").collection("data").doc("10").set(bookingData)
    )
  });

  it("should not allow another authenticated to make booking on booked slots", async () => {
    const user = getAuthedFirestore(genericAuth);
    const user2 = getAuthedFirestore(additionalGenericAuth); 

    // retrieve time slot availability
    var slotAvailability = (await user.collection("rooms").doc("GHB213").collection("2022-01-01").doc("10").get()).data().availability;

    // bookings -> USER_ID -> ROOM -> DATE -> (DATA only as collection) -> SLOT
    let bookingData = {
      day: "Tuesday",
      dayNumber: 3,
      end: "15:00",
      month: "1",
      start: "14:30",
      year: "2022",
      availability: slotAvailability,
      status: 'booked', // status should be booked, cancelled, checked-in
      booker: genericAuth.uid
    }

    // authenticated user allowed to make a booking
    await firebase.assertSucceeds(
      user.collection("bookings").doc(genericAuth.uid).collection("GHB213").doc("2022-01-01").collection("data").doc("10").set(bookingData)
    );

    // update room availability to booked
    await firebase.assertSucceeds(
      user.collection("rooms").doc("GHB213").collection("2022-01-01").doc("10").update({ 
        booker: genericAuth.uid, 
        availability: "booked" 
      })
    );

    /***************************/
    /**  TESTING STARTS HERE  **/
    /***************************/
    slotAvailability = (await user.collection("rooms").doc("GHB213").collection("2022-01-01").doc("10").get()).data().availability;
    
    await firebase.assertFails(
      user2.collection("bookings").doc(genericAuth.uid).collection("GHB213").doc("2022-01-01").collection("data").doc("10").set(bookingData)
    )
  })  
});

describe("update booking", async () => {
  beforeEach (async () => {
    // let's create a booking as default scenario 
    const user = getAuthedFirestore(genericAuth);
    var slotAvailability = (await user.collection("rooms").doc("GHB213").collection("2022-01-01").doc("10").get()).data().availability;

    let bookingData = {
      day: "Tuesday",
      dayNumber: 3,
      end: "15:00",
      month: "1",
      start: "14:30",
      year: "2022",
      availability: slotAvailability,
      status: 'booked', // status should be booked, cancelled, checked-in
      booker: genericAuth.uid
    }

    await firebase.assertSucceeds(
      user.collection("bookings").doc(genericAuth.uid).collection("GHB213").doc("2022-01-01").collection("data").doc("10").set(bookingData)
    );

    // update room availability to booked
    await firebase.assertSucceeds(
      user.collection("rooms").doc("GHB213").collection("2022-01-01").doc("10").update({ 
        booker: genericAuth.uid, 
        availability: "booked" 
      })
    );

  });

  it("should allow booking owner to cancel booking", async () => {
    const user = getAuthedFirestore(genericAuth);

    // owner allowed to cancel booking
    await firebase.assertSucceeds(
      user.collection("bookings").doc(genericAuth.uid).collection("GHB213").doc("2022-01-01").collection("data").doc("10").update({
        status: "cancelled"
      })
    )
  });

  it("should allow booking owner to modify booking", async () => {
    // note, modify booking involves cancelling current booking and rebooking 
    const user = getAuthedFirestore(genericAuth);
    const user2 = getAuthedFirestore(additionalGenericAuth); 
    
    var slotAvailability = (await user.collection("rooms").doc("GHB213").collection("2022-01-01").doc("10").get()).data().availability;
    let newBookingData = {
      day: "Tuesday",
      dayNumber: 3,
      end: "15:30",
      month: "1",
      start: "15:00",
      year: "2022",
      availability: slotAvailability,
      status: 'booked', // status should be booked, cancelled, checked-in
      booker: genericAuth.uid
    }

    await firebase.assertSucceeds(
      user.collection("bookings").doc(genericAuth.uid).collection("GHB213").doc("2022-01-01").collection("data").doc("10").update({
        status: "cancelled"
      }),
      user.collection("bookings").doc(genericAuth.uid).collection("GHB213").doc("2022-01-01").collection("data").doc("10").set(newBookingData)
    )
  });

  it("should not allow non-booking owner to cancel booking", async () => {
    
    const user2 = getAuthedFirestore(additionalGenericAuth); 
    
    // non-owner not allowed to cancel booking
    await firebase.assertFails(
      user2.collection("bookings").doc(genericAuth.uid).collection("GHB213").doc("2022-01-01").collection("data").doc("10").update({
        status: "cancelled"
      })
    )
  });

  it("should not allow non-booking owner to modify booking", async () => {
    const user2 = getAuthedFirestore(additionalGenericAuth); 
    
    var slotAvailability = (await user2.collection("rooms").doc("GHB213").collection("2022-01-01").doc("10").get()).data().availability;
    let newBookingData = {
      day: "Tuesday",
      dayNumber: 3,
      end: "15:30",
      month: "1",
      start: "15:00",
      year: "2022",
      availability: slotAvailability,
      status: 'booked', // status should be booked, cancelled, checked-in
      booker: genericAuth.uid
    }

    // non-owner not allowed to modify booking
    await firebase.assertFails(
      user2.collection("bookings").doc(genericAuth.uid).collection("GHB213").doc("2022-01-01").collection("data").doc("10").update({
        status: "cancelled"
      }),
      user2.collection("bookings").doc(genericAuth.uid).collection("GHB213").doc("2022-01-01").collection("data").doc("10").set(newBookingData)
    )
  });
});
