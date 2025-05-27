const mongoose = require('mongoose');

const eventSchema = new mongoose.Schema({
  title: String,
  date: Date,
  type: String,
  thumbnail: String, 
  tags: [String],
  description: String,
  time: String,
  speakers: [
    {
      name: String,
      role: String,
      image: String
    }
  ],
  price: Number,
  location: String,
  additionalInfo: String,
  hostedBy: String,
});

const Event = mongoose.model("Event", eventSchema);

module.exports = Event