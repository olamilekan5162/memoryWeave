import CapsuleCard from "../cards/Capsulecard";
import { sample } from "../sample/sample";
const Dashboard = () => {
  return (
    <div className="flex flex-col gap-5 px-4 md:px-[250px] text-text">
      <h1 className="font-bold text-2xl">Memory Capsule</h1>
      <div className="flex flex-row gap-2 flex-wrap">
        <div className="flex flex-row items-center">
          <p>Filter by Tags:</p>
          <select className="px-2 py-1 border-0 outline-0">
            <option value="all" selected>
              All Memories
            </option>
            <option value="happy">Beach</option>
            <option value="sad">Birthday</option>
            <option value="sad">hangout</option>
          </select>
        </div>
        <div className="flex flex-row items-center">
          <p>Sort by Date:</p>
          <select className="px-2 py-1 border-0 outline-0">
            <option value="newest" selected>
              Newest
            </option>
            <option value="oldest">Oldest</option>
          </select>
        </div>
      </div>
      <div className="flex flex-row gap-6 md:gap-12 px-[50px] md:px-3 flex-wrap justify-center md:justify-start">
        {sample.map((capsule) => (
          <CapsuleCard
            key={capsule.id}
            title={capsule.title}
            date={capsule.date}
            media={capsule.media}
            location={capsule.location}
          />
        ))}
      </div>
    </div>
  );
};

export default Dashboard;
