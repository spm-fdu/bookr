import Vue from "vue"

export const state = () => ({
  persisted: {
    fname: '',
    lname: '',
    email: '',
    uid: '',
    admin: null,
    authenticated: false,
    lastSignInTime: '',
  },
  counter: 0,
  stepper: 1,
  history: [],
  uid: -1,
  time: {
    1: '07:00',
    2: '07:30',
    3: '08:00',
    4: '08:30',
    5: '09:00',
    6: '09:30',
    7: '10:00',
    8: '10:30',
    9: '11:00',
    10: '11:30',
    11: '12:00',
    12: '12:30',
    13: '13:00',
    14: '13:30',
    15: '14:00',
    16: '14:30',
    17: '15:00',
    18: '15:30',
    19: '16:00',
    20: '16:30',
    21: '17:00',
    22: '17:30',
    23: '18:00',
    24: '18:30',
    25: '19:00',
    26: '19:30',
    27: '20:00',
    28: '20:30',
    29: '21:00',
    30: '21:30',
    31: '22:00',
    32: '22:30',
    33: '23:00',
  },
  dayShort: ['MON','TUE','WED','THU','FRI'],
  dayFull: ["MONDAY", "TUESDAY", "WEDNESDAY", "THURSDAY", "FRIDAY"],
  colors: ["#f2c627", "#ff7530", "#63eb4b", "#ff30c8", "#ff2b56"],
  week: [],
  year: [],
  timeslots: {}, // [],
  test: {},
  databaseUid: '',
  bookingDetails: [],
  room: {
    name: '',
    floor: '',
    description: '', 
    power: null, 
    projector: null,
  }
})

export const getters = {
  stepper: (state) => {
    return state.stepper
  },
  timeslots: (state) => {
    return state.timeslots
  },
  time: (state) => {
    return state.time
  },
  dayShort: (state) => {
    return state.dayShort
  },
  dayFull: (state) => {
    return state.dayFull
  },
  week: (state) => {
    return state.week
  },
  year: (state) => {
    return state.year
  },
  persisted: (state) => {
    return state.persisted
  },
  colors: (state) => {
    return state.colors
  },
  bookingDetails: (state) => {
    return state.bookingDetails
  },
  room: (state) => {
    return state.room
  }
}

export const actions = {
  persist({ commit }, payload) {
    commit('SET_PERSIST', payload)
  },
  clearPersist({ commit }, _) {
    commit('CLEAR_PERSIST', _)
  }
}

export const mutations = {
  SET_PERSIST (state, payload) {
    state.persisted = payload;
  },
  CLEAR_PERSIST (state, _) {
    state.persisted = {
      fname: '',
      lname: '',
      email: '',
      authenticated: false,
    }
  },
  updateHistory (state, mode) {
    state.counter += 1;
    state.history.push({
      'counter': state.counter,
      'mode': mode,
    })
   },
  incrStepper (state, _) {
    state.stepper += 1;
  },
  decrStepper (state, _) {
    state.stepper -= 1;
  },
  setId (state, id) {
    state.id = id
  },
  setTimeslots (state, timeslot) {
    // if we use dictionary
    Object.keys(timeslot).forEach((key) => {
      Vue.set(state.timeslots, key, timeslot[key])
    })

    // state.timeslots.push(timeslot);

  },
  removeTimeslots (state, timeslot) {
    // state.timeslots.forEach((index) => {
    //   if (state.timeslots[index].day === timeslotKey) {
    //     state.timeslots.splice(index, 1);
    //   }
    // })
    Vue.delete(state.timeslots, timeslot)
  },
  setWeek (state, week) {
    state.week = week;
  },
  setYear(state, year) {
    state.year = year;
  },
  setBookingDetails(state, payload) {
    state.bookingDetails = payload;
  },
  reset(state, _) {
    // invoked (manually or after time countdown) after booking is confirmed
    state.bookingDetails = [];
    state.stepper = 1;
  },
  setRoom(state, payload) {
    state.room.name = payload.name; 
    state.room.description = payload.description; 
    state.room.floor = payload.floor; 
    state.room.power = payload.power; 
    state.room.projector = payload.projector; 
  }
}
export const strict = false
