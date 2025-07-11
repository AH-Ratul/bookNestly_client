import { useForm } from "react-hook-form";
import type { BookFormData, Props } from "../../types/Alltypes";
import {
  useGetBookByIdQuery,
  useUpdateBookMutation,
} from "../../redux/api/bookApi";
import { useEffect } from "react";
import Loader from "../Loader/Loader";
import { useNavigate } from "react-router";
import toast from "react-hot-toast";
import Modal from "./Modal";

const EditModal = ({ onClose, id }: Props) => {
  const navigate = useNavigate();
  const { data, isLoading } = useGetBookByIdQuery(id);
  const [updateBook, { isLoading: updating }] = useUpdateBookMutation();

  const {
    register,
    handleSubmit,
    reset,
    formState: { dirtyFields },
    getValues,
  } = useForm<BookFormData>({
    defaultValues: {
      title: "",
      author: "",
      genre: "",
      isbn: "",
      copies: 1,
      description: "",
    },
  });

  // Reset form when data is ready
  useEffect(() => {
    if (data?.result) {
      reset(data.result); // form gets real book data
    }
  }, [data, reset]);

  const onSubmit = async () => {
    const updatedData = Object.keys(dirtyFields).reduce((acc, key) => {
      const typedKey = key as keyof BookFormData;
      acc[typedKey] = getValues()[typedKey];
      return acc;
    }, {} as Record<keyof BookFormData, any>);

    try {
      const updated = await updateBook({ id, updatedData }).unwrap();

      toast.success(`${updated.message}`);

      onClose();
      navigate("/");
    } catch (error) {
      console.log("Uer", error);
    }
  };

  if (isLoading) return <Modal modal={<Loader />} />;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/30">
      <div className="bg-white rounded-xl w-full max-w-lg mx-4 p-6 shadow-lg relative">
        <button
          onClick={onClose}
          className="absolute top-3 right-3 text-gray-500 hover:text-black text-lg"
        >
          &times;
        </button>
        <h2 className="text-xl font-semibold text-teal-800 mb-4">Edit Book</h2>

        <form
          onSubmit={handleSubmit(onSubmit)}
          className="space-y-4 flex flex-col text-sm"
        >
          <div className="flex flex-col gap-1">
            <label htmlFor="title" className="font-semibold">
              Title
            </label>
            <input
              type="text"
              placeholder="Title"
              {...register("title", { required: true })}
              className="border border-gray-500 outline-none rounded p-1"
            />
          </div>
          <div className="flex flex-col gap-1">
            <label htmlFor="author" className="font-semibold">
              Author
            </label>
            <input
              type="text"
              placeholder="Author"
              {...register("author", { required: true })}
              className="border border-gray-500 outline-none rounded p-1"
            />
          </div>
          <div className="flex flex-col gap-1">
            <label htmlFor="genre" className="font-semibold">
              Genre
            </label>
            <input
              type="text"
              placeholder="Genre"
              {...register("genre", { required: true })}
              className="border border-gray-500 outline-none rounded p-1"
            />
          </div>

          <div className="flex flex-col gap-1">
            <label htmlFor="isbn" className="font-semibold">
              ISBN
            </label>
            <input
              type="text"
              placeholder="ISBN"
              {...register("isbn", { required: true })}
              className="border border-gray-500 outline-none rounded p-1"
            />
          </div>

          <div className="flex flex-col gap-1">
            <label htmlFor="copies" className="font-semibold">
              Copies
            </label>
            <input
              type="number"
              placeholder="Copies"
              {...register("copies", {
                required: true,
                valueAsNumber: true,
                min: 0,
              })}
              className="border border-gray-500 outline-none rounded p-1"
            />
          </div>

          <div className="flex flex-col gap-1">
            <label htmlFor="description" className="font-semibold">
              Description
            </label>
            <textarea
              placeholder="Description"
              {...register("description")}
              className="border border-gray-500 outline-none rounded p-1"
            />
          </div>

          <div className="flex justify-end gap-3 pt-2">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-sm rounded border text-gray-600 hover:text-black cursor-pointer"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 w-32 bg-blue-600 text-white text-sm rounded hover:bg-blue-700 cursor-pointer"
            >
              {updating ? <Loader /> : "Save Changes"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditModal;
