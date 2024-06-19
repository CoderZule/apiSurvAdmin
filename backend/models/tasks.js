const mongoose = require("mongoose");


const tasksSchema = mongoose.Schema({
  Status: { type: Boolean },
  Activity: {
    priority: { type: String},
    title : { type: String}
  },
  Duration: { type: Date, required: true, default: Date.now },
  Note: { type: String },
  Reminder: { type: String},

}, {
    timestamps: true,
})

const Tasks= mongoose.model('Tasks', tasksSchema)

module.exports = Tasks