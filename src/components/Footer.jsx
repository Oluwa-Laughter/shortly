const footerLinks = [
  {
    title: "Features",
    link1: "Link Shortening",
    link2: "Branded Links",
    link3: "Analytics",
  },
  {
    title: "Resources",
    link1: "Blog",
    link2: "Developers",
    link3: "Support",
  },
  {
    title: "Company",
    link1: "About",
    link2: "Our Team",
    link3: "Careers",
    link4: "Contact",
  },
];

const Footer = () => {
  return (
    <footer className="bg-veryDarkViolet text-white px-8 py-16 ">
      <div className="max-w-container mx-auto grid grid-cols-1 justify-items-center md:justify-items-start gap-8 md:grid-cols-5 ">
        <h2 className="text-3xl text-white font-bold">Shortly</h2>

        {footerLinks.map((item, index) => (
          <div
            key={index}
            className="flex flex-col items-center md:items-start gap-4 p-2"
          >
            <h3 className="text-white font-bold">{item.title}</h3>
            <ul className="flex flex-col items-center md:items-start gap-2">
              <li className="text-white text-sm hover:text-primary">
                <a href="#">{item.link1}</a>
              </li>
              <li className="text-white text-sm hover:text-primary">
                <a href="#">{item.link2}</a>
              </li>
              <li className="text-white text-sm hover:text-primary">
                <a href="#">{item.link3}</a>
              </li>
              {item.link4 && (
                <li className="text-white text-sm hover:text-primary">
                  <a href="#">{item.link4}</a>
                </li>
              )}
            </ul>
          </div>
        ))}

        <ul className="flex gap-4 justify-center">
          <li>
            <a>
              <img
                src="/images/icon-facebook.svg"
                className="hover:color-primary"
                alt="facebook"
              />
            </a>
          </li>
          <li>
            <a>
              <img src="/images/icon-twitter.svg" alt="twitter" />
            </a>
          </li>
          <li>
            <a>
              <img src="/images/icon-pinterest.svg" alt="pinterest" />
            </a>
          </li>
          <li>
            <a>
              <img src="/images/icon-instagram.svg" alt="instagram" />
            </a>
          </li>
        </ul>
      </div>
    </footer>
  );
};

export default Footer;
