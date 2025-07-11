import { BookOpen, Pencil, Trash2 } from "lucide-react";
import type { IProps } from "../../types/Alltypes";
import { Link } from "react-router";
import DeleteModal from "../Modal/DeleteModal";
import BorrowModal from "../Modal/BorrowModal";
import EditModal from "../Modal/EditModal";
import { useDispatch, useSelector } from "react-redux";
import {
  closeBorrowModal,
  closeDeletedModal,
  closeEditedModal,
  setSelectedBorrowId,
  setSelectedDeletedId,
  setSelectedEditedId,
} from "../../redux/slices/uiSlice";

const BookGrid = ({ books }: IProps) => {
  const dispatch = useDispatch();
  const { selectedEditedId, selectedBorrowId, selectedDeleteId } = useSelector(
    (state: any) => state.ui
  );

  const normalizedBooks = Array.isArray(books) ? books : [books]; 

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 p-4 container">
      {normalizedBooks?.map((book: any) => (
        <div
          key={book._id}
          className="bg-white p-4 rounded-xl shadow-sm border border-gray-200"
        >
          <Link
            to={`/books/${book._id}`}
            className="text-lg font-semibold text-teal-700 mb-1"
          >
            {book.title}
          </Link>
          <p className="text-sm text-slate-600 mb-1">
            <span className="font-medium">Author:</span> {book.author}
          </p>
          <p className="text-sm text-slate-600 mb-1">
            <span className="font-medium">Genre:</span> {book.genre}
          </p>
          <p className="text-sm text-slate-600 mb-1">
            <span className="font-medium">ISBN:</span> {book.isbn}
          </p>
          <p className="text-sm text-slate-600 mb-1">
            <span className="font-medium">Copies:</span> {book.copies}
          </p>
          <p className="text-sm text-slate-600 mb-2">
            <span className="font-medium">Status:</span>{" "}
            <span
              className={`font-semibold ${
                book.available ? "text-green-600" : "text-red-600"
              }`}
            >
              {book.available ? "Available" : "Unavailable"}
            </span>
          </p>

          <div className="flex justify-between pt-2 text-sm text-slate-500">
            <button
              onClick={() => dispatch(setSelectedEditedId(book._id))}
              className="flex items-center gap-1 text-blue-600 hover:text-blue-800 cursor-pointer"
            >
              <Pencil className="w-4 h-4" />
              Edit
            </button>
            <button
              onClick={() => dispatch(setSelectedBorrowId(book._id))}
              className="flex items-center gap-1 text-emerald-600 hover:text-emerald-800 cursor-pointer"
            >
              <BookOpen className="w-4 h-4" />
              Borrow
            </button>
            <button
              onClick={() => dispatch(setSelectedDeletedId(book._id))}
              className="flex items-center gap-1 text-red-500 hover:text-red-700 cursor-pointer"
            >
              <Trash2 className="w-4 h-4" />
              Delete
            </button>
          </div>
        </div>
      ))}
      {selectedBorrowId && (
        <BorrowModal
          onClose={() => dispatch(closeBorrowModal())}
          id={selectedBorrowId}
        />
      )}

      {selectedDeleteId && (
        <DeleteModal
          id={selectedDeleteId}
          onClose={() => dispatch(closeDeletedModal())}
        />
      )}

      {selectedEditedId && (
        <EditModal
          id={selectedEditedId}
          onClose={() => dispatch(closeEditedModal())}
        />
      )}

      {normalizedBooks?.length === 0 && (
        <p className="text-center text-gray-500 col-span-full">
          No books available.
        </p>
      )}
    </div>
  );
};

export default BookGrid;
