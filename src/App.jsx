import Header from "./components/Header";
import Hero from "./components/Hero";
import MainContent from "./components/MainContent";
import { useState } from "react";

function App() {
  const [openSearch, setOpenSearch] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  return (
    <>
      <Header
        openSearch={openSearch}
        setOpenSearch={setOpenSearch}
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
      />
      <Hero />
      <MainContent
        openSearch={openSearch}
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
      />
    </>
  );
}

export default App;
