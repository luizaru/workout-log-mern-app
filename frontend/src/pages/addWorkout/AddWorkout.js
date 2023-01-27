import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Loader from "../../components/loader/Loader";
import WorkoutForm from "../../components/workout/workoutForm/WorkoutForm";
import {
  createWorkout,
  selectIsLoading,
} from "../../redux/features/workout/workoutSlice";

const initialState = {
  title: "",
  category: "",
  distance: "",
  load: "",
};

const AddWorkout = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [workout, setWorkout] = useState(initialState);
  const [workoutImage, setWorkoutImage] = useState("");
  const [imagePreview, setImagePreview] = useState(null);
  const [notes, setNotes] = useState("");

  const isLoading = useSelector(selectIsLoading);

  const { title, category, distance, load } = workout;

  const handleInputChange = (e) => {
    const { title, value } = e.target;
    setWorkout({ ...workout, [title]: value });
  };

  const handleImageChange = (e) => {
    setWorkoutImage(e.target.files[0]);
    setImagePreview(URL.createObjectURL(e.target.files[0]));
  };


  const saveWorkout = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("title", title);
    formData.append("category", category);
    formData.append("distance", distance);
    formData.append("load", load);
    formData.append("notes", notes);
    formData.append("image", workoutImage);

    console.log(...formData);

    await dispatch(createWorkout(formData));

    navigate("/dashboard");
  };

  return (
    <div>
      {isLoading && <Loader />}
      <h3 className="--mt">Add New Workout</h3>
      <WorkoutForm
        workout={workout}
        workoutImage={workoutImage}
        imagePreview={imagePreview}
        notes={notes}
        setNotes={setNotes}
        handleInputChange={handleInputChange}
        handleImageChange={handleImageChange}
        saveWorkout={saveWorkout}
      />
    </div>
  );
};

export default AddWorkout;
