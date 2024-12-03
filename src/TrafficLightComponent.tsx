import { useEffect } from 'react';
import { useMachine } from '@xstate/react'
import './App.css'
import { trafficLightMachine } from './trafficLightMachine2'

const TURN_GREEN_TO_YELLOW = 5;
const TURN_YELLOW_TO_RED = 3;
const TURN_RED_TO_GREEN = 4;

type col = "red" | "green" | "yellow"

export const TraffiLightComponent = () => {
  let currentColor: col = "red";
  let timerId: number | undefined;

  function turnLight(color: col) {
    console.log("turnLight: ", color);
    const event = `turn${color.slice(0, 1).toUpperCase() + color.slice(1, color.length)}`;
    console.log("event:", event);
    send({type: event});
  }

  function triggerChangeLight(color: col) {
    console.log('triggerChangeLight ', state.value);
    if (color === "red") {
      return setTimeout(() =>  { 
        turnLight("green");
      }, TURN_RED_TO_GREEN*1000);
    }

    if (color == "green") {
      return setTimeout(() =>  { 
        turnLight("yellow");
      }, TURN_GREEN_TO_YELLOW*1000);
    } 
    
    if (color == "yellow") {
      return setTimeout(() =>  { 
        turnLight("red");
      }, TURN_YELLOW_TO_RED*1000);
    }
  }

  const [state, send, actorRef] = useMachine(trafficLightMachine);
  useEffect(() => {
    timerId = triggerChangeLight(currentColor);

    return () => {
      clearTimeout(timerId);
    };
  }, []);

  useEffect(() => {
    const subscription = actorRef.subscribe((snapshot) => {
      currentColor = snapshot.value as col;
      triggerChangeLight(currentColor);
    });
  
    return () => {
      clearTimeout(timerId);
      subscription.unsubscribe 
    };
  }, [actorRef]);

  return (
    <>
    <h3>State:{`${state.value}`}</h3> 
      <div className="lights">
        <div className={`light-red light    ${state.value == 'red' ? 'on' : 'off'}`}></div>
        <div className={`light-green light  ${state.value == 'green' ? 'on' : 'off'}`}></div>
        <div className={`light-yellow light ${state.value == 'yellow' ? 'on' : 'off'}`}></div>
      </div>
    </>
  )
}