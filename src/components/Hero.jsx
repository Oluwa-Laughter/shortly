const Hero = () => {
  return (
    <section className="w-full px-8 py-16 mb-10">
      <div className="max-w-container mx-auto flex flex-col-reverse md:flex-row items-center gap-12 ">
        <div className="flex flex-col gap-4 justify-center items-center md:items-start ">
          <h1 className="text-black font-bold text-center md:text-start text-5xl ">
            More than just shorter links
          </h1>
          <p className="text-grayish-violet text-center md:text-start">
            Build your brand&apos;s recognition and get detailed insights on how
            your links are performing
          </p>

          <button className=" w-fit text-white font-bold rounded-[100vmax] bg-primary bg-opacity-75 px-6 py-3 text-sm transition-all duration-300 hover:bg-opacity-100">
            Get Started
          </button>
        </div>
        <div className="flex items-center justify-end relative ">
          <img
            src="/images/illustration-working.svg"
            className="w-full h-auto"
            alt="illustration-working"
          />
        </div>
      </div>
    </section>
  );
};

export default Hero;
