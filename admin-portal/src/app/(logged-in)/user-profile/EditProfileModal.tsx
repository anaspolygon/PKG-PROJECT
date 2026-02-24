interface Props {
  isOpen: boolean;
  closeModal?: () => void;
}
const EditProfileModal = ({ isOpen, closeModal }: Props) => {
  if (!isOpen) return null;
  return (
    <div className="overflow-y-auto max-h-screen">
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-[rgba(0,0,0,0.5)]">
        <div className="bg-white rounded-xl shadow-lg w-full max-w-lg p-6 relative">
          <h2 className="text-xl font-medium mb-6">Edit User Profile</h2>

          <button
            onClick={closeModal}
            className="absolute top-4 right-4 text-gray-400 cursor-pointer hover:text-gray-600 text-2xl"
          >
            &times;
          </button>
        </div>
      </div>
    </div>
  );
};

export default EditProfileModal;
