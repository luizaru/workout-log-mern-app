const express = require("express");
const router = express.Router();
const protect = require("../middleWare/authMiddleware");
const {
  createWorkout,
  getWorkouts,
  getWorkout,
  deleteWorkout,
  updateWorkout,
} = require("../controllers/workoutController");
const { upload } = require("../utils/fileUpload");

router.post("/", protect, upload.single("image"), createWorkout);
router.patch("/:id", protect, upload.single("image"), updateWorkout);
router.get("/", protect, getWorkouts);
router.get("/:id", protect, getWorkout);
router.delete("/:id", protect, deleteWorkout);

module.exports = router;