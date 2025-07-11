import BookGrid from "../components/BookGrid/BookGrid";
import Loader from "../components/Loader/Loader";
import Modal from "../components/Modal/Modal";
import { useGetBooksQuery } from "../redux/api/bookApi";

const HomePage = () => {
  const { data, isLoading } = useGetBooksQuery(null!, {
    refetchOnMountOrArgChange: true,
  });

  const books = data?.result;

  //console.log(data?.result);

  if (isLoading) {
    return <Modal modal={<Loader />} />;
  }

  return (
    <div className=" flex flex-col justify-center items-center w-full my-auto">
      {books && <BookGrid books={books} />}
    </div>
  );
};

export default HomePage;
