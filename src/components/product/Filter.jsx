import { X } from "lucide-react";
import SizeFilter from "./SizeFilter";
import ColorFilter from "./ColorFilter";
import PriceFilter from "./PriceFilter";

const Filter = ({
  totalProducts,
  showFilters,
  setShowFilters,
  filters,
  setFilters,
  draftFilters,
  setDraftFilters,
}) => {

  const applyFilters = () => {
    setFilters({
      ...draftFilters,
    });

    setShowFilters(false);
  };


  return (
    <div className="bg-white rounded-3xl shadow-lg p-4 sm:p-6">

      {/* HEADER */}
      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4 mb-7">

        <div className="flex items-center gap-2">

          <button
            onClick={() => setShowFilters(false)}
            className="cursor-pointer"
          >
            <X size={20} />
          </button>

          <span className="font-bold text-xs sm:text-sm text-gray-500">
            COLLAPSE FILTERS ({totalProducts} Products)
          </span>

        </div>


        <button
          onClick={applyFilters}
          className="w-full sm:w-auto rounded-full text-xs sm:text-sm font-bold bg-zinc-900 text-white px-6 py-2 hover:bg-zinc-700 transition"
        >
          APPLY FILTERS
        </button>

      </div>


      {/* FILTERS */}
      <div
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-10"
      >

        <SizeFilter
          draftFilters={draftFilters}
          setDraftFilters={setDraftFilters}
        />

        <ColorFilter
          draftFilters={draftFilters}
          setDraftFilters={setDraftFilters}
        />

        <PriceFilter
          draftFilters={draftFilters}
          setDraftFilters={setDraftFilters}
        />

      </div>

    </div>
  );
};

export default Filter;