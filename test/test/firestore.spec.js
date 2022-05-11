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

describe("make bookings", () => {
  it("should create a room as admin only", async () => {
    /**
     * Room should be structured as follows:
     * ROOMS -> ROOM_NUMBER -> DATE -> SLOT 
     * ROOM_NUMBER: room / seat number 
     * DATE: date 
     * SLOT: each slot is 30 minutes, starting from 07:00 to 22:00 
     */

    const admin = getAuthedFirestore(adminAuth);
    const user = getAuthedFirestore(genericAuth); 

    room = {
      booker: null, 
      availability: "available"
    }

    await firebase.assertSucceeds(
      admin.collection("rooms").doc("GHB213").collection("2022-01-01").doc("10").set(room)
    );

    // user unable to create room 
    await firebase.assertFails(
      user.collection("rooms").doc("GHB213").collection("2022-01-01").doc("10").set(room)
    )

  }); 
  it("should allow create a booking", async () => {
    // const admin = getAuthedFirestore(adminAuth);
    // const db = getAuthedFirestore(null); // as placeholder to query 
    const unauthenticated = getAuthedFirestore(null);
    const user = getAuthedFirestore(genericAuth); 
    const user2 = getAuthedFirestore(additionalGenericAuth);

    // create a room for testing 
    // admin.collection("rooms").doc("GHB213").collection("2022-01-01").doc("10").set(room)

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

    // update room availability to unavailable
    await firebase.assertSucceeds(
      user.collection("rooms").doc("GHB213").collection("2022-01-01").doc("10").update({ 
        booker: genericAuth.uid, 
        availability: "unavailable" 
      })
    );

    slotAvailability = (await user.collection("rooms").doc("GHB213").collection("2022-01-01").doc("10").get()).data().availability;
    bookingData = {
      day: "Tuesday",
      dayNumber: 3,
      end: "15:00",
      month: "1",
      start: "14:30",
      year: "2022",
      availability: slotAvailability,
      booker: genericAuth.uid
    }

    // authenticated user not allowed to make a booking on slots that are already booked
    await firebase.assertFails(
      user2.collection("bookings").doc(additionalGenericAuth.uid).collection("GHB213").doc("2022-01-01").collection("data").doc("10").set(bookingData)
    )
  });

  it("should not allow unauthenticated user to make booking", async () => {
    const unauthenticated = getAuthedFirestore(null);
    const user = getAuthedFirestore(genericAuth);
    var slotAvailability = (await unauthenticated.collection("rooms").doc("GHB213").collection("2022-01-01").doc("10").get()).data().availability;
    console.log(unauthenticated._delegate._credentials.auth)
    console.log(user._delegate._credentials.auth)
    // const bookingData = {
    //   day: "Tuesday",
    //   dayNumber: 3,
    //   end: "15:00",
    //   month: "1",
    //   start: "14:30",
    //   year: "2022",
    //   availability: slotAvailability,
    //   booker: unauthenticated.uid
    // }

    // await firebase.assertFails(
    //   unauthenticated.collection("bookings").doc(null).collection("GHB213").doc("2022-01-01").collection("data").doc("10").set(bookingData)
    // );
  });
});
