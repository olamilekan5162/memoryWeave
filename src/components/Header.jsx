import { CiSearch } from "react-icons/ci";
import { FaPlus } from "react-icons/fa6";
import Button from "./Button";
import { Link, useNavigate } from "react-router-dom";
import weave from "../assets/weave.png";
const Header = ({ openSearch, setOpenSearch, searchQuery, setSearchQuery }) => {
  const navigate = useNavigate();
  return (
    <nav className="w-full h-[120px] flex flex-row items-center justify-around border-b-1 border-gray-300 fixed top-0 left-0 backdrop-blur-md z-50">
      <Link className="flex flex-row items-center gap-2" to={"/"}>
        <img src={weave} alt="" className="w-[50px] h-auto" />
        <h1 className="text-2xl font-bold text-primary">
          MEMORY
          <span className="text-text block">WEAVE</span>
        </h1>
      </Link>

      <div className="hidden sm:flex flex-row gap-1 items-center border-1 border-gray-300 w-[40%] py-2 px-5 rounded">
        <input
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Search for memories by tag, title, date ..."
          className="border-0 outline-0 w-full text-text"
        />
        <CiSearch className="text-3xl cursor-pointer" />
      </div>

      <CiSearch
        className="text-3xl sm:hidden"
        onClick={() => setOpenSearch(!openSearch)}
      />

      <div className="hidden  sm:block">
        <Button
          text={"+ Weave New Memory"}
          onclick={() => navigate("/upload")}
        ></Button>
      </div>

      <div
        className="rounded-full bg-primary hover:opacity-80 p-1 sm:hidden"
        onClick={() => navigate("/upload")}
      >
        <FaPlus className="text-2xl text-white " />
      </div>
    </nav>
  );
};

export default Header;
