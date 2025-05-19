import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="mt-[50px] flex items-center justify-center gap-5 sm:gap-10 border-t-1 py-5 border-gray-300 flex-wrap my-auto">
      <Link to={"/"} className="text-primary font-bold text-xl">
        Memory
        <span className="text-text">Weave</span>
      </Link>
      <div>&copy; 2025 MemoryWeave. All rights reserved.</div>
    </footer>
  );
};

export default Footer;
