import Header from "./components/Header";
import Hero from "./components/Hero";
import Main from "./components/MainContent";
import { useState } from "react";

function App() {
  const [openSearch, setOpenSearch] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  return (
    <>
      {/* <div className="flex flex-col items-center border-4 border-red-500 h-[100vh]"> */}
      <Header
        openSearch={openSearch}
        setOpenSearch={setOpenSearch}
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
      />
      <Hero />
      <Main
        openSearch={openSearch}
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
      />
    </>
  );
}

export default App;
