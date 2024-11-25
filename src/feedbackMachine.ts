import { assign, setup } from 'xstate';

export const feedbackMachine = setup({
  types: {
    context: {} as { feedback: string },
    events: {} as
      | {
          type: 'feedback.good';
        }
      | {
          type: 'feedback.bad';
        }
      | {
          type: 'feedback.update';
          value: string;
        }
      | { type: 'submit' }
      | {
          type: 'close';
        }
      | { type: 'back' }
      | { type: 'restart' }
  },
  guards: {
    feedbackValid: ({ context }) => context.feedback.length > 0
  }
}).createMachine({
  /** @xstate-layout N4IgpgJg5mDOIC5QDMyQEYEMDGBrAxNgDYD2sYA2gAwC6ioADmQJYAuzJAdvSAB6IAWAEwAaEAE9EARgDsMgHQA2GQE5FKgMwapWzVRkBfA2NQYcueQwBOJALYNW+UxCx55UEiQjU6SEE1g2Dm4-fgQBGQAOeQiouSoVFVkqATFJBA0qKXlI4QFtKiEBAQBWSMiSoxM0F3NLG3tHZ1cLLG9aHgCgrh4wiOjYyPjE5NSJRCEpFXkdIVUS0qkSmSpIqpBmuuQSK1snGpb5AFcGCExWSg6-LvYe0MRFUvlVkrUhVeUFyLTESOyNIRCJJZSaKLQadabNzbXb4Fo+TosW4hUBhEolIQxFQCSKAwE4qjon4IKTqeSZGRAhJaGSxASQg5bHZ7WBHdC2NgI65I4K9X5CEpKJL5dGKSIpRQlYlSP4xIHKIaShYyDSVYwbRluYhkSD4KxwViYKysLmMHl3VETJ4aJKaKQCZQaRRUMXShbyFTo-RAjHqe1GdWcLxwHhQ3CIwLIvkIAC0imJcYZZjc1jsDgj3RRfEQqsUORKhXU+hpQnj4xJchyEUeqx0WRtQiTtWhzIzUfuCD9MQEKki2MWBcUZfSMuyrxkSqdLzUauqyYsrAAFphOLh4NzI7yO1JCYLS7JSlFiuLvuWZdFcq8dEkSg31E3DtryBA21vLST8jNSxTNOKZBiNGlStcjkIQbRFZ1sQDAwgA */
  id: 'feedback',
  initial: 'prompt',
  context: {
    feedback: ''
  },
  states: {
    prompt: {
      on: {
        'feedback.good': 'thanks',
        'feedback.bad': 'form'
      }
    },
    form: {
      on: {
        'feedback.update': {
          actions: assign({
            feedback: ({ event }) => event.value
          })
        },
        back: { target: 'prompt' },
        submit: {
          guard: 'feedbackValid',
          target: 'thanks'
        }
      }
    },
    thanks: {},
    closed: {
      on: {
        restart: {
          target: 'prompt',
          actions: assign({
            feedback: ''
          })
        }
      }
    }
  },
  on: {
    close: '.closed'
  }
});