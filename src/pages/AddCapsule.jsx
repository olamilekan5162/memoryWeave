import { useState } from "react";
import Header from "../components/Header";
import { BsCloudUpload } from "react-icons/bs";
import Button from "../components/Button";
import { v4 as uuidv4 } from "uuid";
import { saveVibe } from "../utils/indexedDB.js";
import { useNavigate } from "react-router-dom";
import spring from "../assets/sounds/ambient-spring-forest.mp3";
import flute from "../assets/sounds/flute-rain.mp3";
import birthday from "../assets/sounds/happy-birthday.mp3";
import beach from "../assets/sounds/soft-beach-wave.mp3";

const AddCapsule = () => {
  const [userVibe, setUserVibe] = useState({
    id: uuidv4(),
    title: "",
    tags: [],
    media: [],
    date: "",
    location: "",
    ambientSound: "",
    journal: "",
  });
  const [tag, setTag] = useState(userVibe.tags.join(", "));
  const navigate = useNavigate();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUserVibe({
      ...userVibe,
      [name]: value,
    });
  };

  const handleMediaChange = (e) => {
    const files = Array.from(e.target.files);
    const media = files.map((file) => ({
      id: uuidv4(),
      file: file,
      name: file.name,
      type: file.type,
    }));
    setUserVibe({ ...userVibe, media: [...userVibe.media, ...media] });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const tagsArray = tag
      .split(",")
      .map((t) => t.trim())
      .filter((t) => t);

    const vibeToSave = { ...userVibe, tags: tagsArray };
    await saveVibe(vibeToSave);
    setUserVibe({
      id: uuidv4(),
      title: "",
      tags: [],
      media: [],
      date: "",
      location: "",
      ambientSound: "",
      journal: "",
    });
    navigate("/");
  };

  return (
    <>
      <Header />
      <div className="flex items-center justify-center h-full w-full mt-[150px]">
        <form
          onSubmit={handleSubmit}
          className="flex flex-col border-1 rounded-xl border-gray-300 w-[95%] md:w-[60%] p-8 gap-2"
        >
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
            value={userVibe.title}
            onChange={handleInputChange}
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
                value={userVibe.location}
                onChange={handleInputChange}
              />
            </label>
            <label for="date" className="text-xl">
              Date:
              <input
                className="border-1 border-gray-300 p-2 w-full rounded outline-0"
                type="date"
                name="date"
                id="date"
                value={userVibe.date}
                onChange={handleInputChange}
              />
            </label>
            <label for="ambientSound" className="text-xl">
              Ambience:
              <select
                name="ambientSound"
                id="ambientSound"
                className="px-2 py-1 border-0 outline-0"
                onChange={handleInputChange}
                value={userVibe.ambientSound}
              >
                <option value="">-- Select Sound --</option>
                <option value={spring}>Spring Forest</option>
                <option value={flute}>Flute Rain</option>
                <option value={beach}>Beach Wave</option>
                <option value={birthday}>Happy Birthday</option>
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
            placeholder="Enter memory tags separated with a comma"
            value={tag}
            onChange={(e) => setTag(e.target.value)}
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
            value={userVibe.jornal}
            onChange={handleInputChange}
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
            <input
              className="hidden"
              type="file"
              name="media"
              id="media"
              multiple
              accept="image/*, video/*"
              onChange={handleMediaChange}
            />
          </label>
          <Button text={"Save Weave"} />
        </form>
      </div>
    </>
  );
};

export default AddCapsule;
