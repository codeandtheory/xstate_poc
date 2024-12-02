import { createMachine } from "xstate";

export const trafficLightMachine = createMachine({
  /** @xstate-layout N4IgpgJg5mDOIC5gF8A0IB2B7CdGgBcAnAQwDMyBLAYwBlKoALA-EABy1koMqw1YAeiALQA2dAE8Ro5GhDFyVOg2YA6IpFYcuPPoMQBWAAyqALKKMAOAMzWAjJdGXLAdiPXJiO9YCcqp0ZWdqI+1iEuLjJyChQ09EwEqhJgADYpWADuWpzcvPxIIEIIpgBMngh2Ppaqdi4lziU+pi4GPkYGJbLoMUrxalAaYPmg2rl6BUWmpqrW7RFGPqKipkamteWWdjWu9au+lu3tsrJAA */
  id: "trafficLight",
  initial: "red",
  states: {
    red: {
      on: {
        turnGreen: 'green'
      }
    },
    green:{
      on: {
        turnYellow: 'yellow'
      }
    },
    yellow: {
      on: {
        turnRed: 'red'
      }
    },
  }
})

// export const trafficLightMachine = createMachine({
//   id: 'trafficLight',
//   initial: 'red',
//   states: {
//     green: {
//       on: {
//         TIMER: 'yellow',
//       },
//     },
//     yellow: {
//       on: {
//         TIMER: 'red',
//       },
//     },
//     red: {
//       on: {
//         TIMER: 'green',
//       },
//     },
//   },
// });