const Footer = () => {
  return (
    <footer className="bg-zinc-900 w-full text-white px-5 sm:px-8 md:px-10 py-10 sm:py-12 md:py-16 mt-5">

      {/* ================= FOOTER CONTENT ================= */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 sm:gap-10">

        {/* Brand */}
        <div>
          <h3 className="font-playwrite text-2xl sm:text-3xl mb-4">
            aria
          </h3>

          <p className="text-zinc-400 text-sm leading-6 max-w-sm">
            Elevating everyday fashion with timeless pieces and effortless
            style.
          </p>
        </div>


        {/* Shop */}
        <div>
          <h4 className="font-semibold mb-4">
            SHOP
          </h4>

          <ul className="space-y-2 text-zinc-400 text-sm">
            <li className="cursor-pointer hover:text-white transition">
              Men
            </li>

            <li className="cursor-pointer hover:text-white transition">
              Women
            </li>

            <li className="cursor-pointer hover:text-white transition">
              Accessories
            </li>

            <li className="cursor-pointer hover:text-white transition">
              Sale
            </li>
          </ul>
        </div>


        {/* Company */}
        <div>
          <h4 className="font-semibold mb-4">
            COMPANY
          </h4>

          <ul className="space-y-2 text-zinc-400 text-sm">
            <li className="cursor-pointer hover:text-white transition">
              About Us
            </li>

            <li className="cursor-pointer hover:text-white transition">
              Our Story
            </li>

            <li className="cursor-pointer hover:text-white transition">
              Careers
            </li>

            <li className="cursor-pointer hover:text-white transition">
              Press
            </li>
          </ul>
        </div>


        {/* Support */}
        <div>
          <h4 className="font-semibold mb-4">
            SUPPORT
          </h4>

          <ul className="space-y-2 text-zinc-400 text-sm">
            <li className="cursor-pointer hover:text-white transition">
              Contact Us
            </li>

            <li className="cursor-pointer hover:text-white transition">
              FAQs
            </li>

            <li className="cursor-pointer hover:text-white transition">
              Shipping & Delivery
            </li>

            <li className="cursor-pointer hover:text-white transition">
              Returns & Exchanges
            </li>
          </ul>
        </div>

      </div>


      {/* ================= BOTTOM ================= */}
      <div
        className="
          border-t
          border-zinc-800
          mt-10
          sm:mt-12
          pt-6

          flex
          flex-col
          sm:flex-row

          justify-between
          items-start
          sm:items-center

          gap-4

          text-zinc-500
          text-xs
          sm:text-sm
        "
      >

        <p>
          © 2026 Aria. All Rights Reserved.
        </p>

        <div className="flex flex-wrap gap-x-5 gap-y-2">
          <p className="cursor-pointer hover:text-zinc-300 transition">
            Privacy Policy
          </p>

          <p className="cursor-pointer hover:text-zinc-300 transition">
            Terms
          </p>

          <p className="cursor-pointer hover:text-zinc-300 transition">
            Cookies
          </p>
        </div>

      </div>

    </footer>
  );
};

export default Footer;