const Footer = () => {
  return (
    <footer className="mt-16 border-t bg-white text-gray-600">
      <div className="container mx-auto px-4 py-6 flex flex-col md:flex-row items-center justify-between text-sm">
        {/* Site Info */}
        <p className="text-center md:text-left mb-2 md:mb-0">
          © {new Date().getFullYear()} <span className="font-medium text-slate-800">BookNestly</span>. All rights reserved.
        </p>

        {/* Developer Credit */}
        <p className="text-center md:text-right">
          Developed by{" "}
          <a
            href="https://github.com/ah-ratul"
            target="_blank"
            rel="noopener noreferrer"
            className="text-teal-600 hover:underline"
          >
            AHR
          </a>
        </p>
      </div>
    </footer>
  );
};

export default Footer;
