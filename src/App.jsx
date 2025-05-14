import Header from "./components/Header";
import Hero from "./components/Hero";
import Dashboard from "./pages/Dashboard";

function App() {
  return (
    <>
      {/* <div className="flex flex-col items-center border-4 border-red-500 h-[100vh]"> */}
      <Header />
      <Hero />
      <Dashboard />
    </>
  );
}

export default App;
