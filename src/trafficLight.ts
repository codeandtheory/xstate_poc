import { createMachine, createActor } from 'xstate';

export const trafficLightMachine = createMachine({
  /** @xstate-layout N4IgpgJg5mDOIC5QBcBOBDAZpglgYwBkcoALZAOlUgGJkBXVAOwHEqxGBtABgF1FQADgHtYOZDiGN+IAB6IAjAGYu5AKwAOVV1UBOAOyL5XAGw71xgDQgAngsPl5AFnWPHypYsfGATKoC+flZoWLiExGTkUGyMtAyMAEqQ3HxIIMKi4pLScghOxuSOqo7yOlyG3qXqeo5Wtgjq8g5VFXomVXp6qnoBgSCMQhBw0sHY+ESkyNLpYhJSqTkAtJY2iEsBQRijYROUkFMiM1nziI7etYhV5FxlGjqF2hry8usgI6HjEVFg7PsZs9mIbzGfINVSqIEVdSGbQ1Fb1HRqMrGLjVLTybydfw9IA */
  id: 'trafficLight',
  initial: 'red', // Initial state of the machine
  states: {
    red: { // A state in the machine
      on: { // Transitions to run when certain events are received
        turnGreen: { // A transition that runs when the turnGreen event is received
          target: 'green' // The state to transition to
        }
      }
    },
    green: { // Another state in the machine
      on: {
        turnRed: {
          target: 'red'
        }
      },
    }
  }
});