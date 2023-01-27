const mongoose = require("mongoose");

const workoutSchema = mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },
    title: {
      type: String,
      required: [true, "Please add a title"],
      trim: true,
    },
    category: {
      type: String,
      required: [true, "Please add a category"],
      trim: true,
    },
    distance: {
      type: String,
      required: [true, "Please add distance"],
      trim: true,
    },
    load: {
      type: String,
      required: [true, "Please add a load"],
      trim: true,
    },
    notes: {
      type: String,
      required: [true, "Please add a note"],
      trim: true,
    },
    image: {
      type: Object,
      default: {},
    },
  },
  {
    timestamps: true,
  }
);

const Workout = mongoose.model("Workout", workoutSchema);
module.exports = Workout;