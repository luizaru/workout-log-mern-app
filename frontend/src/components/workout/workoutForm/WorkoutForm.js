import React from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import Card from "../../card/Card";
import "./WorkoutForm.scss";

const WorkoutForm = ({
  workout,
  workoutImage,
  imagePreview,
  notes,
  setNotes,
  handleInputChange,
  handleImageChange,
  saveWorkout,
}) => {
  return (
    <div className="add-workout">
      <Card cardClass={"card"}>
        <form onSubmit={saveWorkout}>
          <Card cardClass={"group"}>
            <label>Workout Image</label>
            <code className="--color-dark">
              Supported Formats: jpg, jpeg, png
            </code>
            <input
              type="file"
              name="image"
              onChange={(e) => handleImageChange(e)}
            />

            {imagePreview != null ? (
              <div className="image-preview">
                <img src={imagePreview} alt="workout" />
              </div>
            ) : (
              <p>No image set for this workout.</p>
            )}
          </Card>
          <label>Workout Title:</label>
          <input type="text" placeholder="Workout Title" name="title" value={workout.title} onChange={handleInputChange} />

          <label>Workout Category:</label>
          <input type="text" placeholder="Workout Category" name="category" value={workout.category} onChange={handleInputChange} />

          <label>Distance:</label>
          <input type="text" placeholder="Distance" name="distance" value={workout.distance} onChange={handleInputChange} />

          <label>Workout load in KG or intesity:</label>
          <input type="text" placeholder="Load" name="load" value={workout.load} onChange={handleInputChange} />

          <label>Notes:</label>
          <ReactQuill
            theme="snow"
            value={notes}
            onChange={setNotes}
            modules={WorkoutForm.modules}
            formats={WorkoutForm.formats}
          />

          <div className="--my">
            <button type="submit" className="--btn --btn-primary">
              Save Workout
            </button>
          </div>
        </form>
      </Card>
    </div>
  );
};

WorkoutForm.modules = {
  toolbar: [
    [{ header: "1" }, { header: "2" }, { font: [] }],
    [{ size: [] }],
    ["bold", "italic", "underline", "strike", "blockquote"],
    [{ align: [] }],
    [{ color: [] }, { background: [] }],
    [
      { list: "ordered" },
      { list: "bullet" },
      { indent: "-1" },
      { indent: "+1" },
    ],
    ["clean"],
  ],
};
WorkoutForm.formats = [
  "header",
  "font",
  "size",
  "bold",
  "italic",
  "underline",
  "strike",
  "blockquote",
  "color",
  "background",
  "list",
  "bullet",
  "indent",
  "link",
  "video",
  "image",
  "code-block",
  "align",
];

export default WorkoutForm;
