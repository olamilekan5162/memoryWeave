import { useNavigate } from "react-router-dom";
import Button from "./Button";

const EmptyState = () => {
  const navigate = useNavigate();
  return (
    <div className="flex flex-col items-center justify-center text-center w-full p-10 h-full">
      <h2 className="text-2xl font-semibold text-text mb-2">
        Your Story Awaits Weaving
      </h2>
      <p className="text-text mb-6 max-w-md">
        Your collection of woven memories will appear here. Let's start by
        crafting your first unforgettable moment. What story do you want to
        tell?
      </p>
      <Button onclick={() => navigate("/")} text={"Weave New Memory"} />
    </div>
  );
};

export default EmptyState;
