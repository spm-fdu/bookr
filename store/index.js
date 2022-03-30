import Vue from "vue"

export const state = () => ({
  persisted: {
    fname: '',
    lname: '',
    email: '',
    authenticated: false,
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
  week: [],
  timeslots: {}, // [],
  test: {},
  databaseUid
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
  setDatabaseUid(state, uid) {
    state.databaseUid = uid;
  }
}
export const strict = false
