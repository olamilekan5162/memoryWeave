import Header from "../components/Header";
import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useRef, useState } from "react";
import { getVibeById } from "../utils/indexedDB";
import { deleteVibe } from "../utils/indexedDB";
import { MdDeleteOutline } from "react-icons/md";
import DeleteConfirmationModal from "../modal/DeleteConfirmationModal";
import { CiExport } from "react-icons/ci";
import { IoReturnDownBackSharp } from "react-icons/io5";

const Playback = () => {
  const [vibe, setVibe] = useState(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [currentMediaUrl, setCurrentMediaUrl] = useState("");
  const audioRef = useRef(null);
  const { id } = useParams();
  const navigate = useNavigate();
  const [isModalOpen, setIsModalOpen] = useState(false);

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

    if (audioRef.current) {
      audioRef.current.volume = currentMedia.type.startsWith("video/")
        ? 0.1
        : 1;
    }

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

  const handleDelete = () => {
    deleteVibe(id);
    alert("File deleted");
    setIsModalOpen(false);
    navigate("/");
  };

  return (
    <>
      <Header />
      <div className="flex flex-col items-center justify-center h-full w-full gap-5 py-10 mt-[120px]">
        <div className="flex flex-row gap-5 items-center justify-between pl-5 border-l-8 h-[40px] w-[90%] border-primary">
          <IoReturnDownBackSharp
            className="text-xl hover:text-primary cursor-pointer"
            onClick={() => navigate("/")}
          />
          <div className="flex flex-row items-center gap-5">
            <div
              className="flex flex-row gap-1 items-center hover:text-primary cursor-pointer"
              onClick={() => setIsModalOpen(true)}
            >
              <MdDeleteOutline />
              <p className="hidden sm:block">Delete Memory</p>
            </div>
            <div className="flex flex-row gap-1 items-center hover:text-primary cursor-pointer">
              <CiExport />
              <p className="hidden sm:block">Export Memory</p>
            </div>
          </div>
        </div>
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
                  autoPlay
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
        <div className="flex flex-row items-center gap-3 flex-wrap px-3 sm:px-0">
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
        <DeleteConfirmationModal
          onClose={() => setIsModalOpen(false)}
          isOpen={isModalOpen}
          onDelete={handleDelete}
        />
      </div>
      <audio
        ref={audioRef}
        src={vibe?.ambientSound}
        autoPlay
        loop
        className="hidden"
      ></audio>
    </>
  );
};

export default Playback;
