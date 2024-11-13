const Hero = () => {
  return (
    <section className="w-full px-8 md:py-8">
      <div className="max-w-container md:mx-auto grid grid-cols-1 md:grid-cols-2 gap-16">
        <div className="flex flex-col gap-3">
          <h1 className="text-black font-bold md:text-5xl text-3xl">
            More than just shorter links
          </h1>
          <p className="text-grayish-violet">
            Build your brand&apos;s recognition and get detailed isights on how
            your links are performing
          </p>

          <button className="text-2xl">Get Started</button>
        </div>
        <div className="flex items-center justify-end relative ">
          <img
            src="/public/images/illustration-working.svg"
            className="w-5/6 items-center justify-end absolute right-0"
            alt=""
          />
        </div>
      </div>
    </section>
  );
};

export default Hero;
