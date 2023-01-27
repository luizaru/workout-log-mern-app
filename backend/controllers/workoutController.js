const asyncHandler = require("express-async-handler");
const Workout = require("../models/workoutModel");
const { fileSizeFormatter } = require("../utils/fileUpload");
const cloudinary = require("cloudinary").v2;

// Create workout
const createWorkout = asyncHandler(async (req, res) => {
  const { title, distance, load, notes } = req.body;

  //   Validation
  if (!title || !distance || !load || !notes) {
    res.status(400);
    throw new Error("Please fill in all fields");
  }

  // Handle Image upload
  let fileData = {};
  if (req.file) {
    // Save image to cloudinary
    let uploadedFile;
    try {
      uploadedFile = await cloudinary.uploader.upload(req.file.path, {
        folder: "FitLife App",
        resource_type: "image",
      });
    } catch (error) {
      res.status(500);
      throw new Error("Image could not be uploaded");
    }

    fileData = {
      fileName: req.file.originalname,
      filePath: uploadedFile.secure_url,
      fileType: req.file.mimetype,
      fileSize: fileSizeFormatter(req.file.size, 2),
    };
  }

  // Create Workout
  const workout = await Workout.create({
    user: req.user.id,
    title,
    category,
    distance,
    load,
    notes,
    image: fileData,
  });

  res.status(201).json(workout);
});

// Get all workouts
const getWorkouts = asyncHandler(async (req, res) => {
  const workouts = await Workout.find({ user: req.user.id }).sort("-createdAt");
  res.status(200).json(workouts);
});

// Get single workout
const getWorkout = asyncHandler(async (req, res) => {
  const workout = await Workout.findById(req.params.id);
  // if workout doesnt exist
  if (!workout) {
    res.status(404);
    throw new Error("Workout not found");
  }
  // Match workout to its user
  if (workout.user.toString() !== req.user.id) {
    res.status(401);
    throw new Error("User not authorized");
  }
  res.status(200).json(workout);
});

// Delete workout
const deleteWorkout = asyncHandler(async (req, res) => {
  const workout = await Workout.findById(req.params.id);
  // if workout doesnt exist
  if (!workout) {
    res.status(404);
    throw new Error("Workout not found");
  }
  // Match workout to its user
  if (workout.user.toString() !== req.user.id) {
    res.status(401);
    throw new Error("User not authorized");
  }
  await workout.remove();
  res.status(200).json({ message: "Workout deleted." });
});

// Update Product
const updateWorkout = asyncHandler(async (req, res) => {
  const { title, category, distance, load, notes } = req.body;
  const { id } = req.params;

  const workout = await Workout.findById(id);

  // if workout doesnt exist
  if (!workout) {
    res.status(404);
    throw new Error("Workout not found");
  }
  // Match workout to its user
  if (workout.user.toString() !== req.user.id) {
    res.status(401);
    throw new Error("User not authorized");
  }

  // Handle Image upload
  let fileData = {};
  if (req.file) {
    // Save image to cloudinary
    let uploadedFile;
    try {
      uploadedFile = await cloudinary.uploader.upload(req.file.path, {
        folder: "FitLife App",
        resource_type: "image",
      });
    } catch (error) {
      res.status(500);
      throw new Error("Image could not be uploaded");
    }

    fileData = {
      fileName: req.file.originalname,
      filePath: uploadedFile.secure_url,
      fileType: req.file.mimetype,
      fileSize: fileSizeFormatter(req.file.size, 2),
    };
  }

  // Update workout
  const updatedWorkout = await Workout.findByIdAndUpdate(
    { _id: id },
    {
      title,
      category,
      distance,
      load,
      notes,
      image: Object.keys(fileData).length === 0 ? workout?.image : fileData,
    },
    {
      new: true,
      runValidators: true,
    }
  );

  res.status(200).json(updatedWorkout);
});

module.exports = {
  createWorkout,
  getWorkouts,
  getWorkout,
  deleteWorkout,
  updateWorkout,
};