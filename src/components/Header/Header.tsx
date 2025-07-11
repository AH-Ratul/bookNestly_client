import { Link } from "react-router";
import book from "../../../public/book.svg";
import { useState } from "react";
import { AlignRightIcon, Book, BookPlus, NotepadTextIcon } from "lucide-react";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  return (
    <header className="sticky bg-stone-50 top-0 z-50 shadow-sm p-4 ">
      <div className="container flex justify-between items-center mx-auto">
        {/* logo */}
        <Link to='/' className="flex items-center gap-1">
          <img src={book} alt="book_logo" className="w-8" />
          <h1 className="font-bold text-2xl text-teal-800">BOOKNESTLY</h1>
        </Link>

        {/* Desktop nav items */}
        <nav className="hidden md:flex gap-10 font-medium text-teal-800">
          <Link to="/" className="hover:text-teal-600">
            All Books
          </Link>
          <Link to="/create-book" className="hover:text-teal-600">
            Add Book
          </Link>
          <Link to="/borrow-summary" className="hover:text-teal-600">
            Borrow Summary
          </Link>
        </nav>

        {/* Mobile menu button */}
        <div className="md:hidden">
          <button onClick={toggleMenu}>
            <AlignRightIcon size={30} />
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {isMenuOpen && (
        <div className="md:hidden mt-5 space-y-2 text-slate-800 flex flex-col">
          <Link to="/" className="py-2 flex items-center gap-1">
            <Book size={20} />
            All Books
          </Link>
          <Link to="/create-book" className="py-2 flex items-center gap-1">
            <BookPlus size={20} />
            Add Book
          </Link>
          <Link to="/borrow-summary" className="py-2 flex items-center gap-1">
            <NotepadTextIcon size={20} />
            Borrow Summary
          </Link>
        </div>
      )}
    </header>
  );
};

export default Header;
