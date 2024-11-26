import { useRef, useEffect } from 'react';
import { useMachine } from '@xstate/react';
import { createBrowserInspector } from '@statelyai/inspect';
import { machine } from './machine';
import './App.css';

const { inspect } = createBrowserInspector({
  // Comment out the line below to start the inspector
  autoStart: false
});

const VideoPlayer = ({ src }: { src: string }) => {
  const videoElement = useRef(null);
  const [state, send] = useMachine(machine.provide({
    actions: {
      playVideo: () => {
        if (videoElement.current) {
          (videoElement.current as HTMLVideoElement).play();
        }
      },
      pauseVideo: () => {
        if (videoElement.current) {
          (videoElement.current as HTMLVideoElement).pause();
        }
      },
      resetVideo: () => {
        if (videoElement.current) {
          (videoElement.current as HTMLVideoElement).pause();
          (videoElement.current as HTMLVideoElement).currentTime = 0;
          (videoElement.current as HTMLVideoElement).play();
        }
      },
      stopVideo: () => {
        if (videoElement.current) {
          (videoElement.current as HTMLVideoElement).pause();
          (videoElement.current as HTMLVideoElement).currentTime = (videoElement.current as HTMLVideoElement).duration;
        }
      }
    }
  }));

  const isPlaying = () => state.matches({ ready: "playing" });
  const isPaused = () => state.matches({ ready: "paused" });
  const isReady = () => state.matches("ready");
  const isStoped = () => state.matches({ ready: "ended" });
  console.log(state.value);
  return (
    <>
      <video
        src={src}
        width={360}
        onCanPlay={() => send({ type: "SUCCESS" })}
        onError={() => send({ type: "FAILED" })}
        ref={videoElement}
      >
        <track kind="captions" />
      </video>
      <br />

      <button
        onClick={() => {
          send({ type: "PLAY" });
        }}
        disabled={isPlaying()}
      >
        Play
      </button>

      <button onClick={() => send({ type: "PAUSE" })} disabled={isPaused() || isStoped()}>
        Pause
      </button>

      <button onClick={() => send({ type: "RESET" })} disabled={!isReady()}>
        Reset
      </button>

      <button onClick={() => send({ type: "END" })} disabled={!isReady()}>
        Stop
      </button>
    </>
  );
};

function App() {
  return (
  <VideoPlayer
    src="https://media.istockphoto.com/id/1455262570/video/scenic-view-of-camper-van-on-road-in-norway.mp4?s=mp4-640x640-is&k=20&c=uoeliCPfcMZUDTJopLTVTObOTFffaAFTDFtrAvbZQcE="
  />);
}

export default App;
