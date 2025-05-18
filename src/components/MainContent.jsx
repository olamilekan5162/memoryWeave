import { useNavigate } from "react-router-dom";
import CapsuleCard from "../cards/CapsuleCard";
import { getAllVibes } from "../utils/indexedDB.js";
import { importVibe } from "../utils/indexedDB.js";
import { useEffect, useState, useRef } from "react";
import { CiImport } from "react-icons/ci";
import MobileSearchBar from "../modal/MobileSearchBar.jsx";

const Main = ({ openSearch, searchQuery, setSearchQuery }) => {
  const navigate = useNavigate();
  const [vibes, setVibes] = useState(null);
  const fileInputRef = useRef(null);
  const [filtered, setFiltered] = useState("all");
  const [sortOrder, setSortOrder] = useState("newest");

  useEffect(() => {
    const getVibes = async () => {
      const vibe = await getAllVibes();
      setVibes(vibe);
      console.log(vibe);
    };
    getVibes();
  }, [vibes]);

  const filteredVibe = vibes
    ?.filter(
      (filterVibe) =>
        filterVibe.tags.some((tag) =>
          tag.toLowerCase().includes(filtered.toLowerCase())
        ) || filtered === "all"
    )
    .sort((a, b) => {
      const dateA = new Date(a.date);
      const dateB = new Date(b.date);
      if (sortOrder === "newest") {
        return dateB - dateA;
      } else if (sortOrder === "oldest") {
        return dateA - dateB;
      } else {
        return 0;
      }
    });

  const searchedVibes = filteredVibe?.filter(
    (vibe) =>
      vibe.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      vibe.tags.some((tag) =>
        tag.toLowerCase().includes(searchQuery.toLowerCase())
      )
  );

  const handleFilePicked = async (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const jsonStr = await file.text();
    await importVibe(jsonStr);
    alert("Capsule imported");
    e.target.value = "";
  };

  return (
    <>
      <main className="flex flex-col gap-5 px-4 md:px-[250px] text-text">
        <div className="flex flex-row items-center justify-between text-text">
          <h1 className="font-bold text-2xl">Memory Capsule</h1>
          <div
            className="flex flex-row items-center hover:text-primary cursor-pointer"
            onClick={() => fileInputRef.current.click()}
          >
            <input
              type="file"
              accept="application/json"
              ref={fileInputRef}
              className="hidden"
              onChange={handleFilePicked}
            />
            <CiImport />
            <p className="hidden sm:block">Import Weave</p>
          </div>
        </div>
        <div className="flex flex-row gap-2 flex-wrap">
          <div className="flex flex-row items-center">
            <p>Filter by Tags:</p>
            <select
              className="px-2 py-1 border-0 outline-0"
              onChange={(e) => setFiltered(e.target.value)}
            >
              <option value="all" selected>
                All Memories
              </option>
              <option value="beach">Beach</option>
              <option value="birthday">Birthday</option>
              <option value="hangout">hangout</option>
            </select>
          </div>
          <div className="flex flex-row items-center">
            <p>Sort by Date:</p>
            <select
              className="px-2 py-1 border-0 outline-0"
              onChange={(e) => setSortOrder(e.target.value)}
            >
              <option value="newest" selected>
                Newest
              </option>
              <option value="oldest">Oldest</option>
            </select>
          </div>
        </div>
        <div className="flex flex-row gap-6 sm:gap-12 sm:px-3 flex-wrap justify-center sm:justify-start">
          {vibes &&
            (searchQuery
              ? searchedVibes.map((vibe) => (
                  <CapsuleCard
                    key={vibe.id}
                    title={vibe.title}
                    date={vibe.date}
                    media={vibe.media}
                    location={vibe.location}
                    onclick={() => navigate(`/${vibe.id}`)}
                  />
                ))
              : filteredVibe.map((vibe) => (
                  <CapsuleCard
                    key={vibe.id}
                    title={vibe.title}
                    date={vibe.date}
                    media={vibe.media}
                    location={vibe.location}
                    onclick={() => navigate(`/${vibe.id}`)}
                  />
                )))}
        </div>
        <MobileSearchBar
          isOpen={openSearch}
          setSearchQuery={setSearchQuery}
          searchQuery={searchQuery}
        />
      </main>
    </>
  );
};

export default Main;
