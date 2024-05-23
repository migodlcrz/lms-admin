import React, { useState } from "react";
import { FaRegTrashCan } from "react-icons/fa6";
import { LuPencilLine } from "react-icons/lu";
import { IoClose } from "react-icons/io5";
import Modal from "react-responsive-modal";
import "react-responsive-modal/styles.css";
import { Course } from "../interfaces/CourseInterface";

interface ProfileActionsProps {
  profile: Course;
  setEditMode: (editMode: boolean) => void;
  setProfile: (profile: Course | null) => void;
  DeleteCourse: (id: string) => void;
}

const ProfileActions: React.FC<ProfileActionsProps> = ({
  profile,
  setEditMode,
  setProfile,
  DeleteCourse,
}) => {
  const [openDeleteModal, setOpenDeleteModal] = useState<boolean>(false);

  return (
    <div className="flex flex-row py-2 space-x-2">
      <button
        onClick={() => setOpenDeleteModal(true)}
        className="flex justify-end w-full first-letter:font-bold text-3xl text-white hover:text-black transition-colors bg-red-600 rounded-full p-2"
      >
        <FaRegTrashCan />
      </button>
      <button
        onClick={() => setEditMode(true)}
        className="flex justify-end w-full first-letter:font-bold text-3xl text-white hover:text-black transition-colors bg-yellow-400 rounded-full p-2"
      >
        <LuPencilLine />
      </button>
      <button
        onClick={() => setProfile(null)}
        className="flex justify-end w-full first-letter:font-bold text-3xl text-red-600 hover:bg-red-600 hover:text-white transition-colors border-2 border-red-600 rounded-full p-2"
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
          <h2 className="text-black font-bold">
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
