"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.toggleMachine = void 0;
var xstate_1 = require("xstate");
exports.toggleMachine = (0, xstate_1.createMachine)({
    id: 'toggle',
    initial: 'Inactive',
    states: {
        Inactive: {
            on: { toggle: 'Active' },
        },
        Active: {
            on: { toggle: 'Inactive' },
            after: { 2000: 'Inactive' },
        },
    },
});
// Create an actor that you can send events to.
// Note: the actor is not started yet!
var actor = (0, xstate_1.createActor)(exports.toggleMachine);
// Subscribe to snapshots (emitted state changes) from the actor
actor.subscribe(function (snapshot) {
    console.log('Value:', snapshot.value);
});
// Start the actor
actor.start(); // logs 'Inactive'
// Send events
actor.send({ type: 'toggle' }); // logs 'Active'
actor.send({ type: 'toggle' }); // logs 'Inactive'
