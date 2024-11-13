const CallToAction = () => {
  return (
    <section className="relative overflow-hidden bg-[#3b3054] py-16 font-bold text-white">
      <div className="absolute inset-0">
        <picture>
          <source
            media="(min-width: 600px)"
            srcSet="/images/bg-boost-desktop.svg"
          />
          <img
            className="h-full w-full"
            src="/images/bg-boost-mobile.svg"
            alt="CTA Background Blob"
          />
        </picture>
      </div>
      <div className="main-container relative grid gap-8 text-center xl:gap-10 xxl:gap-12">
        <h2 className="text-4xl md:text-5xl xl:text-6xl xxl:text-7xl">
          Boost your links today
        </h2>
        <button className="mx-auto w-fit rounded-[100vmax] bg-primary bg-opacity-75 px-6 py-3 text-sm transition-all duration-300 hover:bg-opacity-100">
          Get Started
        </button>
      </div>
    </section>
  );
};

export default CallToAction;
