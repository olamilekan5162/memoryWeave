const Hero = () => {
  return (
    <div className="flex flex-col items-center justify-center h-[200px] sm:w-[40%] gap-2 sm:mx-auto text-center mt-[120px] mb-[10px] px-4 md:px-0">
      <h1 className="text-2xl sm:text-4xl font-extrabold">
        <span className="text-secondary"> Relive </span>Your Intriguing Memories
      </h1>
      <p className="text-text max-w-[90%] sm:max-w-[60%] text-sm sm:text-base">
        Craft immersive experiences from your photos, videos, and stories. Weave
        together the sights, sounds, and emotions of your most cherished
        moments.
      </p>
    </div>
  );
};

export default Hero;
