import { Outlet } from "react-router";
import Header from "./components/Header/Header";
import { Toaster } from "react-hot-toast";
import Footer from "./components/Footer/Footer";

function App() {
  return (
    <div className="relative bg-stone-50 font-serif flex flex-col min-h-screen">
      <Header />
      <Outlet />
      <Footer />
      <Toaster position="top-center" />
    </div>
  );
}

export default App;
