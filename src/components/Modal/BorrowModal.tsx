import { useForm } from "react-hook-form";
import type { Borrow, Props } from "../../types/Alltypes";
import { useCreateBorrowMutation } from "../../redux/api/borrowApi";
import toast from "react-hot-toast";
import { useNavigate } from "react-router";
import Loader from "../Loader/Loader";

const BorrowModal = ({ onClose, id }: Props) => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<Borrow>();

  const navigate = useNavigate();
  const [borrowABook, { isLoading }] = useCreateBorrowMutation();

  const onSubmit = async (data: Borrow) => {
    try {
      const borrowData = { book: id, ...data };

      const result = await borrowABook(borrowData).unwrap();

      toast.success(`${result.message}`);

      reset();
      onClose();
      navigate("/borrow-summary");
    } catch (error: any) {
      console.log("er", error);
      toast.error(`${error.data.message}`);
    }
  };
  return (
    <div className="fixed inset-0 z-50 flex justify-center items-center bg-black/20">
      <div className="bg-white w-full max-w-md mx-4 md:mx-0 rounded-xl shadow-g p-6">
        <h2 className="text-lg md:text-xl font-semibold text-slate-800 mb-4">
          Borrow Book
        </h2>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">
              Quantity
            </label>
            <input
              type="number"
              {...register("quantity", {
                required: "Quantity is required",
                valueAsNumber: true,
              })}
              className="w-full px-3 py-2 border rounded-lg text-sm focus:outline-none focus:ring focus:ring-indigo-300"
            />
            {errors.quantity && (
              <p className="text-sm text-red-600 mt-1">
                {errors.quantity.message}
              </p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">
              Due Date
            </label>
            <input
              type="date"
              {...register("dueDate", {
                required: "Due date is required",
                valueAsDate: true,
              })}
              className="w-full px-3 py-2 border rounded-lg text-sm focus:outline-none focus:ring focus:ring-indigo-300"
            />
            {errors.dueDate && (
              <p className="text-sm text-red-600 mt-1">
                {errors.dueDate.message}
              </p>
            )}
          </div>

          <div className="flex justify-end gap-3 pt-4">
            <button
              type="button"
              className="px-4 py-2 text-sm rounded-lg bg-gray-100 hover:bg-gray-200 text-gray-700 cursor-pointer"
              onClick={onClose}
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 text-sm rounded-lg bg-indigo-600 hover:bg-indigo-700 text-white cursor-pointer"
            >
              {isLoading ? <Loader /> : "Confirm Borrow"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default BorrowModal;
