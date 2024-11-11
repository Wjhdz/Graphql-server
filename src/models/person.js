import mongoose from "mongoose";
import uninqueValidator from "mongoose-unique-validator";

const person = new mongoose.Schema({
  name: { type: String, requierd: true, unique: true, minlength: 5 },
  phone: { type: Number, minlength: 10 },
  city: {
    type: String,
    minlength: 3,
  },
  street: {
    type: String,
    minlength: 5,
  },
});

person.plugin(uninqueValidator);

export default mongoose.model("Person", person);
