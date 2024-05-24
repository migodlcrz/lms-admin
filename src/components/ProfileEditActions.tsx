import React, { useState } from "react";
import { FaRegTrashCan } from "react-icons/fa6";
import { LuPencilLine } from "react-icons/lu";
import { IoClose } from "react-icons/io5";
import Modal from "react-responsive-modal";
import "react-responsive-modal/styles.css";
import { Course } from "../interfaces/CourseInterface";
import { FaSave } from "react-icons/fa";

interface EditCourseForm {
  courseName?: string | null;
  courseID?: string | null;
  description?: string | null;
  tier?: string | null;
  isPublished?: boolean | null;
}

interface ProfileEditActionsProps {
  profile: Course;
  editCourseForm: EditCourseForm;
  setEditCourseForm: (editCourseForm: EditCourseForm) => void;
  setEditMode: (editMode: boolean) => void;
  setProfile: (profile: Course | null) => void;
  EditCourse: (id: string) => void;
  DeleteCourse: (id: string) => void;
}

const ProfileEditActions: React.FC<ProfileEditActionsProps> = ({
  profile,
  editCourseForm,
  setEditCourseForm,
  setEditMode,
  setProfile,
  EditCourse,
  DeleteCourse,
}) => {
  return (
    <div className="flex flex-row py-2 space-x-2">
      <button
        onClick={() => {
          console.log(editCourseForm);
          setEditCourseForm({
            courseName: null,
            courseID: null,
            description: null,
            tier: null,
            isPublished: null,
          });
          EditCourse(String(profile._id));
        }}
        disabled={
          (editCourseForm.courseName === null ||
            editCourseForm.courseName === "") &&
          (editCourseForm.courseID === null ||
            editCourseForm.courseID === "") &&
          (editCourseForm.description === null ||
            editCourseForm.description === "")
        }
        className="flex justify-end w-full disabled:bg-gray-500 first-letter:font-bold text-3xl text-white disabled:text-gray-200 hover:text-black transition-colors bg-green-600 rounded-full p-2 shadow-lg"
      >
        <FaSave />
      </button>
      <button
        onClick={() => setEditMode(false)}
        className="flex justify-end w-full first-letter:font-bold text-3xl text-white hover:text-black transition-colors bg-yellow-400 rounded-full p-2 shadow-lg"
      >
        <IoClose />
      </button>
    </div>
  );
};

export default ProfileEditActions;
