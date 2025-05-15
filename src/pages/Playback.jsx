import Header from "../components/Header";
import Lekan from "../assets/lekan.jpg";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { getVibeById } from "../utils/indexedDB";

const Playback = () => {
  const [vibe, setVibe] = useState(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [currentMediaUrl, setCurrentMediaUrl] = useState("");

  const { id } = useParams();

  useEffect(() => {
    const getVibe = async () => {
      const vibe = await getVibeById(id);
      setVibe(vibe);
      console.log(vibe);
    };
    getVibe();
  }, [id]);

  useEffect(() => {
    const currentMedia = vibe?.media?.[currentIndex];
    if (!currentMedia) return;

    if (currentMedia.type.startsWith("image/")) {
      const timer = setTimeout(() => {
        setCurrentIndex((prevIndex) => (prevIndex + 1) % vibe.media.length);
      }, 5000);

      return () => clearTimeout(timer);
    }
  }, [vibe, currentIndex]);

  useEffect(() => {
    let objectUrl;

    if (vibe?.media?.[currentIndex]?.file instanceof Blob) {
      objectUrl = URL.createObjectURL(vibe.media[currentIndex].file);
      setCurrentMediaUrl(objectUrl);
    }

    return () => {
      if (objectUrl) {
        URL.revokeObjectURL(objectUrl);
      }
    };
  }, [vibe, currentIndex]);

  return (
    <>
      <Header />
      <div className="flex flex-col items-center justify-center h-full w-full gap-10 py-10 mt-[150px]">
        <div className="border-1 rounded-xl border-gray-300 h-[300px] sm:h-[500px] w-[95%] sm:w-[60%] p-8 relative">
          <div
            className="absolute inset-0 bg-cover bg-center bg-no-repeat blur-lg"
            style={{
              backgroundImage:
                vibe?.media?.[currentIndex]?.file instanceof Blob
                  ? `url(${currentMediaUrl})`
                  : "none",
              backgroundSize: "cover",
            }}
          />
          <div className="relative z-10 h-full flex items-center justify-center">
            {vibe?.media?.[currentIndex]?.file instanceof Blob ? (
              vibe.media[currentIndex].type.startsWith("image/") ? (
                <img
                  src={currentMediaUrl}
                  alt=""
                  className="max-h-full max-w-full object-contain"
                />
              ) : (
                <video
                  src={currentMediaUrl}
                  controls
                  onEnded={() =>
                    setCurrentIndex(
                      (prevIndex) => (prevIndex + 1) % vibe.media.length
                    )
                  }
                  className="max-h-full max-w-full object-contain"
                />
              )
            ) : null}
          </div>
        </div>
        <div className="flex flex-row items-center gap-3 flex-wrap">
          {vibe?.media.map((item, index) => (
            <div
              key={item.id}
              className={`h-[50px] w-[50px] sm:h-[100px] sm:w-[100px] hover:scale-106 border-1 border-gray-300 rounded overflow-hidden ${
                currentIndex === index ? "scale-106" : ""
              }`}
              onClick={() => setCurrentIndex(index)}
            >
              {item.file instanceof Blob && item.type.startsWith("image/") ? (
                <img
                  src={URL.createObjectURL(item.file)}
                  alt=""
                  className="w-full h-full object-cover"
                />
              ) : item.file instanceof Blob &&
                item.type.startsWith("video/") ? (
                <video
                  autoPlay
                  muted
                  loop
                  src={URL.createObjectURL(item.file)}
                  className="w-full h-full object-cover"
                />
              ) : null}
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default Playback;
