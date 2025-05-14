import { GiPin } from "react-icons/gi";
const CapsuleCard = ({ title, imageUrl, date }) => {
  return (
    <div className="flex flex-col shadow-xl w-[200px] h-[200px] px-2 border-2 border-text hover:bg-[#f9fafb] rounded">
      <div className="flex flex-row items-center justify-center gap-4 border-b-2 border-dashed border-text py-1">
        <h1 className="font-bold">{title}</h1>
        <GiPin className="text-red-500 text-2xl drop-shadow-md" />
      </div>
      <div className="w-full h-auto overflow-hidden my-2 flex items-center justify-center">
        <img src={imageUrl} alt="" className="w-full h-auto" />
      </div>
      <div className="flex flex-row items-center justify-between">
        <p className="text-sm">{date}</p>
      </div>
    </div>
  );
};

export default CapsuleCard;
