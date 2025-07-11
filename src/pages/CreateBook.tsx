import { useForm } from "react-hook-form";
import { useCreateBookMutation } from "../redux/api/bookApi";
import type { Inputs } from "../types/Alltypes";
import toast from "react-hot-toast";
import { useNavigate } from "react-router";
import Loader from "../components/Loader/Loader";

const CreateBook = () => {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<Inputs>({
    defaultValues: {
      available: true,
    },
  });

  const [createBook, { isLoading }] = useCreateBookMutation();

  const handleAddBook = async (bookData: Inputs) => {
    try {
      const result = await createBook(bookData).unwrap();

      if (result) {
        toast.success(`${result.message}`);
      }
      reset();

      navigate("/");
    } catch (err: any) {
      console.log("error", err);
      toast.error(`${err.data.message}`);
    }
  };

  return (
    <div className="flex flex-col justify-center items-center my-10 ">
      <h1 className="text-2xl font-semibold text-teal-800">Create Book</h1>

      <form
        onSubmit={handleSubmit(handleAddBook)}
        className="w-full max-w-3xl px-6"
      >
        <div className="flex flex-col gap-1 mt-4">
          <label htmlFor="title" className="font-semibold">
            Title
          </label>
          <input
            {...register("title", { required: "title is required" })}
            className="border outline-none px-2 py-2 rounded border-gray-500"
          />
          {errors.title && (
            <p className="text-red-500 text-sm mt-1">{errors.title.message}</p>
          )}
        </div>

        <div className="flex flex-col gap-1 mt-4">
          <label htmlFor="author" className="font-semibold">
            Author
          </label>
          <input
            {...register("author", { required: "author is required" })}
            className="border outline-none px-2 py-2 rounded border-gray-500"
          />
          {errors.author && (
            <p className="text-red-500 text-sm mt-1">{errors.author.message}</p>
          )}
        </div>

        <div className="flex flex-col gap-1 mt-4">
          <label htmlFor="genre" className="font-semibold">
            Genre
          </label>
          <input
            type="text"
            {...register("genre", { required: "genre is required" })}
            className="border outline-none px-2 py-2 rounded border-gray-500"
          />
          {errors.genre && (
            <p className="text-red-500 text-sm mt-1">{errors.genre.message}</p>
          )}
        </div>

        <div className="flex flex-col gap-1 mt-4">
          <label htmlFor="isbn" className="font-semibold">
            ISBN
          </label>
          <input
            type="text"
            {...register("isbn", { required: "isbn is required" })}
            className="border outline-none px-2 py-2 rounded border-gray-500"
          />
          {errors.isbn && (
            <p className="text-red-500 text-sm mt-1">{errors.isbn.message}</p>
          )}
        </div>

        <div className="flex flex-col gap-1 mt-4">
          <label htmlFor="copies" className="font-semibold">
            Copies
          </label>
          <input
            type="number"
            min={0}
            {...register("copies", {
              required: "Number of copies required",
              valueAsNumber: true,
            })}
            className="border outline-none px-2 py-2 rounded border-gray-500"
          />
        </div>

        <div className="flex flex-col gap-1 mt-4">
          <label htmlFor="description" className="font-semibold">
            Description
          </label>
          <textarea
            {...register("description", { required: "description required" })}
            className="border outline-none px-2 py-2 rounded border-gray-500"
          />
          {errors.description && (
            <p className="text-red-500 text-sm mt-1">
              {errors.description.message}
            </p>
          )}
        </div>

        <div className="flex items-center gap-1 mt-4">
          <input type="checkbox" {...register("available")} />
          <label htmlFor="avialable">Available</label>
        </div>

        <button
          type="submit"
          className="w-full mt-10 bg-teal-700 py-2 rounded text-white cursor-pointer"
        >
          {isLoading ? <Loader /> : "Create"}
        </button>
      </form>
    </div>
  );
};

export default CreateBook;
