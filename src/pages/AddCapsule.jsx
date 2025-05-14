import { useState } from "react";
import Header from "../components/Header";
import { BsCloudUpload } from "react-icons/bs";
import Button from "../components/Button";
// import { useNavigate } from "react-router-dom";

const AddCapsule = () => {
  const [title, setTitle] = useState("");
  // const navigate = useNavigate();
  return (
    <>
      <Header />
      <div className="flex items-center justify-center h-full w-full mt-[150px]">
        <form className="flex flex-col border-1 rounded-xl border-gray-300 w-[95%] md:w-[60%] p-8 gap-2">
          <h1 className="text-2xl font-bold text-center">
            CREATE NEW SUMMER VIBE
          </h1>
          <label for="title" className="text-xl text-text">
            Title:
          </label>
          <input
            className="border-1 border-gray-300 p-2 w-full rounded outline-0"
            type="text"
            name="title"
            id="title"
            placeholder="Enter the title for the memory"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
          <div className="flex flex-row items-center gap-7 flex-wrap">
            <label for="location" className="text-xl">
              Location:
              <input
                className="border-1 border-gray-300 p-2 w-full rounded outline-0"
                type="text"
                name="location"
                id="location"
                placeholder="Location"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
            </label>
            <label for="date" className="text-xl">
              Date:
              <input
                className="border-1 border-gray-300 p-2 w-full rounded outline-0"
                type="date"
                name="location"
                id="location"
                placeholder="Location"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
            </label>
            <label for="Ambience" className="text-xl">
              Ambience:
              <select className="px-2 py-1 border-0 outline-0">
                <option value="all">Beach Wave</option>
                <option value="happy">Happy mole</option>
                <option value="sad">Birthday song</option>
                <option value="sad">Wild</option>
              </select>
            </label>
          </div>
          <label for="tags" className="text-xl">
            Tags:
          </label>
          <input
            className="border-1 border-gray-300 p-2 w-full rounded outline-0"
            type="text"
            name="tags"
            id="tags"
            placeholder="Enter memory tags separated with a space"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
          <label for="jornal" className="text-xl">
            Memories Jornal:
          </label>
          <textarea
            className="border-1 border-gray-300 p-2 w-full rounded outline-0 h-[200px]"
            type="text"
            name="journal"
            id="journal"
            placeholder="Write your story ..."
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
          <label
            htmlFor="media"
            className="flex flex-col sm:flex-row items-center w-[100%] mx-auto justify-center cursor-pointer border-1 border-gray-300 py-6 rounded gap-2 sm:gap-12 mt-1"
          >
            <BsCloudUpload size={50} className="mb-4" />
            <p className="text-sm p-6 sm:hidden">
              Select and upload multiple images of your memory
            </p>
            <div className="hidden sm:flex flex-col items-center justify-center">
              <h1 className="text-lg font-bold">Summer Memories</h1>
              <p>Select and upload multiple images of your memory</p>
            </div>
            <input className="hidden" type="file" name="media" id="media" />
          </label>
          <Button text={"Upload"} />
        </form>
      </div>
    </>
  );
};

export default AddCapsule;
