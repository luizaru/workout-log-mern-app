import axios from "axios";

export const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;

const API_URL = `${BACKEND_URL}/api/workouts`;

// Create New Workout
const createWorkout = async (formData) => {
    const response = await axios.post(API_URL, formData);
    return response.data;
};

// Get All Workouts
const getWorkouts = async () => {
    const response = await axios.get(API_URL);
    return response.data;
};

const workoutService = {
    createWorkout,
    getWorkouts,
};

export default workoutService;
