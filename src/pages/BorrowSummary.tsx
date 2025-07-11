import Loader from "../components/Loader/Loader";
import Modal from "../components/Modal/Modal";
import { useBorrowSummaryQuery } from "../redux/api/borrowApi";

const BorrowSummary = () => {
  const { data: borrowSummary, isLoading } = useBorrowSummaryQuery(undefined);

  if (isLoading) {
    <Modal modal={<Loader color={"black"} />} />;
  }

  return (
    <div className="p-4 max-w-5xl mx-auto min-h-screen">
      <h2 className="text-xl font-semibold text-teal-800 mb-4">
        Borrow Summary
      </h2>

      <div className="w-full overflow-hidden rounded-lg border bg-white shadow-sm">
        <table className="w-full table-auto text-sm text-left">
          <thead className="bg-gray-100 text-gray-700 uppercase text-xs">
            <tr>
              <th className="px-4 py-3">Book Title</th>
              <th className="px-4 py-3">ISBN</th>
              <th className="px-4 py-3 text-center">Total Borrowed</th>
            </tr>
          </thead>
          <tbody>
            {borrowSummary?.result?.map((item: any) => (
              <tr key={item.book.isbn} className="border-t hover:bg-gray-50">
                <td className="px-4 py-3 break-words">{item.book.title}</td>

                {/* ✅ ISBN will break on small screens */}
                <td className="px-4 py-3 break-all text-sm text-slate-700 font-mono">
                  {item.book.isbn}
                </td>

                <td className="px-4 py-3 text-center font-medium text-slate-700">
                  {item.totalQuantity}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Empty state */}
      {borrowSummary?.result?.length === 0 && (
        <p className="text-center py-6 text-gray-500">
          No borrow records found.
        </p>
      )}
    </div>
  );
};

export default BorrowSummary;
