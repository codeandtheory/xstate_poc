import { createMachine } from "xstate";


export const authMachine = createMachine({
  id: "auth",
  initial: "prompt",
  context: {
    loggedIn: false,
  },
  states: {
    prompt: {
      on: {
        ''
      }
    },
    'logged out': {},
    'logged in': {},
  }
});