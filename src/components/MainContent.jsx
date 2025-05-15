import { useNavigate } from "react-router-dom";
import CapsuleCard from "../cards/Capsulecard";
import { getAllVibes } from "../utils/indexedDB.js";
import { useEffect, useState } from "react";
const Main = () => {
  const navigate = useNavigate();
  const [vibes, setVibes] = useState(null);

  useEffect(() => {
    const getVibes = async () => {
      const vibe = await getAllVibes();
      setVibes(vibe);
      console.log(vibe);
    };
    getVibes();
  }, []);
  return (
    <main className="flex flex-col gap-5 px-4 md:px-[250px] text-text">
      <h1 className="font-bold text-2xl">Memory Capsule</h1>
      <div className="flex flex-row gap-2 flex-wrap">
        <div className="flex flex-row items-center">
          <p>Filter by Tags:</p>
          <select className="px-2 py-1 border-0 outline-0">
            <option value="all" selected>
              All Memories
            </option>
            <option value="happy">Beach</option>
            <option value="sad">Birthday</option>
            <option value="sad">hangout</option>
          </select>
        </div>
        <div className="flex flex-row items-center">
          <p>Sort by Date:</p>
          <select className="px-2 py-1 border-0 outline-0">
            <option value="newest" selected>
              Newest
            </option>
            <option value="oldest">Oldest</option>
          </select>
        </div>
      </div>
      <div className="flex flex-row gap-6 md:gap-12 px-[50px] md:px-3 flex-wrap justify-center md:justify-start">
        {vibes &&
          vibes.map((vibe) => (
            <CapsuleCard
              key={vibe.id}
              title={vibe.title}
              date={vibe.date}
              media={vibe.media}
              location={vibe.location}
              onclick={() => navigate(`/${vibe.id}`)}
            />
          ))}
      </div>
    </main>
  );
};

export default Main;
