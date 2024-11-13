const CardData = [
  {
    image: "images/icon-brand-recognition.svg",
    title: "Brand Recognition",
    info: "Boost your brand recognition with each click. Generic links don't means thing. Branded links help instil confidence in your content.",
  },
  {
    image: "images/icon-detailed-records.svg",
    title: "Detailed Records",
    translate: "translate-y-10",
    info: "Gain insights into who is clicking your links. Knowing when and where people engage with your content helps inform better decisions.",
  },
  {
    image: "images/icon-fully-customizable.svg",
    title: "Fully Customizable",
    translate: "translate-y-16",
    info: "Improve brand awareness and content dicoverability through customizable links, supercharging audience engagement.",
  },
];

const Statistics = () => {
  return (
    <section className="bg-slate-200 w-full px-8 py-24">
      <div className="max-w-container mx-auto flex flex-col items-center justify-center">
        <div className="mb-16 text-center">
          <h2 className="text-veryDarkViolet font-bold text-4xl">
            Advanced Statistics
          </h2>
          <p className="text-sm font-medium text-black text-opacity-60 sm:w-[45ch] sm:text-base">
            Track how your links are performing across the web with our advanced
            statistics dashboard.
          </p>
        </div>

        <div className="flex flex-col gap-6 sm:gap-4 md:flex-row lg:gap-8">
          {CardData.map((item, index) => (
            <article
              key={index}
              className={`relative grid rounded-lg bg-white p-4 text-center shadow-lg md:p-6 md:text-left lg:p-8 ${item.translate}`}
            >
              <div className="absolute -top-10 left-1/2 w-fit -translate-x-1/2 rounded-[50%] bg-slate-700 p-4 shadow-xl md:left-4 md:translate-x-0 lg:left-6">
                <img src={item.image} alt={`${item.title} Logo`} />
              </div>
              <span className="my-4 mt-8 text-xl font-bold">{item.title}</span>
              <p className="text-sm text-[#bfbfbf] lg:text-base">{item.info}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Statistics;
