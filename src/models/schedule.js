const mongoose = require('mongoose')

const classLevelSchema = new mongoose.Schema({
    monday: String,
    monday_subject: String,
    tuesday: String,
    tuesday_subject: String,
    wednesday: String,
    wednesday_subject: String,
    thursday: String,
    thursday_subject: String,
    friday: String,
    friday_subject: String,
})

const scheduleSchema = new mongoose.Schema({
    classLevel: {
        type: Number,
        required: true,
        unique: true
    },
    time: String,
    classes: [classLevelSchema]
})

const Schedule = mongoose.model('Schedule', scheduleSchema)

module.exports = Schedule