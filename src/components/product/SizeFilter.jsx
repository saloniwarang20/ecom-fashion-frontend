import { SIZES } from "../../constants/filterOptions";

const SizeFilter = ({
  draftFilters,
  setDraftFilters,
}) => {

  const toggle = (size) => {
    setDraftFilters((prev) => ({
      ...prev,
      sizes: prev.sizes.includes(size)
        ? prev.sizes.filter((s) => s !== size)
        : [...prev.sizes, size],
    }));
  };


  const resetSizes = () => {
    setDraftFilters((prev) => ({
      ...prev,
      sizes: [],
    }));
  };


  return (
    <div>

      <div className="flex justify-between items-center mb-4">

        <h3 className="font-black">
          SIZE
          {draftFilters.sizes.length > 0 &&
            ` (${draftFilters.sizes.length})`}
        </h3>


        {draftFilters.sizes.length > 0 && (
          <button
            onClick={resetSizes}
            className="text-sm underline text-gray-500 hover:text-black"
          >
            Reset
          </button>
        )}

      </div>


      <p className="text-sm text-gray-500 mb-6 font-bold">
        Select one or more sizes.
      </p>


      <div className="grid grid-cols-4 gap-2">

        {SIZES.map((size) => {

          const selected =
            draftFilters.sizes.includes(size);

          return (
            <button
              key={size}
              onClick={() => toggle(size)}
              className={`h-11 sm:h-12 text-xs font-black border transition
                ${
                  selected
                    ? "bg-black text-white border-black"
                    : "border-gray-300 hover:border-black"
                }
              `}
            >
              {size}
            </button>
          );
        })}

      </div>

    </div>
  );
};

export default SizeFilter;