import { CiSearch } from "react-icons/ci";
import { FaPlus } from "react-icons/fa6";
import Button from "./Button";
import { useNavigate } from "react-router-dom";
const Header = () => {
  const navigate = useNavigate();
  return (
    <nav className="w-full h-[120px] flex flex-row items-center justify-around shadow-sm fixed top-0 left-0 backdrop-blur-md">
      <h1 className="text-3xl font-bold text-primary">
        SUMMER
        <span className="text-secondary block">VIBE WEAVER</span>
      </h1>

      <div className="hidden sm:flex flex-row gap-1 items-center border-3 border-primary w-[40%] py-2 px-5 rounded">
        <input
          placeholder="Search for memories by tag, title, date ..."
          className="border-0 outline-0 w-full text-text"
        />
        <CiSearch className="text-3xl cursor-pointer" />
      </div>

      <CiSearch className="text-3xl sm:hidden" />

      <div className="hidden  sm:block">
        <Button
          text={"+ Create New Vibe"}
          onclick={() => navigate("upload")}
        ></Button>
      </div>

      <div
        className="rounded-full bg-primary p-1 sm:hidden"
        onClick={() => navigate("upload")}
      >
        <FaPlus className="text-2xl text-white " />
      </div>
    </nav>
  );
};

export default Header;
