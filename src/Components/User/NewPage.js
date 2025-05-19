import React from "react";

function NewPage({ allposts }) {
  return (
    <>
      <Hero />
    </>
  );
}

export default NewPage;

const Hero = () => {
  return (
    <>
      <div
        className="relative h-[500px] w-full bg-cover bg-center"
        style={{
          backgroundImage: `linear-gradient(270deg, rgba(0, 0, 0, 0) 0%, #000000 100%), url('/Hero.jpg')`,
        }}>
        {/* Content */}
        <div className="relative z-10 flex items-center h-full px-10 md:px-20">
          <div className="text-white max-w-4xl space-y-6">
            <h1 className="text-4xl font-bold leading-tight">
              Discover 200+ Home Improvement Blogs with HomImprovement for Your
              Dream House
            </h1>
            <p className="text-lg md:text-xl">
              Browse HomImprovement for expert guides on home renovation,
              design, and smart tech. Transform your living space with trusted
              advice!
            </p>
            <button className="mt-4 px-6 py-3 bg-indigo-600 hover:bg-indigo-700 text-white rounded-full font-semibold transition duration-300">
              More Insights
            </button>
          </div>
        </div>
      </div>
      <div className="bg-[#DEDEFF] py-5">
        <div className="max-w-7xl mx-auto text-center">
          <h1 className=" lg:text-5xl text-2xl  font-bold text-[#202D53] mb-6">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit
          </h1>
          <p className="lg:text-xl text-lg text-black">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent id
            finibus turpis, nec faucibus ante. Praesent in libero ut lectus
            consequat efficitur vel sit amet leo. Aenean sit amet tellus ut
            sapien ullamcorper viverra.
          </p>
        </div>
      </div>
    </>
  );
};
