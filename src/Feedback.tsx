import { useMachine } from '@xstate/react';
import { machine2 } from './feedbackMachine2';
import './App.css'

function Feedback() {
  function showForm() {
    send({type: 'form'})
  }
  
  function FeedbackForm() {
    return (
      <div>
        <h1>Feedback Form</h1>
        <h3>What can we do better?</h3>
        <textarea name="feedback"
          rows={4}
          placeholder="Kuch bhi feedback"
        >
        </textarea>
        <button className="button" onClick={() => send({type: 'fill'})}>Submit</button>
      </div>
    )
  }
  
  function FeedbackPrompt() {
    return (
      <div>
        <h1>Feedback Prompt</h1>
        <h4>How is your experience?</h4>
        <button className="button" onClick={() => send({type: 'good'})}>Good</button>
        <button className="button" onClick={() => send({type: 'bad'})}>Bad</button>
      </div>
    )
  }
  
  function Thanks() {
    return (
      <div>
        <h2>Thanks for the feedback</h2>
      </div>
    )
  }

  const [state, send] = useMachine(machine2);
  console.log("state: ", state.value);
  if (state.matches('prompt')) {
    return (<FeedbackPrompt/>)
  } else if (state.matches('form')) {
    return (<FeedbackForm/>);
  } else if (state.matches('thanks')) {
    return (<Thanks/>);
  }
}

export default Feedback;