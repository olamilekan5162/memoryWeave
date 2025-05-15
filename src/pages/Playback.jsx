import Header from "../components/Header";
import Lekan from "../assets/lekan.jpg";
import Sade from "../assets/sade.png";

const Playback = () => {
  return (
    <>
      <Header />
      <div className="flex flex-col items-center justify-center h-full w-full gap-10 py-10 mt-[150px]">
        <div className="border-1 rounded-xl border-gray-300 h-[300px] sm:h-[500px] w-[95%] sm:w-[60%] p-8 relative">
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
        <div className="flex flex-row items-center gap-2 flex-wrap">
          <div className="h-[50px] w-[50px] sm:h-[100px] sm:w-[100px] border-2 border-gray-300 rounded">
            <img src={Lekan} alt="" className="w-[100%] h-auto" />
          </div>
          <div className="h-[50px] w-[50px] sm:h-[100px] sm:w-[100px] border-2 border-gray-300 rounded">
            <img src={Sade} alt="" className="w-[100%] h-auto" />
          </div>
        </div>
      </div>
    </>
  );
};

export default Playback;
