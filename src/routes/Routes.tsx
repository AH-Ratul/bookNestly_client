import { createBrowserRouter } from "react-router";
import HomePage from "../pages/HomePage";
import App from "../App";
import CreateBook from "../pages/CreateBook";
import BookDetails from "../pages/BookDetails";
import BorrowSummary from "../pages/BorrowSummary";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "/",
        element: <HomePage />,
      },
      {
        path: "create-book",
        element: <CreateBook />,
      },
      {
        path: "books/:id",
        element: <BookDetails />,
      },
      {
        path: "borrow-summary",
        element: <BorrowSummary />,
      },
    ],
  },
]);
