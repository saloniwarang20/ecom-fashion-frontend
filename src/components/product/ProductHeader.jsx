import SortDropName from "./SortDropName";
import { PiSlidersThin } from "react-icons/pi";
import Filter from "./Filter";
import { X } from "lucide-react";

const ProductHeader = ({
  totalProducts,
  sortBy,
  setSortBy,
  subCategories,
  selectedSubCategory,
  setSelectedSubCategory,
  showFilters,
  setShowFilters,
  filters,
  setFilters,
  draftFilters,
  setDraftFilters,
}) => {

  const removeSize = (size) => {
    const updated = {
      ...draftFilters,
      sizes: draftFilters.sizes.filter((s) => s !== size),
    };

    setDraftFilters(updated);
    setFilters(updated);
  };


  const removeColor = (color) => {
    const updated = {
      ...draftFilters,
      colors: draftFilters.colors.filter((c) => c !== color),
    };

    setDraftFilters(updated);
    setFilters(updated);
  };


  const removePrice = () => {
    const updated = {
      ...draftFilters,
      minPrice: null,
      maxPrice: null,
    };

    setDraftFilters(updated);
    setFilters(updated);
  };


  return (
    <div className="w-full mb-6">

      {/* ================= SUBCATEGORIES ================= */}
      {Array.isArray(subCategories) && subCategories.length > 0 && (
        <div
          className="flex gap-3 overflow-x-auto scrollbar-hide pb-2 w-full md:justify-center lg:justify-center"
        >
          {subCategories.map((subCategory) => (

            <button
              key={subCategory.id}
              onClick={() => {

                setSelectedSubCategory(subCategory);

                setDraftFilters((prev) => ({
                  ...prev,
                  subCategoryId: subCategory.id,
                }));

                setFilters((prev) => ({
                  ...prev,
                  subCategoryId: subCategory.id,
                }));

              }}
              className={`shrink-0 px-4 py-1.5 border-2 font-bold text-xs sm:text-sm rounded-full transition

                ${
                  selectedSubCategory?.id === subCategory.id
                    ? "text-zinc-900 border-zinc-900"
                    : "text-gray-500 border-gray-400 hover:text-white hover:border-zinc-900 hover:bg-zinc-900"
                }
              `}
            >
              {subCategory.name}
            </button>

          ))}
        </div>
      )}


      {/* ================= FILTER SECTION ================= */}
      <div className="relative w-full mt-5 sm:mt-7">

        {/* Expanded Filter */}
        <div
          className={`overflow-auto transition-all duration-500 ease-in-out

            ${
              showFilters
                ? "max-h-300 opacity-100 mb-5"
                : "max-h-0 opacity-0"
            }
          `}
        >

          <Filter
            totalProducts={totalProducts}
            showFilters={showFilters}
            setShowFilters={setShowFilters}
            filters={filters}
            setFilters={setFilters}
            draftFilters={draftFilters}
            setDraftFilters={setDraftFilters}
          />

        </div>


        {/* ================= COLLAPSED FILTER BAR ================= */}
        {!showFilters && (

          <div
            className=" w-full bg-taupe-300  lg:rounded-full md:rounded-2xl rounded-2xl px-3 sm:px-4 py-3 flex flex-col lg:flex-row lg:items-center lg:justify-between gap-3"
          >

            {/* LEFT */}
            <div
              className="flex flex-col sm:flex-row sm:items-center gap-3 min-w-0"
            >

              {/* Filter Button */}
              <div className="flex items-center gap-3 shrink-0">

                <button
                  onClick={() => setShowFilters(true)}
                  className="p-2 font-medium border-2 rounded-full border-zinc-900 shrink-0"
                >
                  <PiSlidersThin size={18} />
                </button>

                <span className=" text-gray-600 font-extrabold text-xs sm:text-sm whitespace-nowrap"
                >
                  FILTER ({totalProducts} Products)
                </span>

              </div>


              {/* Selected Filters */}
              <div className="flex flex-wrap gap-2 min-w-0">

                {filters.sizes.map((size) => (
                  <div
                    key={size}
                    className="flex items-center text-[10px] sm:text-xs font-black gap-2 bg-gray-100 rounded-full px-3 py-1"
                  >
                    {size}

                    <button
                      onClick={() => removeSize(size)}
                    >
                      <X size={13} />
                    </button>

                  </div>
                ))}


                {filters.colors.map((color) => (
                  <div
                    key={color}
                    className="flex items-center text-[10px] sm:text-xs font-black gap-2 bg-gray-100 rounded-full px-3 py-1"
                  >
                    {color}
                    <button
                      onClick={() => removeColor(color)}
                    >
                      <X size={13} />
                    </button>
                  </div>
                ))}


                {(filters.minPrice !== null ||
                  filters.maxPrice !== null) && (

                  <div
                    className=" flex items-center text-[10px] sm:text-xs font-black gap-2 bg-gray-100 rounded-full px-3 py-1"
                  >
                    ₹{filters.minPrice ?? 0}
                    {" - "}
                    ₹{filters.maxPrice ?? "Above"}

                    <button onClick={removePrice}>
                      <X size={13} />
                    </button>

                  </div>
                )}

              </div>

            </div>


            {/* SORT */}
            <div className="w-full sm:w-auto lg:shrink-0">
              <SortDropName
                sortBy={sortBy}
                setSortBy={setSortBy}
              />
            </div>

          </div>

        )}

      </div>

    </div>
  );
};

export default ProductHeader;