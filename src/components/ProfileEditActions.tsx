import React, { useState } from "react";
import { FaRegTrashCan } from "react-icons/fa6";
import { LuPencilLine } from "react-icons/lu";
import { IoClose } from "react-icons/io5";
import Modal from "react-responsive-modal";
import "react-responsive-modal/styles.css";
import { Course } from "../interfaces/CourseInterface";
import { FaSave } from "react-icons/fa";

interface ProfileEditActionsProps {
  profile: Course;
  setEditMode: (editMode: boolean) => void;
  setProfile: (profile: Course | null) => void;
  DeleteCourse: (id: string) => void;
}

const ProfileEditActions: React.FC<ProfileEditActionsProps> = ({
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
        className="flex justify-end w-full first-letter:font-bold text-3xl text-white hover:text-black transition-colors bg-green-600 rounded-full p-2"
      >
        <FaSave />
      </button>
      <button
        onClick={() => setEditMode(false)}
        className="flex justify-end w-full first-letter:font-bold text-3xl text-white hover:text-black transition-colors bg-yellow-400 rounded-full p-2"
      >
        <IoClose />
      </button>
    </div>
  );
};

export default ProfileEditActions;
