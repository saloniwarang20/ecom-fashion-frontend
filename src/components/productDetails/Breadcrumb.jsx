import { ChevronRight } from "lucide-react";
import { Link } from "react-router-dom";

const Breadcrumb = ({ product }) => {

  if (!product) return null;

  return (
    <div className="flex items-center gap-1.5 sm:gap-2 text-xs sm:text-sm text-gray-700 mb-5 sm:mb-8 overflow-hidden">

      <Link
        to="/"
        className="hover:text-black transition shrink-0"
      >
        Home
      </Link>

      <ChevronRight size={14} className="shrink-0" />

      <Link
        to={`/category/${product.categoryName.toLowerCase()}`}
        className="hover:text-black transition truncate"
      >
        {product.categoryName}
      </Link>

    </div>
  );
};

export default Breadcrumb;