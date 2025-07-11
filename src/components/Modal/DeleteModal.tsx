import toast from "react-hot-toast";
import { useDeleteABookMutation } from "../../redux/api/bookApi";
import type { Props } from "../../types/Alltypes";
import Loader from "../Loader/Loader";

const DeleteModal = ({ onClose, id }: Props) => {
  const [deleteBook, { isLoading }] = useDeleteABookMutation();

  const handleDelete = async () => {
    try {
      const result = await deleteBook(id);

      if (result) {
        toast.success(`${result.data.message}`);
      }
      onClose();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/10">
      <div className="bg-white w-full max-w-md mx-4 md:mx-0 rounded-xl p-6 ">
        <h2 className="text-lg md:text-xl font-semibold text-slate-800 mb-3">
          Confirm Deletion
        </h2>
        <p className="text-sm text-slate-600 mb-6">
          Are you sure you want to delete this book? This action cannot be
          undone.
        </p>

        <div className="flex justify-end gap-3">
          <button
            className="px-4 py-2 text-sm font-medium rounded-lg bg-gray-100 hover:bg-gray-200 text-gray-700 cursor-pointer"
            onClick={onClose}
          >
            Cancel
          </button>
          <button
            className="px-4 py-2 w-24 text-sm font-medium rounded-lg bg-red-600 hover:bg-red-700 text-white cursor-pointer"
            onClick={handleDelete}
          >
            {isLoading ? <Loader /> : "Delete"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default DeleteModal;
