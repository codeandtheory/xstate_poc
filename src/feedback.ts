import { createMachine, createActor } from 'xstate';

const feedbackMachine = createMachine({
  /** @xstate-layout N4IgpgJg5mDOIC5QDMyQEYEMDGBrAdAI4CucALgJYD2AdgMSoY4FRVUQDaADALqKgAHKrAqVa-EAA9EARgAsANnwK5ADjlyAzAHZVmgJxb9AGhABPRAFZN+LvtUAmfZs0zV27Zcv6Avj9OMEFh4RKSwYvSBwQRYnLwSQiIREtIIKvialgq6qt4ezqqmFggAtKpc+JaqMprl5ZpcqgoGfgFoQcx0AKIAbmA0ZAAEMtx8SCCJotQ0KYhy2g74Msv62jIq2ZbzckWIJZqLcvpcDnIyXMs1qvZ+-iA07HASUcwJwlPi46klMtrKCgCsg13Fw5FwPLtSus-sc5E4tBcFFxwTJWiAXiESORpm8kjivogGhkXJotAp9DInN4HJpIfp8Lksio5FsHJc7GiMQQyAALTA0XDwcaTZIEhCuJSWNwOGWrLZnSyQ87Ka7IgGqXKg7yo25AA */
  id: 'feedback',

  initial: 'question',

  states: {
    question: {
      on: {
        'feedback.good': {
          target: 'thanks',
        },

        "feedback.bad": "thanks"
      },
    },
    thanks: {
    },
    // ...
  },

  on: {
    "Event 1": "#feedback"
  }
});

const feedbackActor = createActor(feedbackMachine);


feedbackActor.subscribe((state) => {
  console.log(state.value);
});

feedbackActor.start();
// logs 'question'

feedbackActor.send({ type: 'feedback.bad' });
// logs 'thanks'
feedbackActor.send({ type: 'thanks.recommend.yes' });
