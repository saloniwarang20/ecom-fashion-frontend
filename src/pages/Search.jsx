import { Search } from "lucide-react";
import { useEffect, useState } from "react";
import productService from "../services/productService";
import ProductCard from "../components/product/ProductCard";

const SearchPage = () => {

  const [keyword, setKeyword] = useState("");
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [recommendedProducts, setRecommendedProducts] = useState([]);

  const handleSearch = async (value) => {

    if (!value.trim()) {
      setResults([]);
      return;
    }

    try {
      setLoading(true);

      const res = await productService.searchProduct(value);

      console.log(res.data);
      setResults(res.data);

    } catch (err) {
      console.error(err);

    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {

    const timer = setTimeout(() => {

      if (keyword.trim()) {
        handleSearch(keyword);
      } else {
        setResults([]);
      }

    }, 400);

    return () => clearTimeout(timer);

  }, [keyword]);

  useEffect(() => {

    const fetchRecommended = async () => {

      try {
        const res = await productService.getRecommendedProduct();
        setRecommendedProducts(res.data);

      } catch (err) {
        console.error(err);
      }
    };

    fetchRecommended();

  }, []);

  return (
    <div className="px-4 sm:px-6 lg:px-10 xl:px-20 py-6 sm:py-8">

      <div className="flex justify-center mb-12 sm:mb-16 lg:mb-20">

        <div className="relative w-full max-w-175">

          <input
            type="text"
            value={keyword}
            onChange={(e) => setKeyword(e.target.value)}
            placeholder="What are you looking for?"
            className="placeholder:font-black w-full h-12 sm:h-14 border-b-2 border-gray-500 px-2 sm:px-3 pr-10 text-sm sm:text-base focus:outline-none"
          />

          <Search
            className="absolute right-1 sm:right-0 top-1/2 -translate-y-1/2 text-gray-700"
            size={20}
          />

        </div>

      </div>

      <div className="mt-6 sm:mt-10">

        {loading ? (
          <div className="flex justify-center items-center py-16 sm:py-20">

            <div className="flex items-center gap-3">

              <div className="w-5 h-5 sm:w-6 sm:h-6 border-4 border-zinc-300 border-t-zinc-900 rounded-full animate-spin"></div>

              <span className="text-sm sm:text-base text-gray-600">
                Searching...
              </span>

            </div>

          </div>

        ) : results.length > 0 ? (

          <>

            <h2 className="text-sm sm:text-base font-semibold mb-5 sm:mb-6">
              {results.length} Product{results.length > 1 ? "s" : ""} Found
            </h2>

            <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-4 lg:gap-5">

              {results.map((product) => (

                <ProductCard
                  key={product.id}
                  product={product}
                />

              ))}

            </div>

          </>

        ) : keyword.trim() ? (

          /* No Results */
          <div className="text-center py-12 sm:py-16 px-4">

            <h2 className="text-xl sm:text-2xl font-bold">
              No Products Found
            </h2>

            <p className="text-sm sm:text-base text-gray-500 mt-2">
              Try searching with another keyword.
            </p>

          </div>

        ) : (
          <>

            <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-4 lg:gap-5
            ">

              {recommendedProducts.map((product) => (

                <ProductCard
                  key={product.id}
                  product={product}
                />

              ))}

            </div>

          </>

        )}

      </div>

    </div>
  );
};

export default SearchPage;