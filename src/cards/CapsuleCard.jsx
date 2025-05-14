import { GiPin } from "react-icons/gi";
const CapsuleCard = ({ title, media, date, location, onclick }) => {
  return (
    <div
      className="relative flex flex-col shadow-xl w-[200px] h-[200px] p-2 border-2 border-gray-300 hover:scale-105 transition-transform rounded cursor-pointer"
      onClick={onclick}
    >
      <div className="flex flex-row items-center justify-center gap-4 border-b-2 border-dashed border-gray-300 py-1">
        <h1 className="font-bold truncate">{title}</h1>
        <GiPin className="text-red-500 text-l drop-shadow-md" />
      </div>
      <div className="relative flex-grow mt-2">
        {media.slice(0, 3).map((item, index) => (
          <img
            key={index}
            src={item.url}
            alt=""
            className={`absolute w-[90%] h-[90%] object-cover rounded shadow-md transition-all duration-300`}
            style={{
              top: `${index * 6}px`,
              left: `${index * 6}px`,
              zIndex: 10 - index,
            }}
          />
        ))}
      </div>
      <div className="flex flex-row items-center justify-between text-xs mt-auto pt-2">
        <p>{date}</p>
        <p>{location}</p>
      </div>
    </div>
  );
};

export default CapsuleCard;
