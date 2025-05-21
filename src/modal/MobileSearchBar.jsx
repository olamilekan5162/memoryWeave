import { CiSearch } from "react-icons/ci";
const MobileSearchBar = ({ isOpen, searchQuery, setSearchQuery }) => {
  if (!isOpen) return null;
  return (
    <div className="fixed top-30 h-[100px] w-full bg-[#ffffff] flex items-center">
      <div className="flex flex-row gap-1 items-center border-1 border-gray-300 w-[90%] h-fit rounded py-1 px-3">
        <input
          placeholder="Search for memories by tag, title, journal content..."
          className="border-0 outline-0 w-full text-sm text-text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
        <CiSearch className="text-3xl cursor-pointer" />
      </div>
    </div>
  );
};

export default MobileSearchBar;
