import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../redux/features/auth/authSlice";
import workoutReducer from "../redux/features/workout/workoutSlice";

export const store = configureStore ({
    reducer: {
        auth: authReducer,
        workout: workoutReducer,
    },
});