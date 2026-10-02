import { Link } from "react-router-dom";

const CheckoutNav = () => {

  return (
    <div className="w-full border-b border-gray-300 py-5 sm:py-6 lg:py-5 px-4 sm:px-6 lg:px-10 xl:px-20">

      <div className=" font-playwrite text-3xl sm:text-4xl lg:text-5xl font-extrabold lg:px-20">

        <Link to="/">
          aria
        </Link>

      </div>

    </div>
  );
};

export default CheckoutNav;