import React, { useState } from "react";
import { FaRegTrashCan } from "react-icons/fa6";
import { LuPencilLine } from "react-icons/lu";
import { IoClose } from "react-icons/io5";
import Modal from "react-responsive-modal";
import "react-responsive-modal/styles.css";
import { Course } from "../interfaces/CourseInterface";

interface EditCourseForm {
  courseName?: string | null;
  courseID?: string | null;
  description?: string | null;
  tier?: string | null;
  isPublished?: boolean | null;
}

interface ProfileActionsProps {
  profile: Course;
  editCourseForm: EditCourseForm;
  setEditCourseForm: (editCourseForm: EditCourseForm) => void;
  setEditMode: (editMode: boolean) => void;
  setProfile: (profile: Course | null) => void;
  updatePublishStatus: (id: string, status: boolean) => void;
  DeleteCourse: (id: string) => void;
}

const ProfileActions: React.FC<ProfileActionsProps> = ({
  profile,
  editCourseForm,
  setEditCourseForm,
  setEditMode,
  setProfile,
  updatePublishStatus,
  DeleteCourse,
}) => {
  const [openDeleteModal, setOpenDeleteModal] = useState<boolean>(false);

  return (
    <div className="flex flex-row py-2 space-x-2">
      <button
        onClick={() => {
          updatePublishStatus(String(profile._id), !profile.isPublished);
        }}
        className={`tooltip flex justify-end w-full first-letter:font-bold text-3xl hover:text-black transition-colors rounded-full p-2 shadow-lg px-4 ${
          profile.isPublished
            ? "bg-gray-400 text-black"
            : "bg-green-600 text-white"
        }`}
        data-tip="Publish Course"
      >
        <p className="text-xl font-semibold">
          {profile.isPublished ? "Unpublish" : "Publish"}
        </p>
      </button>
      <button
        onClick={() => setOpenDeleteModal(true)}
        className="tooltip flex justify-end w-full first-letter:font-bold text-3xl text-white hover:text-black transition-colors bg-red-600 rounded-full p-2 shadow-lg"
        data-tip="Delete"
      >
        <FaRegTrashCan />
      </button>
      <button
        onClick={() => setEditMode(true)}
        className="tooltip flex justify-end w-full first-letter:font-bold text-3xl text-white hover:text-black transition-colors bg-yellow-400 rounded-full p-2 shadow-lg"
        data-tip="Edit"
      >
        <LuPencilLine />
      </button>
      <button
        onClick={() => setProfile(null)}
        className="tooltip flex justify-end w-full first-letter:font-bold text-3xl bg-fuchsia text-white hover:text-black transition-colors rounded-full p-2 shadow-lg"
        data-tip="Close"
      >
        <IoClose />
      </button>
      <Modal
        open={openDeleteModal}
        onClose={() => setOpenDeleteModal(false)}
        center
        closeOnEsc
        classNames={{
          modal: "customModalClass",
        }}
      >
        <div className="flex flex-col mt-10 space-y-2 w-[48rem] items-center justify-center">
          <h2 className="text-black text-3xl font-bold w-full text-center">
            Are you sure you want to delete {profile.courseName}?
          </h2>
          <div className="flex flex-row justify-evenly w-full">
            <button
              onClick={() => setOpenDeleteModal(false)}
              className="btn text-black text-2xl font-semibold "
            >
              Cancel
            </button>
            <button
              onClick={() => {
                setOpenDeleteModal(false);
                DeleteCourse(String(profile._id));
              }}
              className="btn text-white text-2xl font-semibold bg-fuchsia border-fuchsia hover:bg-red-600 hover:border-red-600 shadow-md"
            >
              Delete
            </button>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default ProfileActions;
