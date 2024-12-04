// const mongoose = require("mongoose");
// const taskSchema = new mongoose.Schema({
//   title: {
//     type: String,
//     required: true,
//     maxlength: 100,
//   },
//   description: {
//     type: String,
//   },

//   status: {
//     type: String,
//     enum: ["TODO", "IN_PROGRESS", "COMPLETED"],
//     default: "TODO",
//   },
//   priority: {
//     type: String,
//     enum: ["LOW", "MEDIUM", "HIGH"],
//     required: true,
//   },
//   dueDate: {
//     type: Date,
//   },
//   createdAT: {
//     type: Date,
//     default: Date.now,
//   },
//   updatedAT: {
//     type: Date,
//     default: Date.now,
//   },
// });
// Module.exports = mongoose.model("Task", taskSchema);



const mongoose = require('mongoose');

const taskSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        maxlength: 100
    },
    description: {
        type: String,
        default: ''
    },
    status: {
        type: String,
        enum: ['TODO', 'IN_PROGRESS', 'COMPLETED'],
        default: 'TODO'
    },
    priority: {
        type: String,
        enum: ['LOW', 'MEDIUM', 'HIGH'],
        default: 'LOW'
    },
    dueDate: {
        type: Date,
        default: null
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    updatedAt: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('Task', taskSchema);
