import { useParams } from "react-router";
import { useGetBookByIdQuery } from "../redux/api/bookApi";
import Loader from "../components/Loader/Loader";

const BookDetails = () => {
  const { id } = useParams<{ id: string }>();

  const { data: bookData, isLoading, isError } = useGetBookByIdQuery(id!);
  const book = bookData?.result;

  if (isLoading) {
    return <Loader color={'black'} />;
  }

  if (isError) {
    return <p className="mt-20">fail to load</p>;
  }
  return (
    <div className="max-w-3xl mx-2 md:mx-auto my-auto mt-10 bg-white p-6 rounded-xl shadow border">
      <div>
        <h1 className="text-2xl font-bold text-slate-800 mb-4">{book?.title}</h1>

        <div className="space-y-2 text-sm text-slate-700">
          <p>
            <span className="font-semibold">Author:</span> {book?.author}
          </p>
          <p>
            <span className="font-semibold">Genre:</span> {book?.genre || "N/A"}
          </p>
          <p>
            <span className="font-semibold">ISBN:</span> {book?.isbn}
          </p>
          <p>
            <span className="font-semibold">Copies:</span> {book?.copies}
          </p>
          <p>
            <span className="font-semibold">Availability:</span>{" "}
            <span
              className={`font-semibold ${
                book?.available ? "text-green-600" : "text-red-600"
              }`}
            >
              {book?.available ? "Available" : "Unavailable"}
            </span>
          </p>
          {book?.description && (
            <p>
              <span className="font-semibold">Description:</span>{" "}
              {book?.description}
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default BookDetails;
