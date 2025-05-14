import Header from "../components/Header";
import Lekan from "../assets/lekan.jpg";

const Playback = () => {
  return (
    <>
      <Header />
      <div className="flex flex-col items-center justify-center h-full w-full mt-[150px]">
        <div className="border-1 rounded-xl border-gray-300 h-[500px] w-[95%] md:w-[60%] p-8 relative">
          <div
            className="absolute inset-0 bg-cover bg-center bg-no-repeat blur-lg"
            style={{
              backgroundImage: `url(${Lekan})`,
              backgroundSize: "cover",
            }}
          />
          <div className="relative z-10 h-full flex items-center justify-center">
            <img
              src={Lekan}
              alt=""
              className="max-h-full max-w-full object-contain"
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default Playback;
