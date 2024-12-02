import { createMachine } from "xstate";

export const machine2 = createMachine({
  /** @xstate-layout N4IgpgJg5mDOIC5QDMyQEYEMDGBrAdAA4BOA9gLaEAuAxFKaRANoAMAuoqIabAJZW9SAO04gAHogCMANgDM+aQCYAnIsUBWFgA5l05ev0AaEAE9EilsvzLZLRQBYWB9faWqAvu+OoMOAiQpqGixmdlFuPgFhUQkEGXk3NU0dPWdjMzjZSXxZFRUZPS0Adnt7T280CCw8fGRSYnIaZF4AGxbWDiQQCP5BES7Y2XVslkcWaRZtWVVdWXTEHXxSrRUitUknIq3ykB8qv1r6xurcDvCeXuiBqWl1JcUtOWl7Ip1JGyL5hC1s2VvHeyqDbPSSeLwgISMOCiPYnc6RPoxRAAWmkX1RO1hBwClCo8Mu-VAsXsii+i2Ua2UFI0GleykxlROhwa+KihPE5jk+EkBhmdkUbjRpgWVmkP3UT309h+ylB4KxNSoAAtMEJcPAuj02UiEKVssNRo5ZPZ3jIvrprFlJGppEpJCTFLIwe4gA */
  id: "feedback",
  initial: "prompt",
  context: {
    feedback: ""
  },
  states: {
    prompt: {
      on: {
        'good': 'thanks',
        'bad': 'form'     
      }
    },
    form: { 
      on: {
        'fill': 'thanks',
        'back': 'prompt'
      }
    },
    thanks: {}
  },
});