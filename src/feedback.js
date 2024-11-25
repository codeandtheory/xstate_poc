"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var xstate_1 = require("xstate");
var feedbackMachine = (0, xstate_1.createMachine)({
    id: 'feedback',
    initial: 'question',
    states: {
        question: {
            on: {
                'feedback.good': {
                    target: 'thanks',
                },
                'feedback.bad': {
                    target: 'thanks',
                },
            },
        },
        thanks: {},
        // ...
    },
});
var feedbackActor = (0, xstate_1.createActor)(feedbackMachine);
feedbackActor.subscribe(function (state) {
    console.log(state.value);
});
feedbackActor.start();
// logs 'question'
feedbackActor.send({ type: 'feedback.bad' });
// logs 'thanks'
feedbackActor.send({ type: 'thanks.recommend.yes' });
