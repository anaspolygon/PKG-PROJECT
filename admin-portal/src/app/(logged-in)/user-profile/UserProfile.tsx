"use client";
import { useState } from "react";
import { User } from "./Types";
import UserPasswordModal from "../ec-users/components/UserPasswordModal";
import clsx from "clsx";
import { UserStatus, UserStatusBgColors } from "@/constants/enums-with-colors";

interface Props {
  user: User;
}

const UserProfile = ({ user }: Props) => {
  const { name, email, employee_id, branch, role } = user;
  const [isOpen, setIsOpen] = useState(false);
  const openModal = () => {
    setIsOpen(true);
  };
  const closeModal = () => {
    setIsOpen(false);
  };
  return (
    <div className="text-gray-700 text-sm border rounded-lg shadow-[0_0_10px_0_rgba(0,0,0,0.1)] border-gray-200 p-5">
      <div className="flex items-center gap-2 mb-3">
        <h2 className="font-medium w-40">Employee ID :</h2>
        <p>{employee_id}</p>
      </div>
      <div className="flex items-center gap-2 mb-3">
        <h2 className="font-medium w-40">Name :</h2>
        <p>{name}</p>
      </div>
      <div className="flex items-center gap-2 mb-3">
        <h2 className="font-medium w-40">Branch :</h2>
        <p>{branch?.label_en ?? "N/A"}</p>
      </div>
      <div className="flex items-center gap-2 mb-3">
        <h2 className="font-medium w-40">Role :</h2>
        <p>{role?.name}</p>
      </div>
      <div className="flex items-center gap-2 mb-3">
        <h2 className="font-medium w-40">Email :</h2>
        <p>{email}</p>
      </div>
      <div className="flex items-center gap-2 mb-3">
        <h2 className="font-medium w-40">Status :</h2>
        <span
          className={clsx(
            "px-3 py-1.5 rounded-md text-xs text-white  font-medium",
            UserStatusBgColors[user.status?.toLowerCase() as UserStatus]
          )}
        >
          {user.status}
        </span>
      </div>

      <button
        className="flex items-center gap-2 bg-[#003970] text-white px-4 py-2 cursor-pointer rounded-lg hover:bg-blue-900 mt-5 font-medium"
        onClick={openModal}
      >
        Change password
      </button>
      <UserPasswordModal
        isEcUser={false}
        isOpen={isOpen}
        onClose={closeModal}
      />
    </div>
  );
};

export default UserProfile;
