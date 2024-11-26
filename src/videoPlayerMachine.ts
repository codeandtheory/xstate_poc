import { assign, setup } from 'xstate';

interface VideoContext {
  src: string;
  volume: number;
  playbackRate: number;
  currentTime: number;
  duration: number;
  isMuted: boolean;
  error?: string;
}

export const videoPlayerMachine = setup({
  types: {
    context: {} as VideoContext,
    events: {} as
      | { type: 'load', src: string }
      | { type: 'play' }
      | { type: 'pause' }
      | { type: 'seek'; time: number }
      | { type: 'volumeChange'; value: number }
      | { type: 'playbackRateChange'; value: number }
      | { type: 'muteToggle' }
      | { type: 'error'; message: string }
      | { type: 'ended' }
  },
}).createMachine({
  id: 'videoPlayer',
  context: {
    src: '',
    volume: 0.5,
    playbackRate: 1,
    currentTime: 0,
    duration: 0,
    isMuted: false,
  },
  states: {
    idle: {
      on: {
        load: {
          target: 'loading',
          actions: assign({
            src: ({ event }) => event.src
          })
        }
      }
    },
    loading: {
      on: {
        error: {
          target: 'error',
          actions: assign({
            error: ({ event }) => event.message
          })
        }
      }
    },
    playing: {
      on: {
        pause: 'paused',
        ended: 'ended',
        seek: {
          actions: assign({
            currentTime: ({ event }) => event.time
          })
        },
        volumeChange: {
          actions: assign({
            volume: ({ event }) => event.value
          })
        },
        muteToggle: {
          actions: assign({
            isMuted: ({ context }) => !context.isMuted
          })
        },
        playbackRateChange: {
          actions: assign({
            playbackRate: ({ event }) => event.value
          })
        }
      }
    },
    paused: {
      on: {
        play: 'playing',
        seek: {
          actions: assign({
            currentTime: ({ event }) => event.time
          })
        }
      }
    },
    ended: {
      on: {
        play: 'playing'
      }
    },
    error: {
      on: {
        load: {
          target: 'loading',
          actions: assign({
            src: ({ event }) => event.src,
            error: undefined
          })
        }
      }
    }
  }
});
