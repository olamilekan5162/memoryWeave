import Header from "./components/Header";
import Hero from "./components/Hero";

function App() {
  return (
    <>
      {/* <div className="flex flex-col items-center border-4 border-red-500 h-[100vh]"> */}
      <Header />
      <Hero />
      <div className="flex flex-col border-2 sm:px-4 md:px-[100px]">
        <h1 className="font-bold text-2xl">Memory Capsule</h1>
      </div>
    </>
  );
}

export default App;
