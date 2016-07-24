'use strict';

let mongoose = require('mongoose');
let Schema = mongoose.Schema;

const cinemaSchedule = new Schema({
    cinema: String,
    place: String,
    city: String,
    place_normalized: String,
    city_normalized: String,
    sessions: [{
        title: String,
        censorship: String,
        special: Boolean,
        hours: [String]
    }],
    recorded: {
        type: Date,
        default: Date.now
    }
});

let schedulesSchema = mongoose.model('schedules', cinemaSchedule);

module.exports = schedulesSchema;
