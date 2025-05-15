const DeleteConfirmationModal = ({ isOpen, onClose, onDelete }) => {
  if (!isOpen) return null;
  return (
    <div className="fixed top-10 left-0 right-0 inset-0 flex justify-center z-50 mx-3 sm:mx-0">
      <div className="bg-white p-4 rounded border-1 border-gray-300 text-text h-fit opacity-90">
        <h2 className="text-lg font-bold mb-2">Confirm Deletion</h2>
        <p>Are you sure you want to delete this Memory Capsule?</p>
        <div className="flex justify-end mt-4">
          <button
            className="mr-2 px-4 py-2 border border-gray-300 rounded"
            onClick={onClose}
          >
            Cancel
          </button>
          <button
            className="px-4 py-2 bg-red-500 text-white rounded"
            onClick={onDelete}
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
};

export default DeleteConfirmationModal;
