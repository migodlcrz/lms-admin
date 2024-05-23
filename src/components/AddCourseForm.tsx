import React, { ChangeEvent, useState } from "react";
import { Course } from "../interfaces/CourseInterface";

interface AddCourseFormProps {
  courseForm: Course;
  loading: boolean;
  handleFormChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  AddCourse: (e: React.FormEvent<HTMLFormElement>) => void;
}

const AddCourseForm: React.FC<AddCourseFormProps> = ({
  courseForm,
  loading,
  handleFormChange,
  AddCourse,
}) => {
  const [selectedOption, setSelectedOption] = useState("");

  const handleOptionChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;
    setSelectedOption(value);
    handleFormChange(event);
  };

  return (
    <div className="flex flex-col mt-10 space-y-2 w-[48rem]">
      <form className="flex flex-col form space-y-2" onSubmit={AddCourse}>
        <p className="text-black font-bold">Course ID:</p>
        <input
          onChange={handleFormChange}
          className="input input-bordered input-primary rounded-xl border-2 border-fuchsia"
          type="text"
          name="courseID"
          value={courseForm.courseID}
          disabled={loading}
        />
        <p className="text-black font-bold">Course Name:</p>
        <input
          onChange={handleFormChange}
          className="input input-bordered input-primary rounded-xl border-2 border-fuchsia"
          type="text"
          name="courseName"
          value={courseForm.courseName}
          disabled={loading}
        />
        <p className="text-black font-bold">Tier:</p>
        <div className="flex flex-col">
          <div className="w-full flex flex-row justify-around">
            <div className="flex flex-row items-center space-x-3">
              <input
                type="radio"
                name="tier" // Add the name attribute
                value="Free"
                checked={selectedOption === "Free"}
                onChange={handleOptionChange}
                className="radio checked:bg-fuchsia"
              />
              <label className="text-black">Free</label>
            </div>
            <div className="flex flex-row items-center space-x-3">
              <input
                type="radio"
                name="tier" // Add the name attribute
                value="Basic"
                checked={selectedOption === "Basic"}
                onChange={handleOptionChange}
                className="radio checked:bg-fuchsia"
              />
              <label>Basic</label>
            </div>
            <div className="flex flex-row items-center space-x-3">
              <input
                type="radio"
                name="tier" // Add the name attribute
                value="Premium"
                checked={selectedOption === "Premium"}
                onChange={handleOptionChange}
                className="radio checked:bg-fuchsia-"
              />
              <label>Premium</label>
            </div>
          </div>
        </div>
        <p className="text-black font-bold">Description:</p>
        <input
          onChange={handleFormChange}
          className="input input-bordered input-primary rounded-xl border-2 border-fuchsia"
          type="text"
          name="description"
          value={courseForm.description}
          disabled={loading}
        />
        <button
          className="btn bg-fuchsia text-white rounded-xl"
          type="submit"
          disabled={loading}
        >
          {loading ? (
            <div className="grid place-items-center h-full w-full">
              <span className="loading loading-spinner loading-lg"></span>
            </div>
          ) : (
            <>Add course</>
          )}
        </button>
      </form>
    </div>
  );
};

export default AddCourseForm;
