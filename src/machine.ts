import { createMachine,  } from 'xstate';
export const machine = createMachine({
  id: "playerMachine",
  initial: "waiting",
  states: {
    waiting: {
      on: {
        SUCCESS: "ready",
        FAILED: "failed"
      }
    },
    failed: {},
    ready: {
      id: "readyMachine",
      initial: "ready",
      states: {
        ready: {
          on: {
            PLAY: {
              target: "playing",
              actions: ["playVideo"] //fire actions when the transition happen
            }
          }
        },
        playing: {
          on: {
            PAUSE: {
              target: "paused",
              actions: ["pauseVideo"]
            },
            RESET: {
              target: "playing",
              actions: ["resetVideo"]
            },
            END: {
              target: "ended",
              actions: ["stopVideo"]
            }
          }
        },
        paused: {
          on: {
            PLAY: {
              target: "playing",
              actions: ["playVideo"]
            },
            RESET: {
              target: "playing",
              actions: ["resetVideo"]
            },
            END: {
              target: "ended",
              actions: ["stopVideo"]
            }
          }
        },
        ended: {
          on: {
            RESET: {
              target: "playing",
              actions: ["resetVideo"]
            },
            PLAY: {
              target: "playing",
              actions: ["resetVideo"]
            }
          }
        }
      }
    }
  }
});