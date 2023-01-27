import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import workoutService from './workoutService';
import {toast} from "react-toastify";

const initialState = {
    workout: null,
    workouts: [],
    isError: false,
    isSuccess: false,
    isLoading: false,
    message: "",
};

// Create New Workout
export const createWorkout = createAsyncThunk(
    "workouts/create",
    async (formData, thunkAPI) => {
      try {
        return await workoutService.createWorkout(formData);
      } catch (error) {
        const message =
          (error.response &&
            error.response.data &&
            error.response.data.message) ||
          error.message ||
          error.toString();
        console.log(message);
        return thunkAPI.rejectWithValue(message);
      }
    }
  );

  // Get All Workouts
export const getWorkouts = createAsyncThunk(
  "workouts/getAll",
  async (_, thunkAPI) => {
    try {
      return await workoutService.getWorkouts();
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      console.log(message);
      return thunkAPI.rejectWithValue(message);
    }
  }
);

const workoutSlice = createSlice({
  name: "workout",
  initialState,
  reducers: {
    CALC_TOTAL_DISTANCE (state, action) {
        console.log("total distance")
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(createWorkout.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(createWorkout.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.isError = false;
        console.log(action.payload);
        state.workouts.push(action.payload);
        toast.success("Workout added successfully");
      })
      .addCase(createWorkout.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
        toast.error(action.payload);
      })
      .addCase(getWorkouts.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getWorkouts.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.isError = false;
        console.log(action.payload);
        state.workouts = action.payload;
    
      })
      .addCase(getWorkouts.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
        toast.error(action.payload);
      });
  },
});

export const {CALC_TOTAL_DISTANCE} = workoutSlice.actions;

export const selectIsLoading = (state) => state.workout.isLoading;

export default workoutSlice.reducer;